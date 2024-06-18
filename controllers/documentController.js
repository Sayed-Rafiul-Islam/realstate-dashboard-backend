const Document = require('../models/documentModel')
const DocumentSettings = require('../models/documentSettingsModel')
const Maintainer = require('../models/maintainerModel')
const Tenant = require('../models/tenantModel')

const addTenantDocument = async(req,res) => {
    try {
        const body = req.body
        const {title} = await DocumentSettings.findOne({_id : body.type})
        const tenant = await Tenant.findOne({_id : body.tenant}).populate(["property","unit"])
        const data = {...body,typeName : title,propertyName : tenant.property.name, unitName : tenant.unit.name}
        const result = await Document.create(data)
        const newDocument = await Document.findOne({_id : result._id}).populate(["owner","tenant","type","maintainer"])
        res.status(200).send(newDocument)
    } catch (error) {
        console.log(error)
        res.status(500).send({error})
    }
}

const addMaintainerDocument = async(req,res) => {
    try {
        const body = req.body
        const {title} = await DocumentSettings.findOne({_id : body.type})
        const maintainer = await Maintainer.findOne({_id : body.maintainer}).populate(["property","unit"])
        const data = {...body,typeName : title,propertyName : maintainer.property.name, unitName : maintainer.unit.name}
        const result = await Document.create(data)
        const newDocument = await Document.findOne({_id : result._id}).populate(["owner","tenant","type","maintainer"])
        res.status(200).send(newDocument)
    } catch (error) {
        console.log(error)
        res.status(500).send({error})
    }
}

const updateDocument = async(req,res) => {
    try {
        const {_id,...rest} = req.body
        await Document.updateOne({_id},rest)
        const updatedDocument = await Document.findOne({_id}).populate(["owner","tenant","type","maintainer"])
        res.status(200).send(updatedDocument)
        
    } catch (error) {
        console.log(error)
        res.status(500).send({error})
    }
}

const updateOwnerDocument = async(req,res) => {
    try {
        const {_id,status} = req.body
        await Document.updateOne({_id}, {status})
        const updatedDocument = await Document.findOne({_id}).populate(["owner","tenant","type","maintainer"])
        res.status(200).send(updatedDocument)
        
    } catch (error) {
        console.log(error)
        res.status(500).send({error})
    }
}

const getOwnerDocument = async(req,res) => {
    try {
        const owner = req.query.ownerId
        const results = await Document.find({owner}).populate(["owner","tenant","type","maintainer"])
        const documents = results.filter((result) => result.status !== "Declined")
        res.status(200).send(documents)
    } catch (error) {
        console.log(error)
        res.status(500).send({error})
    }
}

const getTenantDocument = async(req,res) => {
    try {
        const tenant = req.query.tenantId
        const documents = await Document.find({tenant}).populate(["owner","tenant","type","maintainer"])
        res.status(200).send(documents)
    } catch (error) {
        console.log(error)
        res.status(500).send({error})
    }
}

const deleteDocument = async(req,res) => {
    try {
        const _id = req.query.id
        await Document.deleteOne({_id})
        res.status(200).json()
    } catch (error) {
        res.status(500).send(error)
    }
}

// export

module.exports = {
    addTenantDocument,
    addMaintainerDocument,
    updateDocument,
    getOwnerDocument,
    getTenantDocument,
    deleteDocument,
    updateOwnerDocument
}