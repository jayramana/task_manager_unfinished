const express = require('express')
const router = express.Router()
const {getTasks,getOneTasks,createTasks,updateTasks,deleteTasks} = require('../controller/tasks')


router.route('/').get(getTasks).post(createTasks)
router.route('/:id').get(getOneTasks).patch(updateTasks).delete(deleteTasks)


module.exports = router;