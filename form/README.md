# Net Promoter Score embeddable form

## 1. Embeddable form

The purpose of this application is to create a user-configurable NPS survey form.

## 2. Main languages and technologies:

- Javascript/JSX
- React
- Material UI/css
- nivo for data visualization
- nodejs
- git/GitHub
- cypress for E2E testing
- Firebase

### 2.1. Information collected from users

The survey collects from the user only the likelyhood rate, that is a number for 1 to 10, and an optional comment. These informations are stored into the database with a generated timestamp.

No cookies are collected or stored so there is a No Cookie Policy.

## 3. Development environment

In order to set up a development environment for the applications, you need to have `npm` installed.

Install dependencies using `npm`:

```
$ npm install
```

To run the form locally:

```
$ npm start
```

## 4. Production environment & configuration

For information about production deployment and configuration, see [root `README.md` section 4.](../README.md#4.)

Survey title can be modified by changing the value of the field `surveyTitle` in the Firestore document `/config/form`.

Post-survey message can be modified by changing the value of the field `thankYouMessage` in the Firestore document `/config/form`.

## 6. Screenshots

![Mobile view of empty form](src/components/assets/ScreenshotEmptyForm.png?raw=true "Empty form")

![Mobile view of filled form](src/components/assets/ScreenshotRatedForm.png?raw=true "Filled form")
