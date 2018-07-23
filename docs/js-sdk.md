# JS-SDK

## Bridge with the app

  All the following methods allow you to call native components (dateTimePicker, actionSheet, chooseImage, opening a new webView, ...) or to retrieve information about the current Workwell user (getUserInfo).
  
  - [chooseImage](js-sdk.md#chooseimage)
  - [getUserInfo](js-sdk.md#getuserinfo)
  - [goBack](js-sdk.md#goback)
  - [hideNativeLoader](js-sdk.md#hidenativeloader)
  - [onShow](js-sdk.md#onshow)
  - [openChat](js-sdk.md#openchat)
  - [openWebPage](js-sdk.md#openwebpage)
  - [setServiceToken](js-sdk.md#setservicetoken)
  - [showActionSheet](js-sdk.md#showactionsheet)
  - [showDateTimePicker](js-sdk.md#showDateTimePicker)
  - [showMessage](js-sdk.md#showMessage)
  - [showNativeLoader](js-sdk.md#showNativeLoader)

  * ### chooseImage
  
     This function open the native's image picker (iOS or Android) and returns the image as a base64 string.

     **Parameters**

      -   `obj` **[json](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON)** a json object
         -   `obj.success` **[function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function)** success callback function. It returns the image object
         -   `obj.error` **[function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function)** failure callback function. It returns the error

     **Examples**

     ```javascript
     Workwell.chooseImage({
         success: function (res) {
             var url = "data:image/png;base64," + res.base64;
             document.getElementById("my-image").src = url;
         }
     });
     ```

     **Returns**

     The `data` will contain the `base64` value. Here is an example of the `data` object:


     ```json
     {  
        "base64": "bkzcjeDEOJCecjeoCEC==eECECe12cCECEjdije=efEEFFcecezECDEFEFEdjojv23jijce=;eihrgirgc"
     }
     ```

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

    - *name*: the full name
    - *first_name*: user first name
    - *last_name*: user last name
    - *email*: user email
    - *address*: user office (not home) address
    - *site_name*: user's company site.
    
  * ### goBack
  
    This function makes you go back in your history stack. It makes the current view disappears in the app.
    
    **Example**
    
    ```javascript
    Workwell.goBack();
    ```
      
  * ### hideNativeLoader
  
    This function hides the native loader of the app. To be used after having used the [showNativeLoader](js-sdk.md#shownativeloader) method and when the loading of your data is done.

    **Examples**

    ```javascript
    Workwell.hideNativeLoader();
    ```
    
  * ### onShow
  
    This function is called when the view is shown to the user. Mostly used for UI-refreshing purpose.

    **Parameters**

    -   `fn` **[function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function)** a callback function

    **Examples**

    ```javascript
    Workwell.onShow(function(){
         refreshUI();
         callSomeFunction();
    });
    ```
    
  * ### openChat
  
    This function opens the Workwell's native chat with the user corresponding to the userServiceToken given as an argument. The userServiceToken is retrieved from the [getUserInfo](js-sdk.md#getuserinfo) method. You can then store all the userServiceToken from every user in your own database somewhere.

    **Parameters**

    -   `obj` **[json](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON)** a json object
    -   `obj.userServiceToken` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** the user's service token from whom you want to chat with


    **Examples**

    ```javascript
    Workwell.openChat({
        userServiceToken: "xGEd==EGECdkoegjdeojcEEFEGE"  
    });
    ```

  * ### openWebPage
  
    This function opens a new page with Workwell's native way (instead of opening it in the same browser's web view). It's for     a better UI / UX.

    **Parameters**

    -   `url` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** the url to     navigate to
    
    **Example**
    
    ```javascript
    Workwell.openWebPage(window.location.href + "/my-page");
    ```
    
  * ### setServiceToken
  
    This function sets the service token within the SDK. You must set your service token before you try fetching any info through WorkwellJS !

    **Parameters**

    -   `token_` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** the service token generated from your back-end server
    
    **Examples**

    ```javascript
    Workwell.setServiceToken("uXekxke==djzoZTLOF54.......");
    ```
    
  * ### showActionSheet
  
    This function opens the native action sheets.

    **Parameters**

    -   `obj` **[json](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON)** a json object
    -   `obj.title` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** the title of the action sheets
    -   `obj.actions` **[array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)** array of actions (id {string}, title {string}, type {string} : optional)
    -   `obj.success` **[function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function)** success callback function. It returns the id of the selected action
    -   `obj.error` **[function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function)** failure callback function. It returns the error

    **Examples**

    ```javascript
    Workwell.showActionSheet({
         title: "Please choose your favorite mobile platform",
         actions: [
             {
                 id: "iosId",
                 title: "iOS"
             },
             {
                 id: "androidId",
                 title: "Android",
                 type: "default"
             },
             {
                 id: "defaultId",
                 title: "Remove",
                 type: "destructive"
             }
         ],
         success: function(res){
             console.log(res.selectedAction);
         },
         error: function(err){
             console.log(err);
         }
    )};
    ```

    **Returns**

    ```json
    {
      "selectedAction": "androidId"
    }
    ```
    
  * ### showDateTimePicker
  
    This function opens the native date(time) picker.

    **Parameters**

    -   `obj` **[json](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON)** a json object
    -   `obj.type` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)?** can be : "date", "dateHourMinute" or "hourMinute"
    -   `obj.date` **[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)?** timestamp
    -   `obj.minDate` **[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)?** timestamp
    -   `obj.maxDate` **[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)?** timestamp
    -   `obj.minuteInterval` **[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)?** timestamp
    -   `obj.success` **[function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function)** success callback function. It returns a timestamp
    -   `obj.error` **[function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function)** failure callback function. It returns the error

    **Examples**

    ```javascript
    Workwell.showDateTimePicker({
         type: "dateHourMinute",
         date: moment.now(),
         success: function(res){
             console.log(res);
         },
         error: function(err){
             console.log(err);
         }
    )};
    ```

    **Returns**
    
    the date as a timestamp

    ```json
    {
      "date": 12542525215
    }
    ```
  
  * ### showMessage
   
    This function shows a native toast message.

    **Parameters**

    -   `message` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** The message you want to show
    -   `type` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)?** can be : "success", "warning" or "error"

    **Examples**

    ```javascript
    Workwell.showMessage("This message is a success", "success");
    ```

    ```javascript
    Workwell.showMessage("This message is an error", "error");
    ```
    
  * ### showNativeLoader
   
    This function shows the native loader of the app. To be used when loading some data in the background.

    **Examples**

    ```javascript
    Workwell.showNativeLoader();
    ```


## UI

  All the following methods are UI related (for an enhanced UI / UX Workwell experience). All those methods are part of `Workwell.ui`.
  
  - [$](js-sdk.md#$)
  - [ready](js-sdk.md#ready)

  * ### $
  
    This function is a selector (wrapper) for DOM elements. It will convert those into the appropriate Workwell object.
    
    **Parameters**

    -   `el` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** The id of the dom element you want to select (convert). It needs to start with a "#" if you want to select the element by it's id
    
    **Examples**

    ```javascript
    // This element will have access to all the methods / attributes of the Workwell List Component
    const list = Workwell.ui.$("#my-list-id");
    
    // This element will have access to all the methods / attributes of the Workwell ListItem Component
    const listItem = Workwell.ui.$("#my-list-item-id");
    
    // This element will have access to all the methods / attributes of the Workwell Button Component
    const button = Workwell.ui.$("#my-button-id");
    
    // etc
    // ...
    ```
    
  * ### ready
  
    Everything put in this function will be called once the DOM is ready (all the HTML elements have been loaded).

    **Parameters**

    -   `fn` **[function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function)** a callback function

    **Examples**

    ```javascript
    Workwell.ui.ready(function(){
         init();
         callSomeFunction();
    });
    ```
