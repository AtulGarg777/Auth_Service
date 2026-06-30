const router = require('express').Router();
const { signup,login } = require('../controllers/Signup');
const { signupValidation } = require('../Middlewares/signupValidation');
const loginValidation=require('../Middlewares/loginValidation')

router.post('/login', loginValidation, login)

router.post('/signup', signupValidation, signup);

module.exports=router;