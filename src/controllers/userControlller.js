const User = require('../models/User');

const register = async (req, res) => { 
    console.log(req.body);
    const userData = req.body;
    const user = new User(req.body);


}

module.exports = {
    register
}