const express = require('express');
const Nexmo = require('nexmo');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send("some response to server being triggerd");
})
const nexmo = new Nexmo({
    apiKey: '2ecd60cc',
    apiSecret: '2Am51wxJETiIr1Rb',
});

app.post('/getdata', (req, res) => {
    console.log(req.body);
    // let otp = Math.floor(100000 + Math.random() * 900000);
    const from = 'KN';
    const to = req.body.doc.phone;
    const text = `Hi, your OTP is ${req.body.otp} and ${req.body.msg}`;

    nexmo.message.sendSms(from, to, text, (err, responseData) => {
        if (err) {
            console.log(err);
        } else {
            if (responseData.messages[0]['status'] === "0") {
                console.log("Message sent successfully.");
            } else {
                console.log(`Message failed with error: ${responseData.messages[0]['error-text']}`);
            }
        }
    });
    res.send('success');
})
app.listen(3000, () => { console.log("some things wrogn with 3000 ") })