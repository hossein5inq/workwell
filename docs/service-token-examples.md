# Service Token Generation Examples

Below you can find how to get the service token in different languages.

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
