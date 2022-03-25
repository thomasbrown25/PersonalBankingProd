const jwt = require('jsonwebtoken');
const config = require('config');
const User = require('../models/User')

module.exports = function (req, res, next) {

    User.findOne({ _id: req.user.id }).then((user) => {

        // Verify user and access token
        if (!user) 
            return res.status(500).json({ msg: "no user found for the request" });

        if (!user.accessToken)
            return res.status(500).json({ msg: "no access token for the user" });

        req.user = user;
        next();
    })
    .catch((e) => {
        // Handle error
        console.error('something wrong with check access middleware');
		return res.status(500).send({ error: e.message });
    })

};
