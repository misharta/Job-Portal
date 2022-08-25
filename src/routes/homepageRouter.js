const express=require('express');
const router =express.Router();
router.use(express.urlencoded({ extended: true }));
const homepageController = require('../controllers/homepageController');

console.log('router started');
router.get('/',homepageController.home);

 

// router.use('/company',require('./company'))



router.use('/users',require('./userRouter'));


// router.use('/postjob',require('./postjob'));

// router.use('/posts',require('./posts'));

// router.use('/comments',require('./comments'));
// //for any further routes,access from here
// //router.use('/routerName',require('./routerFile));
// router.use('/editor',require('./editor'));
module.exports = router;
