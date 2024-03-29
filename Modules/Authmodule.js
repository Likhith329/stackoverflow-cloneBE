const jwt=require('jsonwebtoken')

module.exports.authenticate=async(req,res,next)=>{
    if(!req.headers['access-token']) return res.status(400).send({msg:"token not found"})
    try {
        const user=jwt.verify(req.headers['access-token'],process.env.PRIVATE_KEY)
        next()
    } catch (error) {
        console.log(error)
        res.status(400).send({msg:"Unauthorized"})
    }
}