const varify = async (req,res) => {
    const email = req.user.email
    const role = req.user.role
    
    res.status(200).send({email,role})  

}

const getAccessLevel = async (req,res) => {

}

module.exports = {
    varify,
    getAccessLevel
}