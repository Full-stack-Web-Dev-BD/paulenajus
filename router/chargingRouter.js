const chargingRouter=require('express').Router()
const chargingController=require('../controller/chargingController')



chargingRouter.post('/startcharge',chargingController.startCharge)
chargingRouter.get('/findchargingstate/:id',chargingController.findchargingstate)
chargingRouter.get('/chistory/:id',chargingController.findchargingHistory)
chargingRouter.get('/togglePayment/:id',chargingController.togglePayment)
chargingRouter.get('/chistoryall',chargingController.findchargingHistoryall)

module.exports=chargingRouter