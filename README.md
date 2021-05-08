# Appointment app

This is an application made using node.js, express.js and MongoDB as a database, You can take an appointment, the person who took an appointment receives an email on his appointment and even the doctor receives an email on the appointment taken by the patient

# The packages used in the application

the packages used are:
1. @hapi/joi
2. express
3. mongoose
4. ejs
5. nodemailer

views are shown using ejs(embedded javascript template).

# The procedure to use the app.

first of all, open the folder in a terminal, and run `npm install` to install all the packages from the internet in order for the application to run. 

Then create a `.env` file and enter the following.
<br>
<br>

```
    EMAIL=example@email.com
    PASSWORD=email_ID_above_password
    YOUR_EMAIL=Doctors_email_id@email.com
```

Make sure that your email doesnt have two step verification
and make sure that you enebled `less secure apps` option by going to 

<br>

https://myaccount.google.com/lesssecureapps

# The procedure to use your app

Go on to `http://localhost:3000` and fill in all informations, if you have followed the above given steps, the doctor and the mail id sent through the form will recieve an email on the appointment

---

<b>Enjoy your powerfull Application.</b>
