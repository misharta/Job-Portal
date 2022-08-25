const express=require('express');
const router =express.Router();
router.use(express.urlencoded({ extended: true }));
const UserController = require('../controllers/userController');

console.log('router started');
router.get('/sign-up',UserController.userSignUp);
router.get('/sign-in',UserController.userLogin);
router.post('/create',UserController.createUser);
router.post('/webhook',UserController.webhook);



module.exports = router;
