const User = require("../models/userModel");
const { encode } = require("../utils/cypher");
const { verifyJwt } = require("../utils/varifyJWT");

const userAuthViaToken = async (req, res, next) => {

  // ----------------------------------------------------------------

  // --------------------------------------------------
    const accessToken = req.query.accessToken;

    if (!accessToken) {
        return res.status(401).send({message : "Forbidden Access"});
    }

  try {
    const user = await verifyJwt(accessToken)
    // console.log(user)
    if (!user) {
      res.status(403).send({message : "Unauthorized Access"});
        
    } 
    req.user = user
    next()
    
  } catch (error) {
    console.log(error)
    res.status(201).send({message : "Forbidden Access"});
  }
};

module.exports = {
  userAuthViaToken,
};