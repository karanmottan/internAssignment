const {Router} = require('express');
const userController = require('../controllers/userController');
const mealController = require('../controllers/mealController');
const router = new Router();
const {authenticate}  = require('../middleware/middleware');

router.get('/', (req,res) => res.send('ok'));

router.post('/login', userController.login);

router.post('/register', userController.register);

router.get('/getmeals', authenticate ,mealController.getMeals);

router.post('/addmeal', authenticate, mealController.addMeal);

router.post('/createday', authenticate, mealController.createDay);

router.post('/deletemeal', authenticate, mealController.deleteMeal);

router.post('/deleteday', authenticate, mealController.deleteDay);

module.exports = router;