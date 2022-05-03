# Promoter Score Documentation V1.0.0

## 1. Project purpose

The purpose of this application is to measure the promoter score of the customer.
The promoter score is a research metric that takes the form of a single survey question asking respondents to rate the likelihood that they would recommend a company, product, or a service to a friend or colleague.
The typical question is:

`How likely are you to reccomend us?`

The scale for the answer ranges from 1 to 10 or from 0 to 10.


The promoter score can be interpreted and used as an indicator of customer loyalty and its value ranges from -100 to +100. A specific promoter score can be used, for example, as a treshold for a bonus salary payment. For instance an employer can set a promoter score of 30 as the threshold to pay a bonus to her employees.


The purpose of this application is to create a survey that can be embedded in any site.

## 2. Architecture

<span style="color:red">Don't hesitate to use a picture.</span>

The project is divided into three repositories:
  - form --> https://github.com/BCHteam1/ps_form

The survey form is deployed on Netlify. Changes in the form repository will result in a new automatic deploy.

  - dashboard --> https://github.com/BCHteam1/admin_dashboard

The survey will be deployed on <span style="color:red">XXX</span>

  - backend --> https://github.com/BCHteam1/promoter_score_backend


The database will be hosted on <span style="color:red">XXX</span>


### 2.1 Main languages and technologies: PERN stack  

- Javascript/JSX
- React
- Material UI/css
- nivo for data visualization
- Postgres for database
- nodejs
- express
- Sequelize, a promise-based Object–relational mapping tool
- git/GitHub
- cypress for E2E testing
- <span style="color:red">else? please check list</span>


### 2.2 Information collected from users

  The survey collects from the user only the likelyhood rate, that is a number for 1 to 10, and an optional comment. These informations are stored into the database with a generated timestamp.

  No cookies are collected or stored so there is a No Cookie Policy.

  When a user submits the survey, an item with an expiration date is set into the browser localStorage so that is not possible to submit again the form in the following 30 days.

  If a user does not want to answer and clicks the CLOSE button, an item with an expiration date is set into the browser localStorage so that the form is not presented again in the following 7 days.

## 3. Development environment

### 3.1. Prerequisites, and what to do first

In order to set up a development environment you need to have installed:


  - form
 <span style="color:red">CHECK --> all needed?</span>
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

  - backend <span style="color:red">CHECK --> all needed?</span>
```json
"dependencies": {
  "@nivo/bar": "^0.79.1",
  "@nivo/core": "^0.79.0",
  "@nivo/line": "^0.79.1",
  "@nivo/pie": "^0.79.1",
  "@testing-library/jest-dom": "^5.16.4",
  "@testing-library/react": "^13.0.1",
  "@testing-library/user-event": "^13.5.0",
  "axios": "^0.26.1",
  "classnames": "^2.3.1",
  "react": "^18.0.0",
  "react-dom": "^18.0.0",
  "react-router-dom": "^6.3.0",
  "react-scripts": "5.0.1",
  "web-vitals": "^2.1.4"
},
"devDependencies": {
  "cypress": "^9.5.4",
  "license-checker": "^25.0.1",
  "license-to-fail": "^4.0.0"
}
```

  - backend <span style="color:red">CHECK license ISC?</span>
```json
"dependencies": {
  "cors": "^2.8.5",
  "express": "^4.17.3",
  "mocha": "^9.2.2",
  "pg": "^8.7.3",
  "pg-hstore": "^2.3.4",
  "sequelize": "^6.17.0"
},
"devDependencies": {
  "chai": "^4.3.6",
  "supertest": "^6.2.2",
  "license-checker": "^25.0.1",
  "license-to-fail": "^4.0.0"
}
```

At the moment there is no separate file for environmental variables. If there will be one, a developer will get one that works from  <span style="color:red">XXX</span>

<span style="color:red">
Are other changes - such as /etc/hosts, port-forwardings - needed?</span>

### 3.2. Run tests


To run Cypress E2E form test:

```sh
npm run cypress:open
```

To run cypress tests on browserstack:

```sh
browserstack-cypress run --sync
```


### 3.3. Migrations

<span style="color:red">How to run database migrations locally (if necessary). Sometimes the migrations are run as part of the test suite,
which is preferable.</span>

### 3.4. Start the application locally

  - open the form with:

  ```sh
  npm start
  ```

  - open the admin dashboard to see the promoter score and charts with:

  ```sh
  npm start
  ```

  from the dashboard project https://github.com/BCHteam1/admin_dashboard 


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


  - start the database with <span style="color:red">XXX</span>

