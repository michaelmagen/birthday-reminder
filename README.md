# birthday-reminder

Welcome to the Birthday Reminders web app! This full-stack application allows users to create an account, add birthdays to their account, and receive text reminders on the day of the person's birthday. Visit the live site [here](https://birthday-reminder.fly.dev/).

## Local Setup

To run the application locally using Docker:

1. Clone the repository
2. Create a .env file and replace with your own
3. Run the command `docker-compose up` to start the application
4. Access the application at localhost:3000

## Project Description

### Backend

The backend of the application is built using Node.js and Express. It features a RESTful API and uses a Postgresql database to store the data. The app also uses the Twilio client to send text reminders to users through a cron schedule.

### Frontend

The frontend of the application is built using React. It features a responsive design and uses Supabase auth for secure authorization.

### Deployment

The application is deployed through fly.io and can be accessed live. It is also dockerized, which means it can be run locally with the command "docker-compose up". Please note that the .env variables need to be replaced to run the project locally.

## Credits

Created by Michael Magen
