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
    application_time: {
        type: Date,
        default: Date.now
    },
    availability: {
        type: [Number],
        required: [true, 'Please add avaliability'],
    },
    occupied_availability: [Number]
});


// Create Listener slug from the name
ListenerSchema.pre('save', function (next) {
    console.log('Slugify ran', this.name);
    this.slug = slugify(this.name, { lower: true });
    next();
})

// Create Listener time_slot from the availability
// ListenerSchema.pre('save', function (next) {
    // console.log('Time_slot converter ran', this.name);
    // this.time_slot = [];
    // const time_dict = [
    //     "周一 9:00-10:00am", "周一 10:00-11:00am", "周一 8:00-9:00pm", "周一 9:00-10:00pm", "周一 10:00-11:00pm",
    //     "周二 9:00-10:00am", "周二 10:00-11:00am", "周二 8:00-9:00pm", "周二 9:00-10:00pm", "周二 10:00-11:00pm",
    //     "周三 9:00-10:00am", "周三 10:00-11:00am", "周三 8:00-9:00pm", "周三 9:00-10:00pm", "周三 10:00-11:00pm",
    //     "周四 9:00-10:00am", "周四 10:00-11:00am", "周四 8:00-9:00pm", "周四 9:00-10:00pm", "周四 10:00-11:00pm",
    //     "周五 9:00-10:00am", "周五 10:00-11:00am", "周五 8:00-9:00pm", "周五 9:00-10:00pm", "周五 10:00-11:00pm",
    //     "周六 9:00-10:00am", "周六 10:00-11:00am", "周六 8:00-9:00pm", "周六 9:00-10:00pm", "周六 10:00-11:00pm",
    //     "周日 9:00-10:00am", "周日 10:00-11:00am", "周日 8:00-9:00pm", "周日 9:00-10:00pm", "周日 10:00-11:00pm"
    // ];
    // this.availability.map(
    //     slot_idx => {
    //         this.time_slot.push(time_dict[slot_idx]);
    //     }
    // );
//     next();
// })

module.exports = mongoose.model('Listener', ListenerSchema)