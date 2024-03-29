const User = require('../models/user.model');
const secret = process.env.SECRET_KEY;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// async/await is an alternstive to .then and .catch
module.exports = {
    registerUser: async (req, res) => {
        try{
            // Check if email entered in the form already exists in the database
            // PotentialUser will be the response/results from the query
            // Whenever we write a database query we will use await and set it up like below
            const potentialUser = await User.findOne({email: req.body.email})
            if(potentialUser){
                res.status(400).json({message: 'That email already exists, please login'})
            }else{
                // create user
                const newUser = await User.create(req.body);

                // Generates a usertoken storing what we pass in (id, email of newly created user) that we want to encode inside the web token. Encode sensitive information that is only decoded by env file secret key
                const userToken = jwt.sign({_id: newUser._id, email: newUser.email}, secret, {expiresIn:'2h'})
                
                // sending user data back to the client
                res.status(201).cookie('userToken', userToken, {
                    httpOnly: true,
                    maxAge: 2 * 60 * 60 * 1000, // 2 hours in milliseconds
                    secure: true, // Set to true if your site is served over HTTPS
                    sameSite: 'none' // Allows the cookie to be sent with cross-origin requests
                }).json({ _id: newUser._id, email: newUser.email });
            }
        }
        catch(err){
            res.status(400).json({error: err})
        }
    },

    loginUser: async (req, res) => {
        try{
            // check if the user already exists
            const user = await User.findOne({email: req.body.email})
            if(user){
                // check if the password entered matches the password in the DB for that email specifically the hash, compare function runs everything behind scene and returns a boolean to passwordsMatch
                const passwordsMatch = await bcrypt.compare(req.body.password, user.password)
                if(passwordsMatch){
                    // generate our userToken 
                    const userToken = jwt.sign({_id: user._id, email: user.email}, secret, {expiresIn:'2h'})
                    // log the user in
                    res.status(201).cookie('userToken', userToken, {
                        httpOnly: true,
                        maxAge: 2 * 60 * 60 * 1000, // 2 hours in milliseconds
                        secure: true, // Set to true if your site is served over HTTPS
                        sameSite: 'none' // Allows the cookie to be sent with cross-origin requests
                    }).json({ _id: user._id, email: user.email });
                }
                else{
                    // if email does exist but incorrect password
                    res.status(400).json({message: 'Invalid email/password'})
                }
            }
            // if the user doesnt exist, our message says email and password so hacker doesnt know which is right
            else{
                res.status(400).json({message: 'Invalid email/password'})
            }
        }
        catch(err){
            res.status(400).json({error: err})
        }
    },

    logoutUser: (req, res) => {
        res.clearCookie('userToken', {
            httpOnly: true,
            secure: true,
            sameSite: 'none'
        }).json({message: 'You have logged out'})
    },

    findUserInfo: async (req, res) => {
        try{
            const decodedJwt = jwt.decode(req.cookies.userToken, {complete:true})
            const user_id = decodedJwt.payload._id
            const user = await User.findOne({_id: user_id})
            res.status(200).json({_id: user._id, firstName: user.firstName, lastName: user.lastName, email: user.email, owner: user.owner})
        }
        catch(err){
            res.status(400).json({error: err})
        }
    }
}