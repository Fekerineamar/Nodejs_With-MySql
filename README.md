# README.md

# NodeJS Sign in Signup with Fetch API/MySQL DB

- This app for nodejs with MySQL database.
- we will create a home page with a signup/login popup and a user profile page to edit username, email, password, etc...
- Also we have validation in the frontend and backend, validating all Forms and image files.
checking the image extension .jpeg/.png with multer is not enough, this will allow attackers to inject code to your server, 
it can generate a PHP file for example index.php.jpg! So your server will accept the extension .jpg and in fact, the file is not jpg it is PHP and when reading the file it can be executed on your server!! (this is just an example of PHP it can be anything!) 
- So before accepting this file to store on the server and sending it back to the client I tried to make a simple solution to check the binary if it is   not a jpg or png we will delete it! otherwise, we will store the name in the database and return it to the client if it requests it!


## Read How to install or watch on [Youtube!](https://www.youtube.com/channel/UC1_LGJISYiWv3SDbhRF6QsQ/videos)


## Package Needed!
```
"nodemon": ^2.0.16
"bcrypt": "^5.0.1",
"body-parser": "^1.20.0",
"csurf": "^1.11.0",
"detect-file-type": "^0.2.8",
"ejs": "^3.1.8",
"express": "^4.18.1",
"express-session": "^1.17.3",
"multer": "^1.4.5-lts.1",
"mysql": "^2.18.1"
```

## How To install

- Make sure you installed Nodejs ^16.15.1
- install nodemon globally with ``` npm install -g nodemon ``` # or using yarn: ``` yarn global add nodemon``` 
- Mysql server
- open your terminal and run:
```
git clone https://github.com/Fekerineamar/Nodejs_With-MySql
```
```
cd Nodejs_With-MySql
```
```
npm install
```
```
npm start
```
- Any err just do ```npm cache clear --force```
- After you download go to _data/db.js and change information of your database
- the default is (root@localhost, pass=Admin123)
