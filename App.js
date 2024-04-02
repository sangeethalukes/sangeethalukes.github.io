const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();
const PORT = process.env.PORT || 3000;

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Serve static files
app.use(express.static('public'));

// Contact form submission endpoint
app.post('/contact', (req, res) => {
    const { name, email, message } = req.body;

    // Create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'sangeethaluke@gmail.com', // Your Gmail email address
            pass: 'Slm250803' // Your Gmail password
        }
    });

    // Setup email data with unicode symbols
    let mailOptions = {
        from: `${name} <${email}>`, // sender address
        to: 'recipient@example.com', // list of receivers (your email address)
        subject: 'New Contact Form Submission', // Subject line
        text: message // plain text body
    };

    // Send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log('Error sending email:', error);
            res.status(500).json({ success: false, message: 'Error sending email' });
        } else {
            console.log('Email sent:', info.response);
            res.json({ success: true, message: 'Email sent successfully' });
        }
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
