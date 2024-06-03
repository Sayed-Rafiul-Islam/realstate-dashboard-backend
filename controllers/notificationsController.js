const Notification = require('../models/notificaionModel')


const getNotifications = async(req,res) => {
    try {
        const notifications = await Notification.find()
        res.status(200).send(notifications)
    } catch (error) {
        console.log(error)
        res.status(500).send({error})
    }
  }

// export

module.exports = {
    getNotifications
}