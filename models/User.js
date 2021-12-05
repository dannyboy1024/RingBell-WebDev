const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a name'],
        trim: true,
        maxlength: [50, 'Name can not be more than 50 characters']
    },
    email: {
        type: String,
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            'Please add a valid email'
        ],
        required: [true, 'Please add a email'],
        unique: true,
    },
    password: {
        type: String,
        requird: [true, 'Please add a password'],
        min: [6, 'Password can not be less than 6 characters'],
        max: [50, 'Password can not be more than 50 characters']
    },
    token: {
        type: String
    },
    info: {
        type: JSON,
        required: true
    }
}, {timestamps: {createdAt: 'created', updatedAt: 'updated'}});

// Protect User password by md5
UserSchema.pre('save', function (next) {
    var user = this;
    if (this.isModified('password') || this.isNew) {
        bcrypt.genSalt(10, function (err, salt) {
            if (err) {
                return next(err);
            }
            bcrypt.hash(user.password, salt, function (err, hash) {
                if (err) {
                    return next(err);
                }
                user.password = hash;
                next();
            });
        });
    } else {
        return next();
    }
});

// Initialize user token
UserSchema.pre('save', function (next) {
    var user = this;
    if (this.token=="" || this.isNew) {
        bcrypt.genSalt(10, function (err, salt) {
            if (err) {
                return next(err);
            }
            bcrypt.hash(user.name + user.password + user.updatedAt, salt, function (err, hash) {
                if (err) {
                    return next(err);
                }
                user.token = hash;
                next();
            });
        });
    } else {
        return next();
    }
});

// Verify user password
UserSchema.methods.comparePassword = function (passw, cb) {
    bcrypt.compare(passw, this.password, (err, isMatch) => {
        if (err) return cb(null, 0);
        if (isMatch) {
            this.token = "";
            this.save();
        }
        cb(null, isMatch);
    });
};

module.exports = mongoose.model('User', UserSchema);