import { API } from "aws-amplify";

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