# JS-SDK

## Bridge with the app

  * ### getUserInfo
  
     This function retrieves the current user's info from the app.

     **Parameters**

     -   `obj` **[json](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON)** a json object
        -   `obj.success` **[function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function)** success callback function. It returns the user object
        -   `obj.error` **[function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function)** failure callback function. It returns the error

    **Examples**

    ```javascript
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

    **Returns**

    The `data` will contains some user informations and the `user-service-token` and the user `locale`. Here is an example of the `data` object:


    ```json
    {  
       "user_service_token":"a JWE string, so very long ...",
       "locale":"en-US",
       "user":{  
          "name":"firstname lastname",
          "site_name":"PARIS",
          "site_key": "PARIS",
          "client":{
            "key":"workwell",
            "name":"workwell"
          },
          "first_name":"firstname",
          "last_name":"lastname",
          "email":"abc@workwell.io",
          "address":"19 rue Eugène Flachat, 75017 Paris, France"
       },
       "token_type":"bearer"
    }
    ```

    The `user-service-token` is unique per service and user and you can consider it as a `workwell user id`. This token will be useful if you need to verify it later via #endpoint:Xg6SyDa4dHQSgPPk8 or to be used in chat SDK (available soon).

    The `locale` can be used for localization purpose.

    In the `user` object, the following fields are always returned:

    - name: the full name
    - first_name: user first name
    - last_name: user last name
    - email: user email
    - address: user office (not home) address
    - site_name: user's company site.

  * ### openWebPage
  
    This function opens a new page with Workwell's native way (instead of opening it in the same browser's web view). It's for     a better UI / UX.

    **Parameters**

    -   `url` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** the url to     navigate to
    
    **Example**
    
    ```javascript
    Workwell.openWebPage(window.location.href + "/my-page");
    ```

## UI
