import { API } from "aws-amplify";
import { getItems } from "../graphql/queries";
import { updateItems } from "../graphql/mutations";

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

//Updates the qty with retry logic
const NUM_RETRIES = 3;
export const updateItemQty = async (item, authMode) => {
    for(let i = 0; i < NUM_RETRIES; i++) {
        try {
            await API.graphql({ query: updateItems,
                variables: {
                    id: item.id
                },
                authMode: authMode
            });
            break;
        } catch(e) {
            console.log(e);
            //Refetch item
            try {
                item = await API.graphql({ query: getItems,
                    variables: { id: item.id }
                });
            } catch(e) {
                
            }
            
        }
    }
}