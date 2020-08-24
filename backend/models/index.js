const mongoose = require('mongoose');

mongoose.set('debug', true);

mongoose.connect(
    process.env.MONGODB_URI || "mongodb://localhost/eugene", {
        keepAlive: true,
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

mongoose.Promise = Promise;