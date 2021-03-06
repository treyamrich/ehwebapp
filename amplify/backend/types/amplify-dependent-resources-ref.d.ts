export type AmplifyDependentResourcesAttributes = {
    "auth": {
        "userPoolGroups": {
            "employeeGroupRole": "string",
            "adminGroupRole": "string"
        },
        "ehwebappresources": {
            "IdentityPoolId": "string",
            "IdentityPoolName": "string",
            "UserPoolId": "string",
            "UserPoolArn": "string",
            "UserPoolName": "string",
            "AppClientIDWeb": "string",
            "AppClientID": "string",
            "CreatedSNSRole": "string"
        }
    },
    "api": {
        "ehwebapp": {
            "GraphQLAPIIdOutput": "string",
            "GraphQLAPIEndpointOutput": "string"
        }
    }
}