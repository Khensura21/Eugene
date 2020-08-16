const mongoose = require('mongoose');

mongoose.set('debug', true);

mongoose.connect(
    process.env.MONGODB_URI, {
        keepAlive: true,
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

mongoose.Promise = Promise;