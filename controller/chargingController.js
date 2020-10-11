const { update } = require('../model/ChargingModel');
const chargingModel = require('../model/ChargingModel')


module.exports = {
    startCharge(req, res) {
        console.log(req.body)
        new chargingModel(req.body)
            .save()
            .then(saved => {
                return res.status(200).json({ status: true, info: saved, message: 'Charging started ' })
            })
            .catch(err => {
                console.log(err)
                return res.status(500).json({ sttus: false, message: "Server error occurd " })
            })
    },
    findchargingstate(req, res) {
        let id = req.params.id
        chargingModel.findOne({ _id: id })
            .then(chargingState => {
                return res.status(200).json({ status: true, chargingState: chargingState })
            })
            .catch(err => {
                console.log(err)
                return res.status(500).json({ message: "Server error" })
            })
    }
}