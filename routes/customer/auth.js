const express = require('express');

const authControllers = require('../../controllers/auth-controller');


const router = express.Router();

router.get('/sign-up',authControllers.signUpForm);

router.get('/login',authControllers.loginForm);

router.post('/sign-up',authControllers.newUserSignUp);


router.post('/login',authControllers.postLogin);

router.post('/logout',authControllers.logout);

module.exports = router;