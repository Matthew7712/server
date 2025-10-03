import express from 'express'
import SoftwareController from '../controllers/SoftwareController'

const softwareRoute = express.Router()

softwareRoute.use(express.json())

softwareRoute.get('/', async (req: express.Request, res: express.Response) => {
    const software = await SoftwareController.getAllSoftware(req, res)
    res.json(software)
})

softwareRoute.get('/id/:id', (req: express.Request, res: express.Response) => {
    const id = req.params.id

    console.log(`Software id: ${id}`)
    res.send(`THIS IS SOFTWARE ${id}`)
})

softwareRoute.get('/name/:name', (req: express.Request, res: express.Response) => {
    const name = req.params.name

    console.log(`Software name: ${name}`)
    res.send(`THIS IS SOFTWARE NAME ${name}`)
})

export default softwareRoute;