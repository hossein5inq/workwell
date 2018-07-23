# Getting Started

## <a name="workwell-mobile-test"></a>1. Get the Workwell mobile test app

  The Workwell mobile test application is available on HockeyApp. You should download it from the mobile you'll be using for development.
  
  - For iOS:
  
    https://rink.hockeyapp.net/apps/3d57f8dcc1e849e583f2abb9c5a774da
  
  - For Android:
  
    https://rink.hockeyapp.net/apps/c1ff82f45af04051902b36cb4e3d8989
  
  The developer account to login into the app is the following:
  
  - id: developers@workwell.io
  - password: Workwell-123
  
  <br/>
  <p align="center">
  <kbd><img src="images/ios-id-login-screen.png" alt="drawing" width="300px"/></kbd>
  <kbd><img src="images/ios-password-login-screen.png" alt="drawing" width="300px"/></kbd>
  </p>
  <br/>
  
## <a name="access-web-app"></a>2. Access your local (or online) web app

  To access your local (or online) web app inside the Workwell application, simply click on the "Test" (Test Service for developers) item and a popup will then open, prompting you to type the URL that you want to open from inside Workwell. In the example below, I am trying to open my local web app that is running on the 3040 port.
  
  <br/>
  <p align="center">
  <kbd><img src="images/ios-home-screen.png" alt="drawing" width="300px"/></kbd>
  <kbd><img src="images/ios-home-screen-prompt.png" alt="drawing" width="300px"/></kbd>
  </p>
  <br/>

## <a name="service-secret-id"></a>3. Get a service-secret and a service-id

Please get in touch with Workwell tech support team to get a `service_id` and a `service_secret` once you register as a Workwell Service.

