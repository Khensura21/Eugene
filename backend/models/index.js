const mongoose = require('mongoose');

mongoose.set('debug', true);

mongoose.connect('mongodb://localhost/eugene', {
    keepAlive: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.Promise = Promise;