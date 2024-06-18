const DocumentSettings = require('../models/documentSettingsModel')



const addDocumentSettings = async(req,res) => {
    try {
        const data = req.body
        const result = await DocumentSettings.create(data)
        const newSettings = await DocumentSettings.findOne({_id : result._id}).populate("owner")
        res.status(200).send(newSettings)
    } catch (error) {
        console.log(error)
        res.status(500).send({error})
    }
  }

const updateDocumentSettings = async(req,res) => {
    try {
        const {_id,...rest} = req.body
        await DocumentSettings.updateOne({_id}, rest)
        const updatedSettings = await DocumentSettings.findOne({_id}).populate("owner")
        res.status(200).send(updatedSettings)
        
    } catch (error) {
        console.log(error)
        res.status(500).send({error})
    }
}

const getOwnerDocumentSettings = async(req,res) => {
    try {
        const owner = req.query.ownerId
        const documentSettings = await DocumentSettings.find({owner}).populate("owner")
        res.status(200).send(documentSettings)
    } catch (error) {
        console.log(error)
        res.status(500).send({error})
    }
}

const deleteDocumentSettings = async(req,res) => {
    try {
        const _id = req.query.id
        await DocumentSettings.deleteOne({_id})
        res.status(200).json()
    } catch (error) {
        res.status(500).send(error)
    }
}

// export

module.exports = {
    addDocumentSettings,
    updateDocumentSettings,
    getOwnerDocumentSettings,
    deleteDocumentSettings
}