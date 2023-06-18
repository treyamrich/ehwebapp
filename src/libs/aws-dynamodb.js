import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { CognitoIdentityClient } from "@aws-sdk/client-cognito-identity";
import { fromCognitoIdentityPool } from "@aws-sdk/credential-provider-cognito-identity";
import awsmobile from "../aws-exports";

export const createDynamoDBObj = async () => {
    const REGION = "us-west-2";
    const IDENTITY_POOL_ID = awsmobile["aws_cognito_identity_pool_id"];
    console.log(IDENTITY_POOL_ID);
    console.log('HI')
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