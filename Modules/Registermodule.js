const mongo=require('../connect')
const bcrypt=require("bcrypt")

module.exports.getuser=async(req,res)=>{
    try {
        const response=await mongo.selectedDb.collection('Users').find({}).toArray()
        res.send(response)
    } catch (error) {
        console.log(error)
    }
}

module.exports.createuser=async(req,res)=>{
    //const randomstring=await bcrypt.genSalt(10)
    //req.body.user.password=await bcrypt.hash(req.body.user.password,randomstring)
    req.body.user.confirmpassword=''
    try {
        const createdresponse=await mongo.selectedDb.collection('Users').insertOne({...req.body.user})
        res.send(createdresponse)
    } catch (error) {
        console.log(error)
    }
}

module.exports.loginuser=async(req,res)=>{

    const userexist=await mongo.selectedDb.collection('Users').findOne({email:req.body.user.email})
    const issamepass=await bcrypt.compare(req.body.user.password,userexist.password)
    if(!issamepass){return res.status(400).send("Incorrect password")}
    else{res.send('Password verified')}
}

module.exports.udpateuser=async(req,res)=>{
    const randomstring=await bcrypt.genSalt(10)
    req.body.user.password=await bcrypt.hash(req.body.user.password,randomstring)
    try {
        const resp=await mongo.selectedDb.collection('Users').updateOne({email:req.body.user.email},{$set:{password:req.body.user.password,token:'',confirmpassword:''}})
        res.send(resp)
    } catch (error) {
        console.log(error)
    }
}

module.exports.udpatepic=async(req,res)=>{
    try {
        const resp=await mongo.selectedDb.collection('Users').updateOne({email:req.body.email},{$set:{image:req.body.image}})
        res.send(resp)
    } catch (error) {
        console.log(error)
    }
}

module.exports.editprofile=async(req,res)=>{
    try {
        const resp=await mongo.selectedDb.collection('Users').updateOne({email:req.body.email},{$set:
            {
                firstname:req.body.firstname,
                lastname:req.body.lastname,
                image:req.body.image
            }
        })
        res.send(resp)
    } catch (error) {
        console.log(error)
    }
}
