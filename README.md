# Net Promoter Score form & dashboard

##### This project is forked from [BCHteam1's repositories](https://github.com/BCHteam1/)

## Super Quick Start

```
$ npm install       # install deps
$ npm start         # start form & dashboard dev env
$ npm run deploy    # build & deploy to Firebase
```

## 1. Project purpose

The purpose of this application is to measure the net promoter score of the customer.
The net promoter score is a research metric that takes the form of a single survey question asking respondents to rate the likelihood that they would recommend a company, product, or a service to a friend or colleague.
The typical question is:

> How likely are you to recommend us?

The scale for the answer ranges from 1 to 10.

The net promoter score can be interpreted and used as an indicator of customer loyalty and its value ranges from -100 to +100. A specific net promoter score can be used, for example, as a threshold for a bonus salary payment. For instance an employer can set a net promoter score of 30 as the threshold to pay a bonus to her employees.

The purpose of this application is to create a survey that can be embedded in any site.

## 2. Architecture

The project is divided into two applications:
- [`form`](./form/)
- [`admin-dashboard`](./admin-dashboard/)

The applications and the database are hosted on Firebase.

### 2.1 Main languages and technologies: Firebase & React

- Javascript/JSX
- React
- Material UI/css
- nivo for data visualization
- nodejs
- git/GitHub
- cypress for E2E testing
- [Firebase](https://firebase.google.com/)
  - Firestore

### 2.2 Information collected from users<a id='2.2'></a>

The survey collects from the user only the likelyhood rate, that is a number for 1 to 10, and an optional comment. These informations are stored into the database with a generated timestamp.

No cookies are collected or stored so there is a No Cookie Policy.

When a user submits the survey, an item with an expiration date is set into the browser localStorage so that is not possible to submit again the form in the following 30 days.

If a user does not want to answer and clicks the CLOSE button, an item with an expiration date is set into the browser localStorage so that the form is not presented again in the following 7 days.

## 3. Development environment

### 3.1. Prerequisites, and what to do first

In order to set up a development environment for the applications, you need to have `npm` installed.

Install dependencies using `npm`:

```
$ npm install
```

It might be convenient to have [Firebase CLI](https://firebase.google.com/docs/cli) globally installed, but it can be used through `npx` too:

```
$ npm install -g firebase-tools  # globally install, or
$ npx firebase                   # use thru `npx`
```

### 3.2. Start the applications locally

Run the applications:

```
$ npm start
```

Form and dashboard should be automatically opened in the browser.
Form can be accessed at [`localhost:3000`](http://localhost:3000), admin dashboard at [`localhost:3001`](http://localhost:3001) 

**N.B.:** *Despite running locally, applications are currently using the project's Firestore storage.*

**N.B.:** *Local storage must be cleared (e.g. using developer console) between the form submissions, for more details, see [section 2.2](#2.2)*

### 3.3. Run tests

#### TODO

`license-checker` will automatically check that all packages and dependencies pass the licence check.
The allowed licences can be found in `<app_dir>/config/license-checker-config.js`
The last two licences, `0BSD` and `CC0-1.0` still need confirmation from the legal deparment. They were added to the customer provided list to pass the licence check.

## 4. Production environment

### 4.1 Deployment

The applications are deployed to Firebase Hosting, check the configuration files and Firebase project settings for details:

- [`.firebaserc`](./.firebaserc)
- [`firebase.json`](./firebase.json)
- [`firestore.rules`](./firestore.rules)

The applications can be built and deployed to Firebase with a convenience script:

```
$ npm run deploy
```

### 4.2 Access control

Access control is implemented with Firestore security rules, see [`firestore.rules`](./firestore.rules).

Since the form is designed to allow anonymous submissions, unauthenticated writes to collection `/reviews/` are allowed.

Collection can be read only if currently authenticated user has the role `admin`. Role to user account mappings are defined in the collection `/users/`.

#### Add a new admin user

Create a new email/password user to Firebase Auth at the web console.

Then, create a new document into the collection `/users/` through the Firebase web console.
Document ID should be user's email and it should have a field `role` with a value `admin`.

#### 4.3 Form embedding

- Place the below HTML elements anywhere on your page

```html
<!-- EMBEDDABLE PROMOTER SCORE SURVEY -->
<div id="psForm"></div>
<script
  src="<URL TO DEPLOYMENT /static/js/main.*.js>"
  type="text/javascript"
></script>
<!-- EMBEDDABLE PROMOTER SCORE SURVEY -->
```

## 5. Continuous integration

Changes in the form repository will not result in a new automatic deploy. Requires manual deployment.

## 6. Code style

Cypress requires the following:

in `package.json`

```json
"eslintConfig": {
  "extends": [
    "react-app",
    "react-app/jest"
  ]
},
```

## 7. Screenshots

![Mobile view of empty form](src/components/assets/ScreenshotEmptyForm.png?raw=true "Empty form")

![Mobile view of filled form](src/components/assets/ScreenshotRatedForm.png?raw=true "Filled form")
