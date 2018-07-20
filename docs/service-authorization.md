# Service Authorization

**Process**

The service server needs to expose an endpoint called `/authorize` so that Workwell can call that route to verify if the service is down/live, its authenticity and a version number corresponding to the latest deployed version of the service. 

The endpoint URL must have the same domain as the service domain itself.

Workwell will call the service server every X minutes to do the health/authenticity check and to update the service's version number (in the Workwell database) if it has changed.

<br/>

<p align="center"><img src="docs/images/service-authorization.svg"/></p>

<br/>

When we then expose the service to the end-user, we add the version to the service's url like this :

https://www.workwell.io<b>?v=A_VERSION_NUMBER</b>

instead of :

https://www.workwell.io

This needs to be done to clean the cache of the previous service version.

<br/>

**Versioning**

You can use any methods you want to generate your version number and return it, as long as you update it when you have a new deployed version of your service.

For our own internal services, we use the SHA1 corresponding to our git repository's latest commit, which is a unique key.

<br/>

**Examples**

Python
```python

import subprocess
import base64
from jwt.algorithms import HMACAlgorithm
from datetime import datetime

SERVICE_ID = YOUR_SERVICE_ID
SERVICE_SECRET = YOUR_SERVICE_SECRET
SHA1 = subprocess.getoutput("git rev-parse HEAD")

def get_service_signature(timestamp):
    hmac = HMACAlgorithm('SHA256')
    sign = hmac.sign(msg=f'{SERVICE_ID}{timestamp}'.encode(),
                     key=SERVICE_SECRET.encode())

    service_signature = base64.b64encode(sign).decode('utf-8')

    return service_signature

# Important to keep the same endpoint's name !
@app.route('/authorize')
def authorize():
    timestamp = int(datetime.now().timestamp())
    service_signature = get_service_signature(timestamp)
    return jsonify(
        timestamp=timestamp,
        service_signature=service_signature,
        version=SHA1
    )
```
