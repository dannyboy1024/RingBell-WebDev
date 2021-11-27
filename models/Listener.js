const mongoose = require('mongoose');
const slugify = require('slugify');

const ListenerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a name'],
        unique: true,
        trim: true,
        maxlength: [50, 'Name can not be more than 50 characters']
    },
    slug: String,
    email: {
        type: String,
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            'Please add a valid email'
        ]
    },
    university: {
        type: String,
        required: [true, 'Please add a university']
    },
    availability: [{
        day_in_week: {
            type: Number,
            min: [0, 'Day in week cannot < 0'],
            max: [6, 'Day in week cannot > 6']
        },
        hour: {
            type: Number,
            min: [0, 'Hour cannot < 0'],
            max: [23, 'Hour cannot > 23']
        }
    }],
    occupied_availability: [Date]
});


// Create Listener slug from the name
ListenerSchema.pre('save', function (next) {
    this.slug = slugify(this.name, { lower: true });
    next();
})

module.exports = mongoose.model('Listener', ListenerSchema)