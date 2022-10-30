# Expense Tracker
Application for keeping track of your expenses.

## Technical stack
* TypeScript
* React
* Redux Toolkit + RTK Query
* TailwindCSS
* Node
* Express
* MySQL(Sequelize ORM)

## Installation and Setup Instructions
Clone down this repository.  
You will need `node` and `npm` installed globally on your machine.  
### Front End
- Open the terminal and navigate to `client` folder - `cd client`
- In the terminal type `npm install`
- You will need a `.env` file in the `client` folder with the following:  
  - ``` REACT_APP_SERVER_ADDRESS=http://localhost:5000 ``` (PORT should be the same as the server's settings)
- In the terminal type `npm start`
### Back End
- Open the terminal and navigate to `server` folder - `cd server`
- In the terminal type `npm install`
- You will need a `.env` file in the `server` folder. Example `.env` file:
  - `PORT=5000` (PORT should be the same as the client's settings)
  - `SALT_ROUNDS=1`
  - `SECRET_KEY=veryhardsecretkey`
  - `JWT_EXPIRATION_TIME=86400`
  - `DB_HOST=localhost`
  - `DB_USER=root`
  - `DB_NAME=expense-tracker`
  - `DB_PASSWORD=veryhardpassword`
  - `DB_PORT=3306`
- In the terminal type `npm run dev`/`npm run dev:mac`/`npm run dev:linux`
