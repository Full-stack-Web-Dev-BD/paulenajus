const chargeRouter=require('express').Router()
const chargerController=require('../controller/chargePointController')



chargeRouter.post('/addchargelocation',chargerController.createChargeLocation)
chargeRouter.get('/getalllocation',chargerController.getAllLocation)
chargeRouter.get('/getchargepoints/:id',chargerController.getchargepoints)
chargeRouter.get('/deletechargelocation/:id',chargerController.removeChargeLocation)
chargeRouter.post('/addchargepoint',chargerController.addChargePoint)
chargeRouter.post('/removechargepoint',chargerController.removeChargePoint)
chargeRouter.post('/findchargepoint',chargerController.findChargePoint)
chargeRouter.post('/findlocation',chargerController.findLocation)


module.exports=chargeRouter