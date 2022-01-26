const express = require('express');
const {corsOptions} = require('./config/env');
const router = require('./router/router');
const http = require('http');
const {mongo} = require('./config/env');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const server = http.createServer(app);
const mongoose = require('mongoose');
const port = process.env.PORT || 5000;
app.use(bodyParser.json());
app.use(cors(corsOptions));
app.use(router);


mongoose.connect(mongo.uri, {useNewUrlParser : true, useUnifiedTopology: true})
    .then(() => {
        server.listen(port, ()=>{
            console.log(`Server runnin on ${port}`);
        })
}).catch((err) => console.log(err));

