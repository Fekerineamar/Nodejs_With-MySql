NodeJS Sign in Signup with Fetch API/MySQL DB

# How To Use

# Package Needed!
```
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

## Read Carefully or watch on Youtube!

this app for nodejs with mysql database, we will create Home page with Signup/Signin Popup and profile page for the user to modify username and email & password, etc..
also we have validation in frontEnd and backend, validation for all forms and also for image, validation for image checking the binary of file ,
because checking extention .jpeg/.png with multer is not enough, this will let the attckers inject a code for your server for example he can make a php file like index.php.jpg!
so at this time your server will accept the extention .jpg and actually the file is not jpg it's php and when reading the file it can excute on your server!!,
(this is just an example for php it can be any thing!)
so before accept that file to store it on the server and sending back to the client I make a simple solution to verify the binary of the file,
if it's not jpg or png we will delete it! if it's a validate binary we will store the name to database and return it to the client if request it!

#How To install

- Make sure you installed Nodejs ^16v
- Mysql server
- After you download the code go to db.js and change information of the database
- the default is (root@localhost, pass=Admin123)

```
git clone https://github.com/Fekerineamar/Nodejs_With-MySql
cd Nodejs_With-MySql
npm install 
npm start
```

