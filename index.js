const express = require('express');
const webPush = require('web-push');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

// Set static path
app.use(express.static(path.join(__dirname, 'client')));

app.use(bodyParser.json());

// Similar to JWTs. These identify who is sending the push notification.
const publicVapidKey = 'BFd4oy3MDzZZ11ejui9XCMaew729b0DvumPYRtJHUmgG_Ws0zEy-P_uGQNoKDXBG30AgWV3wH-RvLeGMVtbmpxA';
const privateVapidKey = 'htqSxMKMm47PeEfod8WrzS5Ao5XI-NuwcPPslX5Y7CM';

webPush.setVapidDetails('mailto:lm19znsklm@gmail.com', publicVapidKey, privateVapidKey);

app.post('/subscribe', (req, res) => {
    // Get pushSubscription object
    const subscription = req.body;

    // Send 201 - resource created status
    res.status(201).json({});

    // Create payload
    const payload = JSON.stringify({ title: 'Push Test' });

    // Pass object into sendNotification
    webPush.sendNotification(subscription, payload).catch(err => console.err(err));
});

const port = 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));