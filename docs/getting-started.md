# Getting Started

Put your service between the hands of thousands of employees by doing a Workwell integration. Wether you already have a web service or you’re building one from scratch, Workwell provides the necessary tools to make the integration easy and fast.

<img src="./images/Phone@2x.png" alt="drawing" width="300px"/>

## Technical concept

Before your start diving into the technical details, we wanted to let you know about our general technical concept. Workwell is a native mobile application. Services are web apps, presented to the user on a dedicated screen. Opening a service is done by loading its URL in a in-app custom webview. Using the Workwell JS-SDK, your service can communicate with the Workwell native application.


<img src="./images/architecture.png" alt="drawing" width="600px"/>

Here are the different components inside a service:

<img src="./images/service-components.svg" alt="drawing" width="600px"/>

## Workwell SDK

Workwell SDK allows you:

* To get data about the user.
* To use native features (e.g. Camera, Chat etc.).
* To use native like UI components that handle the differences between OS and Android for you.
* To use native UI components to give the user experience a more native flavour (e.g. date/time pickers, toast messages etc.).

## Integration requirements

We have put in place a number of requirements for a Workwell integration to ensure the best user experience with a strong attention to the security aspects of our technical model:

* Automatic user identification: By using Workwell, users can access all the services provided by their companies, they shouldn’t need to manually login in or create accounts when opening your service. Use the JS-SDK to get the user’s informations so you can, behind the hood, automatically create an account or log the user in. **User should never therefore have to login to use your service**.

* Mobile friendly: We require your service to be mobile friendly and to respect Workwell UI guidelines. We strongly recommend you to use the JS-SDK UI features!

* Expose a health check endpoint: Your server needs to expose an endpoint Workwell servers can call to verify your service health and its authenticity, c.f. [Service Authorization/Versioning](./docs/authorization-versioning.md)

*We also recommend using classic navigation with `<a href="...">` and not SPA (single page application) router. A native app opens a new view/page when navigating from one content to another, cf [Open Web Page](./docs/open-web-page.md) for more information*

## Service Secret / Service ID

Please get in touch with Workwell tech support team to get a `service_id` and a `service_secret` once you register as a Workwell Service.

They will be used to obtain the *service token* (cf next section) that is necessary to use the SDK.

## Obtain service token

For reasons of security, all Workwell JS-SDK Bridge calls need to include a *service token* that identifies the service through the Workwell App.

This token is obtained via a Workwell endpoint providing the service id and and a signature based on the service secret.

The service-token has an expiration date so the service back-end needs to fetch it regularly.

Once fetched, this token needs to be included using the `setServiceToken` method (in the following section) provided with the SDK so that it is included in all calls to the App.

See [Examples](./docs/service-token-examples.md) on how to retrieve your service token in different languages.

We recommend to store the `service_id` and `service_secret` in your back-end for security reason.

## Install the SDK

Using npm

> npm install workwell

TODO: add how to include workwell, either via `require` or `import`

## First SDK method `setServiceToken`

This function sets the service token within the SDK. 
You must set your service token before you try fetching any info through WorkwellJS!

```js
Workwell.setServiceToken("your service token");
```

## SDK method `getUserInfo`

This is usually the first function you'll use. This function retrieves the current user's info from the app.

```js
Workwell.getUserInfo({
     success: function (data) {
         console.log(data);
         // You can then create a new user with the data you received,
         // or fetch an existing one in your db
     },
     error: function (error) {
         console.log(error);
     }
});
```

The data will contain some user information, the user-service-token and the user locale. Here is an example of the data object:

```json
{  
   "user_service_token": "a JWE string, so very long ...",
   "locale": "en-US",
   "user": {  
      "site_name": "PARIS",
      "site_key": "PARIS",
      "email": "abc@workwell.io",
      "name": "firstname lastname",
      "first_name": "firstname",
      "last_name": "lastname",
      "address": "19 rue Eugène Flachat, 75017 Paris, France",
      "client": {
         "key": "workwell",
         "name": "workwell"
      }
   },
   "token_type": "bearer"
}
```

The `user-service-token` is unique per service and user and you can consider it as a workwell user id. This token will be useful to verify the user later via our API or to be used in the chat SDK.
