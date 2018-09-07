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

In case of error, the endpoint returns 400, please see [Workwell API Error](#error-code) for more details.

## <a name="push-notification"></a>Send a push notification to a user, a site or a whole company.

```bash
curl -X POST "https://api.workwell.io/1.0/developer/service/notification" \
  -H "accept: application/json" \
  -H "ww-service-id: {service_id}" \
  -H "ww-service-signature: {service_signature}" \
  -H "ww-timestamp: {timestamp}" \
  -H "Content-Type: application/json" \
  -d '{ "target_id": "{target id}", "target_type": "{target type}", "message": "{message}" }'
```

The service id, signature and timestamp are generated in the same way as for service token, please see [Getting Started/Service Token](./getting-started.md#service-token).

The `target_type` is a user or a group of user that the notification will be sent to. Its value can be either `user`, `site` or `company`.

The `target_id` is the id of the target, which is `user id` if `target_type` is user, `company id` if `target_type` is company, `site id` if `target_type` is site. The [user-info endpoint](#user-info) includes `user id`, `site id` and `company id` in its response.

The `message` is the notification that will be sent.

The data returned will have the following format in case of success (200). Please note this is the number of notifications that are *scheduled*, and  the notifications are not guaranteed to arrive immediately (or even at all!), due to rate limit for example.

In case of error, the endpoint returns 400, please see [Workwell API Error](#error-code) for more details.

```json
{
  "number_notification":10
}
  
```

## <a name="post-timeline"></a>Post on user, site or company timeline.

```bash
curl -X POST "https://api.workwell.io/1.0/developer/service/timeline" \
  -H "accept: application/json" \
  -H "ww-service-id: {service_id}" \
  -H "ww-service-signature: {service_signature}" \
  -H "ww-timestamp: {timestamp}" \
  -H "Content-Type: application/json" \
  -d '{ "target_id": "{target id}", "target_type": "{target type}", "text": "{text}", "image_url": "{image_url}" }'
```

The service id, signature and timestamp are generated in the same way as for service token, please see [Getting Started/Service Token](./getting-started.md#service-token).

The `target_type` is a user or a group of user that the notification will be sent to. Its value can be either `user`, `site` or `company`.

The `target_id` is the id of the target, which is `user id` if `target_type` is user, `company id` if `target_type` is company, `site id` if `target_type` is site. The [user-info endpoint](#user-info) includes `user id`, `site id` and `company id` in its response.

The `text` is the textual content that will be included in the timeline.

The *optional* `image_url` is the link to the image that comes with a timeline.

The data returned will have the following format in case of success (200).

In case of error, the endpoint returns 400, please see [Workwell API Error](#error-code) for more details.

```json
{
  "timeline_id":"string"
}
```

with `timeline_id` being the timeline identifier that can be eventually used to update the timeline later. 
Please note that updating timeline after it has been posted is NOT recommended.

## <a name="update-timeline"></a>Update existing timeline.

```bash
curl -X PATCH "https://api.workwell.io/1.0/developer/service/timeline" \
  -H "accept: application/json" \
  -H "ww-service-id: {service_id}" \
  -H "ww-service-signature: {service_signature}" \
  -H "ww-timestamp: {timestamp}" \
  -H "Content-Type: application/json" \
  -d '{ "timeline_id": "{timeline id}", "text": "{text}", "image_url": "{image_url}" }'
```

The service id, signature and timestamp are generated in the same way as for service token, please see [Getting Started/Service Token](./getting-started.md#service-token).

The `timeline_id` is the timeline id returned when a timeline is created, cf [Post on timeline](#post-timeline)

The `text` is the textual content that will be updated in the timeline.

The *optional* `image_url` is the link to the image that comes with a timeline.

The data returned will have the following format in case of success (200). 

In case of error, the endpoint returns 400, please see [Workwell API Error](#error-code) for more details.

```json
{
  "image_url": "string",
  "text": "string",
  "timeline_id": "string"
}
```

## <a name="delete-timeline"></a>Delete existing timeline.

```bash
curl -X DELETE "https://api.workwell.io/1.0/developer/service/timeline" \
  -H "accept: application/json" \
  -H "ww-service-id: {service_id}" \
  -H "ww-service-signature: {service_signature}" \
  -H "ww-timestamp: {timestamp}" \
  -H "Content-Type: application/json" \
  -d '{ "timeline_id": "{timeline id}" }'
```

The service id, signature and timestamp are generated in the same way as for service token, please see [Getting Started/Service Token](./getting-started.md#service-token).

The `timeline_id` is the timeline id returned when a timeline is created, cf [Post on timeline](#post-timeline)

200 is returned in case of success, i.e. the timeline has been deleted successfully.

In case of error, the endpoint returns 400, please see [Workwell API Error](#error-code) for more details.


## <a name="error-code"></a>Possible error codes

In case of error, all endpoints returns 400 with the following payload format

```json
{
  "context": "string",
  "error_code": 0,
  "message": "string"
}
```

Following is the list of possible `error_code`:

*Authentication errors*
* if `error_code = 5`: Missing header. The ww-service-id, ww-service-signature, ww-timestamp, ww-company-id headers are mandatory

* if `error_code = 2`: The ww-timestamp is too old. It should be at max in the last hour.

* if `error_code = 9`: The service id is unknown. Please keep contact workwell developer team to have a valid service id.

* if `error_code = 8`: The service signaure is invalid. Please consult the workwell docs on how to generate valid signature.

* if `error_code = 10`: The data type is invalid. Often happens when the ww-timestamp is not an integer.

*Specific errors, depending on each endpoint*

* if `error_code = 1300`: A generic error, please check the error payload for more information.

* if `error_code = 1301`: Your service does not have the permission to do the requested action (send notification, get more user info, etc). Please get in touch with Workwell support team.

* if `error_code = 1302`: The `access token` provided is not valid. Please check in the error message, cf [user-info endpoint](#user-info)

* if `error_code = 1303`: The `access token` provided is expired, cf [user-info endpoint](#user-info)

* if `error_code = 1304`: Invalid data format, please check the error payload for more information.

* if `error_code = 1305`: No such timeline. The timeline might have been deleted before?

