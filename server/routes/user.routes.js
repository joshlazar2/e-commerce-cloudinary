const UserController = require('../controllers/user.controller')
const { authenticate } = require('../config/jwt.config');


module.exports = app => {
    app.post('/api/register', UserController.registerUser)
    app.post('/api/login', UserController.loginUser)
    app.post('/api/logout', authenticate, UserController.logoutUser)
    app.get('/api/findUserInfo', UserController.findUserInfo)
}