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

## <a name="build-first"></a>5. Build your first Workwell web app
