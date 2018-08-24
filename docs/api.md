# Workwell API

Please find below the endpoints that you can use to interact with Workwell API.

## <a name="user-info"></a>Get user info

Using the `user access token` obtained from [getUserAccessToken](js-sdk.md#getuseraccesstoken), you can call workwell API to get the user's information:

```bash
curl -X GET "http://api.workwell.io/1.0/developer/service/user_info" \
	-H "accept: application/json" \
	-H "ww-service-id: {service_id}" \
	-H "ww-service-signature: {service_signature}" \
	-H "ww-timestamp: {timestamp}" \
	-H "ww-user-access-token: {user_access_token}"
```

The service id, signature and timestamp are generated in the same way as for service token, please see [Getting Started/Service Token](./getting-started.md#service-token).

The data returned will have the following format in case of success (200):

```json
{
  "company": {
    "company_id": "string",
    "name": "string"
  },
  "site": {
    "name": "string",
    "site_id": "string"
  },
  "email": "string",
  "first_name": "string",
  "last_name": "string",
  "user_id": "string"
}
```


The `user_id` can be used to interact with user such as sending push notification, posting on their timeline, etc.

The `company_id` can be used to interact with all company’s users such as broadcasting a push notification, posting on the global timeline, etc.

`site` is a organizational unit in a company, it can correspond to an office, a building or a entire country division. Some examples can be "Workwell Paris Office", "Workwell France", etc. A user must belong to a site. In case of work travel, the user's site can change though.

The `site_id` can be used to interact with all site’s users such as broadcasting a push notification, posting on the site timeline, etc.
<!--
## <a name="timeline-all-users"></a>Post on timeline of all users of a company

## <a name="timeline-some-users"></a>Post on users' timelines

## <a name="notification-all-users"></a>Push notification to all users of a company

## <a name="notification-some-users"></a>Push notification to users
-->
