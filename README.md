# Project setup
There are two steps you need to take before the project is running.<br>
You need to pull the project and open it in visual studio code for example. Then you need to enter this command in the terminal:<br>
```
npm i
```
This will import all the dependecy that are needed. If you cant do this, maybe you dont have NodeJS installed and need to install it.<br>
<br>
If this worked than you can launch the project:
```
npm run serve
```
### Custom link
If you want to change the link to the api because its running on a different port than the project, you can go to the properties.json file and change the link to yours to get it running. You need to reserve the project to get the link working.

### User creation and login
When you go to the front end on the first time you see a login screen. If you dont have a account you can create on by entering the create menu and filling out the form.<br>
If everything is filled in correctly you are routed back to the login page. Before you can login, you need to set the user in the database on enabled. You can do this by go to your local database and change the enabled field in the table User from 0 to 1.<br>
<br>
Now you user is enabled and you should have the possibility to login now.
