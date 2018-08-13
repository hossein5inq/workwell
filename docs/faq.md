# Frequently Asked Questions

Please find below answers to some common questions and the reasons why the Workwell SDK might seem to be a bit complex.

### Why the service_signature formula is so complex ?

The formula for service signature is based on HMAC in order to satisfy the following requirements:

- It should allow to verify service identity, i.e. the service id and secret are correct.

- The service secret should never be sent in clear, even if server-server communication.

- The request should have an expiration date to reduce the chance of being reused (man in the middle attack).

Using the formula `service_signature=HMAC_SHA256(service_secret, service_id + timestamp)`, with service_secret corresponds to service id sent in `ww-service-id` header, timestamp in `ww-timestamp`, Workwell API will be able to recompute the service signature and compare it to the signature included in `ww-service-signature` header.

### Why do I have to use a `user_access_token` to get the user's information? Why not giving the user's information directly in a getUserInfo() method from the SDK ?

The user's information used to be returned in a `getUserInfo` method. But this is not secure as it is quite easy to steal the user's data, for example in the following scenario:

- You have a service that allows user to post some content (a forum, a social network, etc)

- A malicious user posts a code snippet like this in a comment:

```
Workwell.getUserInfo({
	success: (res) => {
		sendDataToMyPersonalServer(res)
	}
})
```

- You forget to sanitize html content in your service

- Any user seeing this comment gets their data stolen!

A more secure way (and also more standard) is to return the user's information only in backend-to-backend calls. This is done via a temporary `user_access_token` that allows your backend to request user's information from the Workwell API. This flow can be considered as a simplified version of OAuth2.

