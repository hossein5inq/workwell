# Workwell SDK

[![npm version](https://img.shields.io/npm/v/workwell.svg)](https://www.npmjs.com/package/workwell)
[![Build Status](https://travis-ci.org/Workwell/workwell.svg?branch=master)](https://travis-ci.org/Workwell/workwell)

Workwell is a front-end framework to communicate between a web-application and the Workwell mobile application; It also provides an easy to use mobile-like (iOS, android) UI framework, created by the [Workwell](https://www.workwell.io) Engineering team.


## Table of contents

* [Introduction](#introduction)
* [Documentation](#documentation)


## Introduction

Put your service between the hands of thousands of employees by doing a Workwell integration. Wether you already have a web service or you’re building one from scratch, Workwell provides the necessary tools to make the integration easy and fast.

<br/>
<p align="center"><img src="docs/images/Phone@2x.png" alt="drawing" width="300px"/></p>
<br/>

<iframe width="300" height="300" src="https://www.w3schools.com"></iframe>

### Technical Concept

Before your start diving into the technical details, we wanted to let you know about our general technical concept. Workwell is a native mobile application. Services are web apps, presented to the user on a dedicated screen. Opening a service is done by loading its URL in a in-app custom webview. Using the Workwell JS-SDK, your service can communicate with the Workwell native application.

Here are the different components inside a service:

<p align="center"><img src="docs/images/service-components.svg" alt="drawing" width="600px"/></p>

### Workwell SDK

Workwell SDK allows you:

* To get data about the user.
* To use native features (e.g. Camera, Chat etc.).
* To use native like UI components that handle the differences between OS and Android for you.
* To use native UI components to give the user experience a more native flavour (e.g. date/time pickers, toast messages etc.).

### Integration Requirements

We have put in place a number of requirements for a Workwell integration to ensure the best user experience with a strong attention to the security aspects of our technical model:

* Automatic user identification: By using Workwell, users can access all the services provided by their companies, they shouldn’t need to manually login in or create accounts when opening your service. Use the JS-SDK to get the user’s informations so you can, behind the hood, automatically create an account or log the user in. **User should never therefore have to login to use your service**.

* Mobile friendly: We require your service to be mobile friendly and to respect Workwell UI guidelines. We strongly recommend you to use the JS-SDK UI features!

* Expose an authorization endpoint: Your server needs to expose an endpoint Workwell servers can call to verify your service health and its authenticity, c.f. [Service Authorization](docs/service-authorization.md)

*We also recommend using classic navigation with `<a href="...">` and not SPA (single page application) router. A native app opens a new view/page when navigating from one content to another, cf [Open Web Page](docs/js-sdk.md#openwebpage) for more information*


## Documentation

* [Getting Started](docs/getting-started.md) 
    1. [Get the Workwell mobile test app](docs/getting-started.md#workwell-mobile-test)
    2. [Access your local (or online) web app](docs/getting-started.md#access-web-app)
    3. [Get a service-secret and a service-id](docs/getting-started.md#service-secret-id)
    4. [Implement a service-token generation method](docs/getting-started.md#service-token)
    5. [Build your first Workwell web app](docs/getting-started.md#build-first)
* [Debugging](docs/debugging.md)
   * [iOS](docs/debugging.md#ios)
   * [Android](docs/debugging.md#android)
* [Service Authorization](docs/service-authorization.md)
* [Service Token Generation Examples](docs/service-token-examples.md)
* [UI Guidelines](docs/ui-guidelines.md)
* [UI Components](docs/ui-components.md)
* [JS-SDK](docs/js-sdk.md)
    * [Bridge with the app](docs/js-sdk.md#bridge-with-the-app)
    * [UI](docs/js-sdk.md#ui)
* [Workwell API](docs/api.md)
* [FAQ](docs/faq.md)


## Creators

**Zachary Lithgow**

* <https://github.com/zlithgow>
