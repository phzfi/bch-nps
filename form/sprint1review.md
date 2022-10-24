# Sprint1 review, general discussion:

## Form:
1. alternative to **cookie** to prevent answering the form more than once in 30 days: LOCAL STORAGE. This allows to circumnavigate cookie police because the data is not sent to the server. The cookie policy is out of scope anyway because is managed by PHZ/company that embeds the form. Still, make a mention in README such as "Please, mind the cookie policy law..."
2. to avoid GDPR: gather NO INFORMATION from user in terms of geolocation, browser, ip...
3. Extra effects (smiles...) are ok
4. Margit: accessability --> scores are selectable by keyboard
5. Additional feature for a later sprint: form color and font to be selectable based on customer's needs

## Dashboard
- design: if you are up to user experience and design, make your own design. If not, copy the existing design
- most important, minimum requirement: PROMOTER SCORE. The only relevant data. One number between -100 and 100. With a default of 6 months rolling. At the beginning we will have less data of course. Optional: add 1 year rolling, 1 week...
- **ideally** there's one designer who studies the users -> what we want to achieve. Based on that he makes a protoype and tests it with USERS. Then communicates the design to the dev team.
- **in reality** the customer doesn't give you any design. The easieast way is to copy the existing one. The harder is to do some figma or even a proper prototype and user testing. We can test the form with users once we have the embeddable version. To see if there are differences in the results.
- only desktop version required. Responsiveness is a plus.
- initially only one language, English, even if traffic on some sites is international (China, Russia, South-America...)
- no ? logo because 6 different companies: Apprien, PHZ Full Stack, PHZ Game studios... with different logos


## Sprint2: TO DO NEXT for all
1. set up server in PHZ to host the backend. Some teams have already hosted, Firebase, AWS. Docker container?
2. calculate NPS + optional visualuzation on dashboard
3. EMBEDDING the form. iFrame has a big challenge with responsiveness. Try with only HTML and Javascript.
Make instructions for PHZ on how to embed into PHZ site and post them to Antti (in what channel?)
- for AB-testing for all teams --> example: 1st design is responsive on 1 line, 2nd design is responsive on 2 lines
  -  does it work?
  -  are there differences in results based on design? 

## TO DO for us:
### Form:
1. [x] eliminate logo?
2. [x] from cookie to local storage 
3. [ ] numbers inside the stars
4. [ ] bigger stars/margin?  --> min 32px?
5. [ ] check font for textarea
6. [ ] ~~add "powered by Team-1" ?~~
7. [x] check for the score to be added BEFORE submitting? --> submit button could be disabled (Margit's suggestion to team5).
  DONE but still a bug: if we first select a score, then unselect it --> it's still possible to submit. How to fix?


# Feedback team-1:
1. license question: is it ok to add 2 licenses --> Antti will check with legal dep.
2. in form, keep the stars in 1 line but we can do users testing to see if there are differences in the results.
3. Margit: add number for score inside the stars for usability

# Feedback team-2:
- missing: confirm of selection: at the moment when hover on stars, the color of hover and the color of selection are the same. No confirmation of selection


# Feedback team-3:

?? They will send an email to all employers once a month. They wont embed it in a wordpress site. In email there's a link to a page for the survey ??

# Feedback team-4:

effect of color in smiles will be seen in AB-testing

# Feedback team-6:

Form was embedded in Tero's site which was white. There may be a need to change the color of the form, as well as for the font. The site owner may want to modiufy them. It could be an additional feature for a later sprint.

# Feedback team-5:

Check with button "are you sure you want to submit". --> in general it should be avoided because user experience. Best to use Redux with UNDO or back button. In this case we don't need one.