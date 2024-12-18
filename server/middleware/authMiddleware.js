const jwt = require('jsonwebtoken');

module.exports = function(req, res ,next){
    try {
        
        const token = req.headers.authorization.split(" ")[1];
        console.log(token+ "   token")
        const verifyToken = jwt.verify(token, "scaler_BMS");
        console.log(verifyToken)
        req.body.userID = verifyToken.userID
        //console.log(verifyToken);
        next();
    } catch (error) {
        res.status(401).send({success:false,message:"Token Invalid"});
    }
}