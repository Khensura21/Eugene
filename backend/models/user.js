const mongoose = require('mongoose');
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: { 
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    portfolio: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Portfolio"
    },
    wallet: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Wallet"
    }
})
//let's run a prehook right before we run this function
// this hook hashes user password
userSchema.pre("save", async function(next) {
    try {
        if (this.isModified("password")) {
            return next();
        }
        let hashedPassword = await bcrypt.hash(this.password, 10);
        this.password = hashedPassword;
        console.log(userSchema);
        return next(); 
    } catch (err) {
        return next(err); // goes to custom err handler we defined
    }
});

// password comparison function
userSchema.method.comparePassword = async function(candidatePassword, next) {
    try {
        let isMatch = await bcrypt.compare(candidatePassword, this.password)
        return isMatch;
    } catch (err) {
        return next(err);
    }
};

const User = mongoose.model('User', userSchema);

module.exports = User;