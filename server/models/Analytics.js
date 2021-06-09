// user_id,appliance_id,update_date_time,state_changed_to
const mongoose = require('mongoose');

const analyticsSchema = new mongoose.Schema({
    user_id: {
        type: String,
        required: true,
        unique: true
    },
    appliance_id: {
        type: String,
        required: true,
        unique: true
    },
    update_date_time: {
        type: Date,
        required: true,
        default: Date.now
    },
    state_changed_to: {
        type: Boolean,
        default: false
    },
    current_rating_array: {
        type: Array,
        // validate: [limit_60,"max 60 elements"]
    }
    
    

})

const limit_60 = (array)=>{
    return array.length <= 60
}
// post('/store_currentr_rating/:id',(req,res)=>{
//     if(current_rating_array.length == 60){
//         // fetch the current_rating array

//     }
// })
// [1,2,3,4,5,6]
// [2,3,4,5,6,7]
// max:60 [1,1.2,3,0.6........]
// 12 nov : 60
// 13 nov : 100
// no_of_users

module.exports = mongoose.model('Analytics',analyticsSchema);