# Workwell API

Please find below the endpoints that you can use to interact with Workwell API.

## <a name="user-info"></a>Get user info

Using the `access token` obtained from [getUserInfo](js-sdk.md#getuserinfo), you can call workwell API to get user information:

```bash
curl -X GET "http://api.workwell.io/1.0/developer/service/user_info" \
	-H "accept: application/json" \
	-H "ww-service-id: {service_id}" \
	-H "ww-service-signature: {service_signature}" \
	-H "ww-timestamp: {timestamp}" \
	-H "ww-access-token: {access_token}"
```

The service id, signature and timestamp are generated in the same way as for service token, please see [Getting Started/Service Token](./getting-started.md#service-token).

The data returned will have the following format in case of success (200):

```json
{
  "client": {
    "client_service_token": "string",
    "name": "string"
  },
  "email": "string",
  "first_name": "string",
  "last_name": "string",
  "user_service_token": "string"
}
```

Most of the fields are self-explanatory except `user_service_token` and `client_service_token`.

The `user_service_token` is unique per service and user and you can consider it as a `workwell user id`. This token can be used to interact with user such as sending push notification, posting on their timeline, etc. This token does not have expiration so you can safely save it into your database.

The `client_service_token` is unique per company. This token can be used to interact with all company’s users such as broadcasting a push notification, posting on the global timeline, etc. This token does not have expiration so you can safely save it into your database.

<!--
## <a name="timeline-all-users"></a>Post on timeline of all users of a company

## <a name="timeline-some-users"></a>Post on users' timelines

## <a name="notification-all-users"></a>Push notification to all users of a company

## <a name="notification-some-users"></a>Push notification to users
-->
