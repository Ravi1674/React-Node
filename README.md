# MERN Application
A basic Authentication web application developed using MERN tech-stack,having features like JWT Authorization , Session Expiration, Login.
## How to Run
- Clone the repository on your local PC
- Open terminal from backend folder.
- Run `npm i` on the terminal.
- Run `npm start` on the terminal.
- Open terminal from frontend folder as well.
- Run `npm i` on the terminal.
- Run `npm start` on the terminal.
- It will automatically open application on your browser.
- If not openend automatically then type `http://localhost:3000/` on browser to run the application.
### Note:
You can login to the system using given credentials:
Username : `ravi@gmail.com`
Password : `123456`
## Flow of Web Application
- Click on Login Tab and enter credentials
- After successfull authentication, You will be redirected to the Dashboard Page.
- Dashboard contains the user data coming from API.
- There is functionality of filter the data based on type.
## Authorization Flow
- On successful authentication , A Token is generated whoose expiring time is already set
- For security purposes, this Token is passed through `httpOnly` cookie which is only accessed and read by browser.
- The Password is stored in encrypted form in the Database.
