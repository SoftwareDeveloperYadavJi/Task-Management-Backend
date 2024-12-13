const express = require('express');
const {
    createTask, getTasks, updateTask, deleteTask, getDashboardStats
} = require('../controllers/taskController');
const { protect } = require('../middlewares/authMiddleware');
const router = express.Router();

router.use(protect);
router.post('/', createTask);
router.get('/', getTasks);
router.put('/:id', updateTask);
router.delete('/:id', deleteTask);
router.get('/dashboard', getDashboardStats);

module.exports = router;