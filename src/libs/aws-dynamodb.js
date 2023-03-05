import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { CognitoIdentityClient } from "@aws-sdk/client-cognito-identity";
import { fromCognitoIdentityPool } from "@aws-sdk/credential-provider-cognito-identity";

export const createDynamoDBObj = async () => {
    const REGION = "us-west-2";
    const IDENTITY_POOL_ID = 'us-west-2:27ed1493-4d9e-4655-8a43-e2aca015bc88';
    //Get temp credentials
    const cognitoClient = new CognitoIdentityClient({ region: REGION });
    const creds = fromCognitoIdentityPool({
        client: cognitoClient,
        identityPoolId: IDENTITY_POOL_ID
    });

    //Create the dynamodb client
    const dynamodbClient = new DynamoDBClient({
        region: REGION,
        credentials: creds
    });

    return dynamodbClient;
}