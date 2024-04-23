const varify = async (req,res) => {
    const user_name = req.user.user_name
    const role = req.user.role
    
    res.status(200).send({user_name,role})  

}

const getAccessLevel = async (req,res) => {

}

module.exports = {
    varify,
    getAccessLevel
}