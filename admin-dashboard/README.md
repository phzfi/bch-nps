# Net Promoter Score Dashboard

## 1. Dashboard

The purpose of this application is to create a dashboard that can analyse survey results and calculate the net promoter score.

## 2. Main languages and technologies

- Javascript/JSX
- React
- nivo for data visualization
- git/GitHub
- jest

## 3. Development environment

In order to set up a development environment for the applications, you need to have `npm` installed.

Install dependencies using `npm`:

```
$ npm install
```

To run the dashboard locally:

```
$ npm start
```

## 4. Production environment & configuration

For information about production deployment and configuration, see [root `README.md` section 4.](../README.md#4.)

## 5. Usage

Main dashboard page shows all the data and how it has been analyzed.

Embed page has HTML code which can be used to add our survey to any website.

### 5.1. Access control

Reviews can be read only by users with a role `admin`. To learn how to add admin roles, see [root `README.md` section 4.2.1.](../README.md#4.2.1.)

### 5.2. Pie chart

- User can change time period for the data analysis: 1 month, 3 months, 6 months and 1 year. This affects all the parts of dashboard.

- In the middle of the pie chart is promoter score calculated for the chosen period of time. Around it are green, yellow and orange parts, which show amount of Promoters, Passives and Detractors.

- By clicking on colorful parts of the pie chart, user will get only relevant comments. For example, clicking on Promoters, user will only see Promoters' comments. If user wants to see all the comments again, he/she should click on responses box in the top right corner of pie chart.

### 5.3. Comments section

- On the right side of the pie chart is the comment section. It is affected by the pie chart as explained earlier.

- Next to the header user can see overall amount of comments. All comments are sorted in a way that user can see newest comments first.

- Each comment part has a score, a star, a comment and a date. Based on Promoters, Passives and Detractors each comment has different background and star color which coresponds with the score.

### 5.4. Trend

- Trend shows the promoter score changes for every day of the chosen period of time.

- Some labels are skipped based on time selection.

- On the left side is the score level from -100 to 100 and on the botton are the dates. Bonus limit is 30, by reaching it employee could get some bonuses for their work.

- Blue line shows the promoter score and black thin line alignes it with the date.

### 5.5. Response Volume

- Response volume shows the amount of Promoters, Passives and Detractors per day.

## 6. Screenshots

<img width="1440" alt="Screenshot 2022-05-19 at 14 49 14" src="https://user-images.githubusercontent.com/75204814/169286529-f21c0328-2dcd-478d-bd89-13828b29a10a.png">

<img width="1204" alt="Screenshot 2022-05-19 at 14 51 11" src="https://user-images.githubusercontent.com/75204814/169286894-7fc9b2b3-3f25-44be-a8a0-cd0614f6d549.png">

<img width="1440" alt="Screenshot 2022-05-19 at 14 51 44" src="https://user-images.githubusercontent.com/75204814/169286983-a47f1874-4825-4ce3-a047-085a5886e2bd.png">
