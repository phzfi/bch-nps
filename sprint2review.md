# Sprint 2 review

## Feedback/ TO DO for all

1. - [ ] Dashboard: everything in ONE screen is good, no extra clicking needed
2. - [ ] Always: rememebr to have enough whitespace
3. - [ ] THE question for the form is: see DIMBAL
4. - [ ] Time selection is at the left upper corner where the score is. It effects the pie chart. The lower chart/promoter score over time can show always 1 year
5. - [ ] Sorting comments: show the latest comment at the top 
6. - [ ] HR/Maj wants to see comments of the selected time span near the promoter score
7. - [ ] Doughnut percentages of promoters, detractors and passives are clickable and will show the relative comments
8. - [ ] Maj wants to see the TOTAL RESPONSES count for a time period (as I understod it, she also wants to be able to see last year's April, for example)
9. There is NO REQUIREMENT for multiple questionnaires
10. - [ ] machine readable API so that on the last/first day of every month they make an API query to ask what is the PS average --> if it's grater than X (was it 30?) a bonus will be paid
11. - [ ] host backend (PHZ server?)
12. - [ ] graph for response volume is optional
13. - [ ] Additional req: Google React Localization FI SWE EN ---> how the customer can change lang: is it a hardcoded JSON in the backend or other way?



### Feedback/ TO DO for Team-1:

1. - [ ] If user does not want to anwer the survey and clicks CLOSE, offer the survey again in 1 week (this question may have been misunderstood but it's ok)
2. - [ ] Postpone login --> or use apache openId login, in other words Facebook login. It's also possible to have no login at all so that the Dashboard is only shown internally. It's a burden fpr HR to have yet another registration to handle. They're moving towards diminishing them. Google authentication is still ok. Or what Tero is using --> keywhatlog?
3. - [ ] sorting of comments could be done by date so that the most recent is shown on top
4. - [ ] required time period is 6 months. All data can also be one option to show but with low priority

### Still to do from previous sprint:
1. - [ ] check font for textarea
2. - [ ] fix stars' labels position in form
3. - [ ] continue documentation
4. - [ ] snackbar transition
5. - [ ] form transition

### Feedback to specific questions/groups:
1. - [ ] To Abel: Maj suggested the text "Why/why not" to ask the reason of the given score


#### Doubts:
1. does localStorage work on mobile?
