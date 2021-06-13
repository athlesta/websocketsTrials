const router = require('express').Router();
const verify_token = require('../verify_token/verify_jwt_token');
const verifyJWT = require('../verify_token/verify_jwt_token');

// Models
const Appliance = require('../models/Appliance');
const User = require('../models/User');

// URL = user/get_appliances
router.post('/get_appliances',async (req,res)=>{
    var token = verifyJWT.getTokenFromReq(req);
    var user_id = verifyJWT.getUserFromToken(token);
    try {
        var appliances = await Appliance.find({
            "owner_id": user_id
        })
        res.status(200).json(appliances);

    } catch (error) {
        res.status(500).json(error);
    }
    
    
});

// URL = user/set_appliance
router.post('/set_appliance',async (req,res)=>{
    var token = verifyJWT.getTokenFromReq(req);
    var user_id = verifyJWT.getUserFromToken(token);

    var new_appliance = new Appliance({
        "appliance_name": req.body.appliance_name,
        "owner_id": user_id,
        "appliance_type": req.body.appliance_type
    })

    try {
        var saved_appliance = await new_appliance.save();
        return res.status(200).json(saved_appliance);

    } 
    catch (error) {
        return res.status(500).json(error);
    }
    
    
});

module.exports = router;
