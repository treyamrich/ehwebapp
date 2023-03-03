import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { fromCognitoIdentityPool } from "@aws-sdk/credential-providers";

//Takes the the user session token
export const createDynamoDBObj = token => {
    let REGION = "us-west-2";
    let COGNITO_ID = 'cognito-idp.us-west-2.amazonaws.com/us-west-2_3CQjkr0d1';
    let loginData = {
        [COGNITO_ID]: token.jwtToken
    }
    const dynamodbClient = new DynamoDBClient({
        region: REGION,
        credentials: fromCognitoIdentityPool({
            clientConfig: { region: REGION },
            identityPoolId: 'us-west-2:27ed1493-4d9e-4655-8a43-e2aca015bc88',
            logins: loginData
        })
    });

    return dynamodbClient;
}