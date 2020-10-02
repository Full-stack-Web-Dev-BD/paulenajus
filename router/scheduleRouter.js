const scheduleRouter=require('express').Router()
const scheduleController=require('../controller/scheduleController')



scheduleRouter.post('/create',scheduleController.createSchedule)
scheduleRouter.post('/edit/:id',scheduleController.editSchedule)
scheduleRouter.get('/delete/:id',scheduleController.deleteSchedule)
scheduleRouter.get('/get-single/:id',scheduleController.getSingleSchedule)
scheduleRouter.get('/get-all',scheduleController.getAllSchedule)

module.exports=scheduleRouter