# Promoter Score Documentation V1.0.0

## 1. Project purpose

The purpose of this application is to measure the promoter score of the customer.
The promoter score is a research metric that takes the form of a single survey question asking respondents to rate the likelihood that they would recommend a company, product, or a service to a friend or colleague.
The typical question is:

`How likely are you to recommend us?`

The scale for the answer ranges from 1 to 10.

The promoter score can be interpreted and used as an indicator of customer loyalty and its value ranges from -100 to +100. A specific promoter score can be used, for example, as a treshold for a bonus salary payment. For instance an employer can set a promoter score of 30 as the threshold to pay a bonus to her employees.

The purpose of this application is to create a survey that can be embedded in any site.

## 2. Architecture

The project is divided into two repositories:
![repos](images/repos.png)

The database is hosted on Firebase Firestore Database.

### 2.1 Main languages and technologies: PERN stack

- Javascript/JSX
- React
- Material UI/css
- nivo for data visualization
- nodejs
- git/GitHub
- cypress for E2E testing
- Firebase

### 2.2 Information collected from users

The survey collects from the user only the likelyhood rate, that is a number for 1 to 10, and an optional comment. These informations are stored into the database with a generated timestamp.

No cookies are collected or stored so there is a No Cookie Policy.

When a user submits the survey, an item with an expiration date is set into the browser localStorage so that is not possible to submit again the form in the following 30 days.

If a user does not want to answer and clicks the CLOSE button, an item with an expiration date is set into the browser localStorage so that the form is not presented again in the following 7 days.

## 3. Development environment

### 3.1. Prerequisites, and what to do first

In order to set up a development environment you need to have installed:

- form

```json
"dependencies": {
  "@emotion/react": "^11.8.2",
  "@emotion/styled": "^11.8.1",
  "@mui/icons-material": "^5.5.1",
  "@mui/material": "^5.5.2",
  "@testing-library/jest-dom": "^5.16.3",
  "@testing-library/react": "^12.1.4",
  "@testing-library/user-event": "^13.5.0",
  "axios": "^0.26.1",
  "react": "^17.0.2",
  "react-dom": "^17.0.2",
  "react-scripts": "5.0.0",
  "web-vitals": "^2.1.4"
},
"devDependencies": {
  "cypress": "^9.5.4",
  "license-checker": "^25.0.1",
  "license-to-fail": "^4.0.0"
}
```

- backend

```json
"dependencies": {
    "@emotion/react": "^11.8.2",
    "@emotion/styled": "^11.8.1",
    "@mui/icons-material": "^5.5.1",
    "@mui/material": "^5.5.2",
    "@testing-library/jest-dom": "^5.16.3",
    "@testing-library/react": "^12.1.4",
    "@testing-library/user-event": "^13.5.0",
    "axios": "^0.26.1",
    "firebase": "^9.7.0",
    "react": "^17.0.2",
    "react-dom": "^17.0.2",
    "react-scripts": "5.0.0",
    "web-vitals": "^2.1.4"
  },
"devDependencies": {
  "cypress": "^9.5.4",
  "license-checker": "^25.0.1",
  "license-to-fail": "^4.0.0"
}
```

### 3.2. Run tests

To run Cypress E2E form test:

```sh
npm run cypress:open
```

To run cypress tests on browserstack:

```sh
browserstack-cypress run --sync
```

### 3.3. Start the application locally

- open the form with:

```sh
npm start
```

`licence-checker` will automatically check that all packages and dependencies pass the licence check. The allowed licences are:

```json
  allowedLicenses: [
    "MIT",
    "Apache-2.0",
    "ISC",
    "Apache",
    "WTF",
    "Public Domain",
    "MPL",
    "CC-BY-3.0",
    "CC-BY-4.0",
    "BSD-3-Clause",
    "BSD-2-Clause",
    "X11",
    "WTFPL",
    "CDDL",
    "LGPL",
    "Apache 2.0",
    "MIT/X11",
    "AFL",
    "(MIT AND CC-BY-3.0)",
    "Unlicense",
    "OFL-1.1 AND MIT",
    "0BSD",
    "CC0-1.0",
  ]
```

The last two licences, `0BSD` and `CC0-1.0` still need confirmation from the legal deparment. They were added to the customer provided list to pass the licence check.

### 3.4. Access the application locally

To access the locally running application go to `localhost:3000` or whatever port is set by `npm start`

### 3.5. IDE setup

No particular setup needed.

### 3.6. Version control: git

- the git workflow used in this project is merge
- we initially agreed on squashing commits to have a clean and readble history but we dropped this practice as the project progressed since we would commit fairly rarely already, once a day or even less often
- no specific commit messages requirements
- naming conventions for branches:
  Create and switch to new branch:

```sh
git checkout -b feature/T1-1_featureName
```

where `T1-1`is the issue/task id in Jira, followed by underscore and then the feature name which can is the Jira issue/task title.

When a feature/issue is ready, push to feature branch and make a pull request. Another team member need to merge into main. Possible conflicts may be resolved together.

## 4. Production environment

### 4.1. Access

- The URL where the test environment of the application can be found: https://prismatic-stardust-51d9cb.netlify.app/

#### 4.2 Usage

- Place the below HTML elements anywhere on your page

```html
<!-- EMBEDDABLE PROMOTER SCORE SURVEY -->
<div id="psForm"></div>
<script
  src="https://prismatic-stardust-51d9cb.netlify.app/static/js/main.6b2b7247.js"
  type="text/javascript"
></script>
<!-- EMBEDDABLE PROMOTER SCORE SURVEY -->
```

### 4.3 Deployment

The form is deployed on Netlify on one of our team member's personal account.

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

## 7. More useful information, Tips and Tricks

Firebase config to be replaced with user's own credentials. For that a new project should be created on user's Firebase account.

Open API with a limit of 20 reviews per page: https://firestore.googleapis.com/v1/projects/promoter-score/databases/(default)/documents/reviews To see next page: https://firestore.googleapis.com/v1/projects/promoter-score/databases/(default)/documents/reviews?pageToken={nextPageToken}

## 8. Screenshots

![Mobile view of empty form](src/components/assets/ScreenshotEmptyForm.png?raw=true "Empty form")

![Mobile view of filled form](src/components/assets/ScreenshotRatedForm.png?raw=true "Filled form")
