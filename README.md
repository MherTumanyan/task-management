# Task Management System

## Description

A task management system built with Node.js, Express, and MongoDB. This application allows users to create, view, and update tasks. It also includes reporting capabilities for generating JSON reports.

## Features

- Create tasks with title, description, due date, priority, and assigned member.
- Update task status and mark tasks as complete.
- View task details.
- Reporting on task completion by time period or team member.

## Setup Instructions

1. Clone the repository.
2. Install dependencies: `npm install`.
3. Set up environment variables by copying `.env.example` to `.env` and modifying it with your values.
4. Start the server: `npm start`.
5. Run tests: `npm test`.

## API Endpoints

- `POST /api/tasks`: Create a new task.
- `GET /api/tasks`: Retrieve all tasks.
- `PATCH /api/tasks/:id/status`: Update task status.
- `GET /api/reports`: Generate a report based on specified parameters.

## Running Tests

You can run the entire test suite or test specific files using the following npm scripts:

- **Run all tests**: To execute the full test suite, use:
  ```bash
  npm test
  ```
- **Run report tests only**: To execute tests specific to reports, use:
  ```bash
  npm run test:report
  ```
- **Run task tests only**: To execute tests specific to tasks, use:
  ```bash
  npm run test:report
  ```

## Security

- The application uses `helmet` to secure HTTP headers.

## API Testing with Postman

For convenience, a Postman collection is included in the root directory of the project. This collection contains pre-defined requests for testing the API endpoints.

How to Use the Postman Collection
Open Postman.
Click on "Import" in the top-left corner.
Choose the "File" tab and select the Postman collection file from the root directory of the project.
Click "Import" to add the collection to your Postman workspace.
Use the collection to test the API endpoints by sending requests and verifying responses.
