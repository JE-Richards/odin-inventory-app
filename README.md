# Simple Inventory App: An Introductory Express Project

## About

This is the third project from [The Odin Project Node.js course](https://www.theodinproject.com/lessons/node-path-nodejs-inventory-application). The goal is to build a simple inventory management app using [Node.js](https://nodejs.org/en), [Express](https://expressjs.com), [EJS](https://ejs.co), and [PostgreSQL](https://www.postgresql.org).

## Getting Started

To run this project locally, follow these steps:

### Prerequisites

- Ensure you have [Node.js](https://nodejs.org/en) installed locally.
- Ensure you have [PostgreSQL](https://www.postgresql.org) installed and running.

### Installation

1. Clone this repository

   ```bash
   git clone https://github.com/JE-Richards/odin-inventory-app
   ```

2. Navigate to the project directory

   ```bash
   cd your-repo
   ```

3. Run npm install

   ```bash
   npm install
   ```

4. Create a `.env` file in the root of the project with the following variables:

   ```
   HOST=<app_host>
   PORT=<app_port>
   DB_HOST=<database_host>
   DB_PORT=<database_port>
   DB_NAME=<your_database_name>
   DB_USER=<your_database_user>
   DB_USER_PW=<your_database_user_password>
   DB_URL="postgresql://<your_database_user>:<your_database_user_password>@<database_host>:<database_port>/<your_database_name>"
   ```

Replace the placeholders (e.g. `<app_host>`) with your app and PostgreSQL setup values.

5. Populate the database.
   Before you can run the app, you need to populate the database. Run one of the following commands:

- If you have a `DB_URL` specified in your `.env` file:

  ```bash
  node db/populateDb.js
  ```

- Alternatively, if you want to manually specify the database URL, run
  ```bash
  node db/populateDb.js <DB_URL>
  ```

This will populate the database with initial data, allowing the app to function correctly.

6. After running the script, the database will be populated with some initial data and the app is ready to use.

## Running the app

To start the app, run the following:

```bash
node app.js
```

Then open the app in your browser at:

```
http://<app_host>:<app_port>/
```

## Features

The app serves as a simple book inventory manager with the following functionality:

- View a list of all:
  - Books
  - Authors
  - Genres
  - Publishers
- View an individual:
  - Book
  - Author
  - Genre
  - Publisher
- Add a new book through a simple form
- Edit an existing book through a simple form
- Delete a book

## Acknowledgements

- All book information used in `db/sampleData.js` was aggregated from https://www.goodreads.com/
