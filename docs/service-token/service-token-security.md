# Service Token Security #

For reasons of security, all Workwell JS-SDK Bridge calls need to include a service token that identifies the service through the Workwell App. 

This token is obtained via a Workwell endpoint providing the service id and and a signature based on the service secret. 

The service-token has an expiration date so the service back-end needs to fetch it regularly. 

Once fetched, this token needs to be included using the #docTextSection:yyWPLRT5oQ69ZAFBu method provided with the SDK so that it is included in all calls to the App.

See #docTextSection:mwtqKWHT6JzFfH8TL on how to retrieve your service token in different languages.

To test the generation of the service signature that is required to obtain the service token, you can use #endpoint:v4XuiXjow3XuuKNb7.