They will be used to obtain the *service token* (cf [Service-Token](#service-token)) that is necessary to use the SDK.

We recommend to store the `service_id` and `service_secret` in your back-end for security reason.

## <a name="service-token"></a>4. Implement a service-token generation method

You will need to implement a method on your back-end side that generates a valid *service token*. This token will then be inserted in the Workwell JS object (front-end) so that you are allowed to use any of its bridging methods. Here are some examples on how to retrieve your service token (in different languages).

### Javascript (Node JS)

```javascript
const express = require('express');
const request = require("request");
const crypto = require('crypto');
const app = express();

var serviceSecret = "YOUR_SERVICE_SECRET";
var serviceId = "YOUR_SERVICE_ID";

app.get('/service_token', function (req, response) {
    // the time needs to be in seconds
    var now = parseInt(new Date().getTime() / 1000);
    const signature = crypto.createHmac('sha256', serviceSecret).update(serviceId + now).digest("base64");
    request({
        uri: 'https://api.workwell.io/1.0/developer/service/token',
        method: "GET",
        headers: {
            'ww-service-signature': signature,
            'ww-timestamp': '' + now,
            'ww-service-id': serviceId
        }
    }, function (error, res, body) {
        response.send(JSON.parse(body));
    });
});

app.listen(5000, function () {
    console.log('Example app listening on port 5000!');
});
```

### Python (Flask)

```python
import base64
import requests
from datetime import datetime
from jwt.algorithms import HMACAlgorithm
from flask import Flask, jsonify

app = Flask(__name__)

SERVICE_SECRET = 'YOUR_SERVICE_SECRET'
SERVICE_ID = 'YOUR_SERVICE_ID'
API_URL = 'https://api.workwell.io/1.0/developer/service/token'

@app.route("/service_token", methods=["GET"])
def get_service_token():
    timestamp = int(datetime.utcnow().timestamp())

    hmac = HMACAlgorithm('SHA256')
    sign = hmac.sign(msg=f'{SERVICE_ID}{timestamp}'.encode(),
                     key=SERVICE_SECRET.encode())

    service_signature = base64.b64encode(sign).decode('utf-8')

    headers = {"ww-service-signature": service_signature,
               "ww-timestamp": str(timestamp), "ww-service-id": SERVICE_ID}

    res = requests.get(API_URL, headers=headers).json()

    return jsonify(service_token=res["service_token"])


if __name__ == '__main__':
    app.run(host="0.0.0.0", port=5000, debug=True)
```

### Go

```go
package main

import (
	"log"
	"crypto/hmac"
	"crypto/sha256"
	"encoding/base64"
	"time"
	"strconv"
	"net/http"
	"encoding/json"
	"fmt"
	"io/ioutil"
)

var wwServiceId = "YOUR_SERVICE_ID"
var serviceSecret = "YOUR_SERVICE_SECRET"
var urlWorkwellGetToken = "https://api.workwell.io/1.0/developer/service/token"

// Could also be a map[string]string
type WorkwellHeaders struct {
	wwServiceId				string		`json:"ww-service-id"`
	wwTimestamp				string		`json:"ww-timestamp"`
	wwServiceSignature		string		`json:"ww-service-signature"`
}

// Workwell Response struct
type WorkwellResponse struct {
	ServiceToken			string		`json:"service_token"`
	ServiceName				string		`json:"service_name"`
	ExpiresAt				string		`json:"expires_at"`
	ExpiresIn				int			`json:"expires_in"`
	TokenType				string		`json:"token_type"`
}

func GenerateHeaders() (*WorkwellHeaders) {
	// Build the signature method
	mac := hmac.New(sha256.New, []byte(serviceSecret))

	// prepare the timestamp in string
	wwTimeStamp := strconv.Itoa(int(time.Now().Unix()))

	// Hash the concatenation "wwServiceId + wwTimeStamp" (encoded)
	mac.Write([]byte(wwServiceId + wwTimeStamp))
	message := mac.Sum(nil)

	// convert the message to base64.
	// Once again it needs to be encoded
	wwServiceSignature := base64.StdEncoding.EncodeToString([]byte(message))

	return &WorkwellHeaders{wwServiceId:wwServiceId, wwTimestamp:wwTimeStamp, wwServiceSignature:wwServiceSignature}
}

func GetServiceToken(rw http.ResponseWriter, req *http.Request) () {
	request, _ := http.NewRequest("GET", urlWorkwellGetToken, nil)

	// Prepare headers
	h := GenerateHeaders()
	request.Header.Set("ww-service-id", (*h).wwServiceId)
	request.Header.Set("ww-timestamp", (*h).wwTimestamp)
	request.Header.Set("ww-service-signature", (*h).wwServiceSignature)

	client := &http.Client{}
	res, err := client.Do(request)
	defer res.Body.Close()

	if err != nil {
		log.Fatal(err)
		rw.WriteHeader(http.StatusInternalServerError)
		rw.Write([]byte("Error sending the request to Workwell"))
	} else {

		body, err := ioutil.ReadAll(res.Body)
		if err != nil {
			rw.WriteHeader(http.StatusInternalServerError)
			rw.Write([]byte("Error in the content received from Workwell"))
		}

		var wr = new(WorkwellResponse)
		e := json.Unmarshal(body, &wr)

		if e != nil {
			rw.WriteHeader(http.StatusUnauthorized)
			rw.Write([]byte("Check your credentials"))

		} else {
			rw.WriteHeader(http.StatusOK)
			rw.Write([]byte(wr.ServiceToken))
		}
	}
}

func main() {
	// Server instantiation
	http.HandleFunc("/service_token", GetServiceToken)

	if err := http.ListenAndServe("127.0.0.1:5000", nil); err != nil {
		fmt.Println(err.Error())
	}
}
```

### Java

```java
import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import javax.ws.rs.client.Client;
import javax.ws.rs.client.ClientBuilder;
import javax.ws.rs.client.WebTarget;
import javax.ws.rs.core.MultivaluedHashMap;
import javax.ws.rs.core.MultivaluedMap;
import javax.ws.rs.core.Response;

import org.apache.commons.codec.binary.Base64;

public class WorkwellIntegration {

    final static String         ID       = "id";
    final static String         PASS     = "pass";
    private static final String BASE_URI = "https://api.workwell.io/1.0/developer/service/token";

    private static void authenticate() throws Exception {
        final long currentTimeInSeconds = System.currentTimeMillis() / 1000;
        final String signature = WorkwellIntegration.getHmacSignature(WorkwellIntegration.PASS, WorkwellIntegration.ID + currentTimeInSeconds);

        WorkwellIntegration.sendRequest(currentTimeInSeconds, signature);
    }

    private static String getHmacSignature(final String secret, final String message) throws Exception {
        try {
            final Mac sha256_HMAC = Mac.getInstance("HmacSHA256");
            final SecretKeySpec secret_key = new SecretKeySpec(secret.getBytes(), "HmacSHA256");
            sha256_HMAC.init(secret_key);

            final String hash = Base64.encodeBase64String(sha256_HMAC.doFinal(message.getBytes()));
            System.out.println(hash);
            return hash;
        } catch(final Exception e) {
            System.out.println("Error");
            throw e;
        }
    }

    private static void sendRequest(final long currentTimeInSeconds, final String signature) {
        final Client client = ClientBuilder.newClient();
        final WebTarget target = client.target(WorkwellIntegration.BASE_URI);

        final MultivaluedMap<String, Object> headers = new MultivaluedHashMap<String, Object>();
        headers.add("ww-service-id", WorkwellIntegration.ID);
        headers.add("ww-timestamp", currentTimeInSeconds);
        headers.add("ww-service-signature", signature);

        final Response response = target.request().headers(headers).get();
        System.out.println(response);
    }

    public static void main(final String[] args) throws Exception {
        WorkwellIntegration.authenticate();
    }
}
```

### PHP

```php
$SERVICE_ID = YOUR_SERVICE_ID;
$SERVICE_SECRET = YOUR_SERVICE_SECRET;
$ts = time();
$msg = utf8_encode($SERVICE_ID . $ts);
$hashed = hash_hmac('sha256', $msg, utf8_encode($SERVICE_SECRET), true);
$message = utf8_decode(base64_encode($hashed));
$headers = array(
    'ww-service-signature:' . $message,
    'ww-timestamp:' . $ts,
    'ww-service-id:' . $SERVICE_ID
);

$curl = curl_init();
curl_setopt($curl, CURLOPT_URL, 'https://api.workwell.io/1.0/developer/service/token');
curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
curl_setopt($curl, CURLOPT_CUSTOMREQUEST, 'GET');
curl_setopt($curl, CURLOPT_HTTPHEADER, $headers);

$response = curl_exec($curl);
$err = curl_error($curl);
$httpcode = curl_getinfo($curl, CURLINFO_HTTP_CODE);

curl_close($curl);
```


## <a name="build-first"></a>5. Build your first Workwell web app

This tutorial walks you through creating your first Workwell web App. The guide assumes intermediate level knowledge of HTML, CSS, and JavaScript. If you are totally new to frontend development, it might not be the best idea to jump right into a framework as your first step - grasp the basics then come back! Prior experience with other frameworks helps, but is not required.

For the purpose of this tutorial, we will consider that you already have a basic web app structure (full JS, back-end and front-end, but can easily be translated to other languages like Python or PHP).

Let's also assume you have a project structure that looks like this:

 * dist
   * index.bundle.js
   * page1.bundle.js
 * js
   * index.js
   * page1.js
 * layouts
   * index.html
   * page1.html
 * package.json
 * server.js
 * webpack.config.js


### Step 1: 

Install Workwell JS:

`npm install workwell --save-dev`

### Step 2:

Import it in your index.js and page1.js files:

```javascript
const Workwell = require("workwell");

// Do a bunch of stuff
```

### Step 3:

Implement the service token generation method in your `server.js` file:

```javascript
// Do whatever you need to have your server working, here we are using the 'express' package
const express = require('express');
const app = express();

// ...
// server code
// ...

const serviceId = YOUR_SERVICE_ID;
const serviceSecret = YOUR_SERVICE_SECRET;
const ERROR_SERVICE_SECRET_NOT_VALID = 8;
const ERROR_SERVICE_ID_NOT_VALID = 9;

app.get('/service_token', function (req, response) {
    // the time needs to be in seconds
    var now = parseInt(new Date().getTime() / 1000);
    const signature = crypto.createHmac('sha256', serviceSecret).update(serviceId + String(now)).digest('base64');

    request({
        uri: 'https://api.workwell.io/1.0/developer/service/token',
        method: 'GET',
        headers: {
            'ww-service-signature': signature,
            'ww-timestamp': '' + now,
            'ww-service-id': serviceId
        }
    }, function (error, res, body) {
        var result = JSON.parse(body);
        if (result.error_code === ERROR_SERVICE_SECRET_NOT_VALID) {
            console.log("error : your service_secret '" + serviceSecret + "' is not valid");
        } else if (result.error_code === ERROR_SERVICE_ID_NOT_VALID) {
            console.log("error : your service_id '" + serviceId + "' is not valid");
        }
        response.send(result);
    });
});

// ...
// server code
// ...
```

### Step 4:

Get a service token as the first thing you do in the front-end and insert it in the Workwell object:

```javascript
// index.js
const Workwell = require("workwell");

function getServiceToken() {
    return new Promise((resolve, reject) => {
        let request = new XMLHttpRequest();
        request.open('GET', './service_token', true);

        request.onload = () => {
            if (request.status >= 200 && request.status < 400) {
                let res = JSON.parse(request.responseText);
                window.localStorage.serviceToken = res.service_token; // so that we can use it again in other pages
                
		// Here we are inserting it
		Workwell.setServiceToken(res.service_token);
		
                resolve(res);
            } else {
                reject(request);
            }
        };

        request.onerror = function () {
            reject(request);
        };

        request.send();
    });
}

getServiceToken()
    .then(function(res){
	 // do whatever after that
    })
    .catch(function(error){
	 console.log(error);
    });
```

### Step 5:

You are now allowed to use any bridging methods of the SDK (and in a securey way). Let's use the `getUserInfo` (cf. [getUserInfo](js-sdk.md#getuserinfo)) method for instance. Retrieving the user's info gives you the possibility to <b>automatically log him</b> to his personal account (for your service) or to <b>create a new one</b>, if non-existent :

```javascript
// index.js 

// ...
// ...

function getUserInfo() {
    return new Promise((resolve, reject) => {
    	// Here we can now use this method (since we inserted the valid service-token just before
        Workwell.getUserInfo({
            success: (res) => {
                console.log("success get user info");
		console.log(res); // This will print all the info of the current user in the console
                resolve(res);
            },
            error: (data) => {
                console.log("error get user info");
                reject(data);
            }
        });
    });
}

getServiceToken()
    .then(getUserInfo)
    .catch(function(error){
	 console.log(error);
    });
```

### Step 6:

Let's add some UI to it! We'll just be adding a <b>banner component</b> and a <b>list component</b> containing two items (one with the user's first name, the other one to open page1). Here is the complete code:

```javascript
// index.js
const Workwell = require("workwell");

function getServiceToken() {
    return new Promise((resolve, reject) => {
        let request = new XMLHttpRequest();
        request.open('GET', './service_token', true);

        request.onload = () => {
            if (request.status >= 200 && request.status < 400) {
                window.localStorage.serviceToken = request.responseText; // so that we can use it again in other page
                Workwell.setServiceToken(request.responseText);
                resolve(request.responseText);
            } else {
                reject(request);
            }
        };

        request.onerror = function () {
            reject(request);
        };

        request.send();
    });
}

function getUserInfo() {
    return new Promise((resolve, reject) => {
        Workwell.getUserInfo({
            success: (res) => {
                console.log("success get user info");
                resolve(res);
            },
            error: (data) => {
                console.log("error get user info");
                reject(data);
            }
        });
    });
}

function renderUI(data){
    document.body.appendChild(
        Workwell.ui.createBanner()
            .setBackgroundImage("http://paperlief.com/images/spring-forest-desktop-wallpaper-wallpaper-4.jpg")
            .add(
                Workwell.ui.createBannerTitle()
                    .setValue("Hello World!")
            )
            .toHTMLElement()
    );

    document.body.appendChild(
        Workwell.ui.createList()
            .add(
                Workwell.ui.createListItem()
                    .setTappable(true)
                    .addToCenter(
                        Workwell.ui.createListItemTitle()
                            .setValue("Go to page 1")
                    )
                    .addToRight(
                        Workwell.ui.createListItemChevronIcon()
                    )
                    .onClick(function(){
                        Workwell.openWebPage(window.location.href + "/page1");
                    })
            )
            .add(
                Workwell.ui.createListItem()
                    .setTappable(true)
                    .addToCenter(
                        Workwell.ui.createListItemTitle()
                            .setValue("Hello " + data.user.first_name + "!")
                    )
            )
            .toHTMLElement()
    )
}

getServiceToken()
    .then(getUserInfo)
    .then(renderUI)
    .catch(function(error){
        console.log(error);
    });
```

Here is what it looks like in Android and iOS:

<br>
<p align="center">
  <kbd><img src="images/hello-world-zachary-android.png" width="300"/></kbd>
  <kbd><img src="images/hello-world-zachary-ios.png" width="300px"/></kbd>
</p>
<br>
