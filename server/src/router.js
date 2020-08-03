const CarModel = require('../models/CarModel')

module.exports = (app) => {
    app.get('/getCars', async (req, res) => {
        let cars = await CarModel.find({}) || []
        res.status(200).send(cars)
    })
    app.post('/addFirstData', async (req, res) => {
        await CarModel.deleteMany()
        await req.body.forEach((car) => {
            CarModel.create({
                name: car.name,
                bodyTypes: car.bodyTypes,
                input1: car.input1,
                input2: car.input2
            })
        })
        console.log(await CarModel.find({}))
        res.status(200).send(await CarModel.find({}))
    })
    app.post('/updateCar', async (req, res) => {
        await CarModel.updateOne({
            name: req.body.name
        }, {
            $set: {
                bodyTypes: req.body.bodyTypes,
                input1: req.body.input1,
                input2: req.body.input2
            }
        })
        let cars = await CarModel.find({})
        res.status(200).send(cars)
    })


}