### 3.5. Access the application locally

To access the locally running application go to `localhost:3000` or whatever port is set by `npm start`


At the moment no credentialis are needed to access relevant pieces of the application. Login implementation has been postponed as per customer's suggestion since the application can be used internally with no need for login.

### 3.6. IDE setup

No particular setup needed.

### 3.7. Version control: git 


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

### 3.8. How to make a production data dump and import it into the local development environment

<span style="color:red">Sometimes you run into hard-to-reproduce bugs, which manifest themselves only with production data. In those cases it is extremely useful to be able to do a data dump from production and set up the local
development environment with production data. Describe how to do that here.</span>

## 4. Test environment

### 4.1. Access

- The URL where the test environment of the application can be found:  <span style="color:red">https...</span>

- The credentials to use in the test environment. For example, username and password <span style="color:red">Do we need DB info here?</span>

### 4.2. Deployment

 <span style="color:red">How a deployment is done.</span>


### 4.3. Verifying that a deployment was successful

 <span style="color:red">The steps needed to verify that a new version is running in the test environment successfully.</span>

#### 4.3.1. Automated test cases

<span style="color:red">Tests (scripts or otherwise) that you have to run in order to ensure that a deployment was successful.</span>

#### 4.3.2. Manual test cases

<span style="color:red">Things that you have to test manually in order to ensure that a deployment was successful.</span>


### 4.4. Rollback

<span style="color:red">How to restore the previous version of the software when a deployment goes wrong?</span>


## 5. Production environment

### 5.1. Access

- The URL where the test environment of the application can be found:  <span style="color:red">https...</span>

- The credentials to use in the test environment. For example, username and password <span style="color:red">DB info here?</span>

-  <span style="color:red">If a VPN, SSH tunneling or some other similar way to access the production environment is required,
  describe the steps needed here.</span>

#### 5.1.1. Usage

- Place the below HTML elements anywhere on your page

 <span style="color:red">UPDATE LINK</span>
```html
<!-- EMBEDDABLE PROMOTER SCORE SURVEY -->
<div id="psForm"></div>
<script
	src="https://prismatic-stardust-51d9cb.netlify.app/static/js/main.8b4b971a.js"
	type="text/javascript"
></script>
<!-- EMBEDDABLE PROMOTER SCORE SURVEY -->
```
<span style="color:red">UPDATE LINK</span>


### 5.2. Deployment

<span style="color:red">How a production deployment is done.

### 5.3. Verifying that a deployment was successful

<span style="color:red">The steps needed to verify that a new version is running in production successfully.

#### 5.3.1. Automated test cases

<span style="color:red">Tests (scripts or otherwise) that you have to run in order to ensure that a deployment was successful.</span>

#### 5.3.2. Manual test cases

<span style="color:red">Things that you have to test manually in order to ensure that a deployment was successful.</span>

### 5.4. Rollback

<span style="color:red">How to restore the previous version of the software when a deployment goes wrong?</span>

### 5.5. Logs

<span style="color:red">Where are the logs, how to change logging levels, etc.</span>

### 5.6. Monitoring

<span style="color:red">What things are monitored? Which tools are used? How to access the UI(s) of the monitoring tools?</span>

## 6. Continuous integration

The form depolyment is connected to the form repository. Any change pushed into the form repository will initiate a new automatic deploy on Netlify.

<span style="color:red">Dashboard? Backend?</span>

## 7. Code style

in `package.json`  <span style="color:red">Check if needed</span>

```json
"eslintConfig": {
  "extends": [
    "react-app",
    "react-app/jest"
  ]
},
```

## 8. Operating instructions for manual and semi-manual processes

<span style="color:red">Many applications require some manual processes which occur from time to time, like for example
adding new users, doing manual database maintenance work, creating monthly reports etc. Describe how to do them here. The descriptions have to be detailed enough so that someone else can do them
with these instructions.</span>

## 9. More useful information, Tips and Tricks

<span style="color:red">DELETE?</span>
- We used [jsDelivr](https://www.jsdelivr.com/) to use our form embedding script as _src_ attribute in HTML script element

## 10. Screenshots

![Mobile view of empty form](src/components/assets/ScreenshotEmptyForm.png?raw=true "Empty form")

![Mobile view of filled form](src/components/assets/ScreenshotRatedForm.png?raw=true "Filled form")