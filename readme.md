# Task-menager-api

## Main api file

    app.js

## Setup

    1. Rename .env-template to .env
    2. Fill in data in .env
    3. Run command "npm install; sequelize db:migrate"
    4. Next run command "npm run dev"

## Allowed queries

| Function              | Request method | Request URL          |
| --------------------- | -------------- | -------------------- |
| Get all tasks         | GET            | /api/tasks           |
| Get current user task | GET            | /api/task/:userID    |
| Add new task          | POST           | /api/task            |
| Change main task      | PUT            | /api/task            |
| End task specific     | DELETE         | /api/task/:taskID    |

In request URL ":" mean title data from database

To POST new task we have to add json body in our query like this:

```json
    {"taskName": "Some name for new task"}
```

When we use PUT method we have to add json body like in POST method:

```json
{
    "taskID": "task id int",
    "userID": "user id int"
}
```

## How to send request?

    You may send request using postman! Try it!

## Problems and development

* Because of some problems with instaling typescript app is not written in typescript. I will updateapp as soon as it is posible but for now i have to fix the issues.
* I was trying to make app with may use more ther one user it's not the best bot for now it's opcional.
* In future we may add more endpoints witch may give us data necessary to create chart.
