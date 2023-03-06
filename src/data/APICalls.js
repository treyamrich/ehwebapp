import { API, Storage } from "aws-amplify";
import { ExecuteTransactionCommand } from "@aws-sdk/client-dynamodb";
import { createDynamoDBObj } from '../libs/aws-dynamodb';

/* Generic fetch items function with error handling  

query: GraphQL query must be wrapped in an object {}. Ex: { fetchTodoItems }
    Designed this way because AWS appsync responds with the data under a field 
    that uses the query name

authMode: Read AWS AppSync docs for this

errorCallbackFn: What to do on error, func must accept the error as a parameter.

variables: used to pass data into the graphql query (ref AWS AppSync docs)
*/
export const fetchItems = async (query, authMode, errorCallbackFn, variables={}) => {
    try {
        const queryName = Object.keys(query)[0];
        const resp = await API.graphql({query: query[queryName],
            variables: variables,
            authMode: authMode
        });
        return resp.data[queryName].items;
    } catch(e) {
        console.log(e);
        errorCallbackFn(e);
    }
    return [];
}

//Performs a database transaction to update the items in an order
//item in items is from the CartItem in the graphql schema
export const updateItemQuantities = async items => {
    const dynamodbClient = await createDynamoDBObj();
    const command = new ExecuteTransactionCommand({
      TransactStatements: items.map(cartItem => {
        let qty = cartItem.quantity.toString();
        return {
          Statement: `UPDATE "Items-7fr2sid2azbrrhnbb2ntqspzlu-dev" SET qty=qty-? WHERE code=? AND qty >= ?`,
          Parameters: [
            { N: qty }, {S: cartItem.code}, { N: qty }
          ]
        }; 
      })
    });
    return dynamodbClient.send(command);
}

//item in items is from the CartItem in the graphql schema
export const uploadLayoutImages = async items => {
    await Promise.all(items.map(item => {
        if(item.layoutImg) {
            let imgFile = item.layoutImg;
            item.layoutImg = imgFile.name;
            return Storage.put('layouts/' + imgFile.name, imgFile, { bucket: 'ehwebapp-customer-uploads'})
                .catch(e => console.log(`Failed to upload layout for: ${item.code}\n${e.name}\n${e.message}`) );
        }
        return null;
    }));
}