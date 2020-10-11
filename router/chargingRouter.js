const chargingRouter=require('express').Router()
const chargingController=require('../controller/chargingController')



chargingRouter.post('/startcharge',chargingController.startCharge)
chargingRouter.get('/findchargingstate/:id',chargingController.findchargingstate)


module.exports=chargingRouter