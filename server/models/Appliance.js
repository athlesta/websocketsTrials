// appliance_name,owner_id,state
const mongoose = require('mongoose');

const applianceSchema = new mongoose.Schema({
    appliance_name: {
        type: String,
        required: true,
    },
    owner_id: {
        type: String,
        required: true,
    },
    appliance_state: {
        type: Boolean,
        requires: true,
        default: false
    }
    
    

})


module.exports = mongoose.model('Appliance',applianceSchema);