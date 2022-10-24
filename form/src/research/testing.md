# Testing:
  
see different testing: https://www.youtube.com/watch?v=qLZArtTme8M
  - usability: what happen when a call comes, how easy to use
  - compatibility: different OS, browsers
  - interface: buttons, navigation, history
  - low-level resource testing: what if there's no permission to access database or data is corrupted
  - security: input validation, authentication...
  
## cypress

Better for testing interaction https://www.cypress.io/
  
```sh
npm install cypress --save-dev
```
  
run cypress:
```sh
./node_modules/.bin/cypress open
```
  
or add the script to package.json:
```json
"cypress:open": "cypress open"
```
  
and then run it with:
```sh
npm run cypress:open
```
  
In UI you will have options to test browsers you have locally installed (except Electron).
  
Write a new test under the cypress/integration folder, ex. `sample.js` and it will show in the UI list of tests.
  
![Screenshot 2022-04-13 at 21 01 18](https://user-images.githubusercontent.com/88823568/163242270-634eb93f-3485-4056-97ab-290e0c8a0064.png)
  
![Screenshot 2022-04-13 at 21 02 08](https://user-images.githubusercontent.com/88823568/163242390-3f692e67-8438-4926-a61c-a09c7434b8ff.png)
  
To run the test you can click on the test on UI.

If you got a cy is not defined error:
  
Add a `.eslintrc.json` file to the cypress directory:

```json
{
  "root": true,
  "extends": ["plugin:cypress/recommended"],
  "env": { "cypress/globals" : true }
}
```
  
Tests in UI are clickable, pinnable... you can see before and after an action and have addittional info from inspect tool tv.apple.com  
  
Special commands dedicated to the task of debugging.

For instance there is:

cy.pause()
cy.debug()
  
Example of tests: start at minute 12 https://docs.cypress.io/guides/getting-started/testing-your-app#What-you-ll-learn

## Browserstack

Compatibility testing, browserstack https://www.browserstack.com/screenshots to test screenshots on different browsers, OS, browser versions.
Tutorial from 2014, still good. James Stones from Futurice https://www.youtube.com/watch?v=yg_5hXSHbVw
  
## backstopjs

Better for visual regression and _simple_ interaction:
  
Visual Regression Testing with BackstopJS https://www.youtube.com/watch?v=_JvqXIkxBqo
basically to see that changes in css only changes what you wanted to and nothing else.
  
```sh
npm install backstopjs --global 
```
  
Installing only in the project (not globally) will result in a failed backstop init (or maybe in that case it's only `init`, check the script in package.json:
  
Create `backstop.json` with:
  
```backstop init```
  
  
In "scenarios" you can put the pages you want to test (your local development version for example) in "url" against the reference site "referenceUrl" (the online version for example).
  
![Screenshot 2022-04-13 at 17 10 22](https://user-images.githubusercontent.com/88823568/163199642-9fada195-436d-461f-9c45-35087099a4a4.png)

 
Then take a snapshot of the reference site i.e. screenshots of different vieports: 

```sh
backstop reference
```
  
and then take snapshot of site you want to test (local dev site):
  
```sh
backstop test
```
  
The 2 snapshots will be compared and results given in a new brwser tab:
  
  
  
![Screenshot 2022-04-13 at 17 16 11](https://user-images.githubusercontent.com/88823568/163200881-703c7d55-f4e9-4380-8bb8-a179ba666ebf.png)

  
  
The problem may be that the page has not loaded when the screenshot is taken --> add a delay:
 
```json
"delay": 100,
```
  
Try again `backstop reference` and `backstop test` --> now tests now pass.
  
To approve changes, i.e. to take in the changes into the reference:
```sh
backstop approve
```
  
  
If you want to test only a part of the site, grab a class name, for example .container:
  
```json
"readySelector": ".container",
```
  

To test simple interaction like clicking and hovering: https://www.youtube.com/watch?v=CfGDPhU8qkQ
  
- make a new scenario
- add selector in `clickSelector` es. '.search'
  
To make a new reference only for a specific selector, use the scenario label (name):

```sh
backstop reference --filter=search
```
To make a new test only for a specific selector, use the scenario label (name):

```sh
backstop test --filter=search
```
  
To find a selector, in inspect tool you can right click "copy selector paht"
  
  
### Backstopjs workflow:
  - a. pull last approved version
  - b. make a reference
  - c. work on new feature
  - d. test (new scenrario) on newly implemeted feature
  - e. if test pass and it's approved --> push and merge
 
