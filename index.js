const express = require('express');
const mongoose = require('mongoose');
const app = express();
const dotenv = require('dotenv').config();
const port = process.env.PORT || 3000;
const Joi = require('@hapi/joi');
const email = require('./email/sendmailtoall');

mongoose.connect('mongodb://localhost/appointment_app', {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('connected to mongoDb');
});

const onSuccess = "Appointment was successfully made! you will soon recieve an email on the confirmation of your appointment timing.";
const onFailure = "Appointment Wasn't successful. Please try again later.";
const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    appointmentTime: {
        type: String,
        required: true
    }
});

const Model = mongoose.model('appointments', schema);

function validate(appointment) {
    const schema = {
        name: Joi.string().min(3).max(100).required(),
        email: Joi.string().min(3).max(255).required().email(),
        phone: Joi.string().min(3).max(100).required(),
        time: Joi.string().min(1).max(16).required(),
    }

    return Joi.validate(appointment, schema);
}

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }))

app.get('/', async (req, res) => {
    res.render('index', { appointment: { status: '', message: '' } });
});

app.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if(error) return res.render('index', { appointment: { status: 'notMade', message: error.details[0].message } });

    const newAppointment = new Model({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        appointmentTime: req.body.time,
        time: new Date(),
    });
    await newAppointment.save();

    email(process.env.YOUR_EMAIL, 'The appointment', 'An appointment on your clinic',
         `<b>${req.body.name}</b> has tried to take an appointment on ${req.body.time}, you can contact him via email on ${req.body.email} or call on ${req.body.phone}...`)

    email(req.body.email, 'Info on the appointment', 'Your appointment', `You have tried to take out your time and have willing to have an appointment on <b>${req.body.time}</b> and soon will get a confirmation email on the real appointment time. have a grat day.`)

    res.render('index', { appointment: { status: 'made', message: onSuccess } });
});

app.listen(port, () => {
    console.log('listening on port %d....', port);
});