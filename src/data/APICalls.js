import { API } from "aws-amplify";
import { ExecuteTransactionCommand } from "@aws-sdk/client-dynamodb";
import { createDynamoDBObj } from "../libs/aws-dynamodb";

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

const getUpdateOperation = cartItem => {
  console.log(cartItem.qty.toString());
    return {
        Update: {
          TableName: "Items-7fr2sid2azbrrhnbb2ntqspzlu-dev",
          Key: {
            id: { N: cartItem.code },
          },
          UpdateExpression: "set #qty = #qty - :decr",
          ExpressionAttributeNames: { "#qty": "qty" },
          ExpressionAttributeValues: { 
            ":decr": { 
              N: cartItem.qty.toString() 
            } 
          }
        }
      };
}
export const updateItemQuantities = async (dynamodbObj, items) => {
    const operations = [];
    items.forEach(cartItem => getUpdateOperation(cartItem));
    const command = new ExecuteTransactionCommand({
        TransactStatements: operations,
      });
    const response = await dynamodbObj.send(command);
    console.log(response.TransactionItems);
}