const mongo=require('../connect')

module.exports.getquestions=async(req,res)=>{
    try {
        const response=await mongo.selectedDb.collection('Questions').find({}).toArray()
        res.send(response)
    } catch (error) {
        console.log(error)
    }
}

module.exports.createquestion=async(req,res)=>{
    try {
        const response=await mongo.selectedDb.collection('Questions').insertOne({...req.body.question})
        res.send(response)
    } catch (error) {
        console.log(error)
    }
}

module.exports.postcomment=async(req,res)=>{
    try {
        const response=await mongo.selectedDb.collection('Questions').updateOne({title:req.body.title},{$set:{comments:req.body.comments}})
        res.send(response)
    } catch (error) {
        console.log(error)
    }
}

module.exports.vote=async(req,res)=>{
    try {
        const response=await mongo.selectedDb.collection('Questions').updateOne({title:req.body.title},{$set:{votes:req.body.vote}})
        res.send(response)
    } catch (error) {
        console.log(error)
    }
}

module.exports.view=async(req,res)=>{
    try {
        const response=await mongo.selectedDb.collection('Questions').updateOne({title:req.body.title},{$set:{views:req.body.view}})
        res.send(response)
    } catch (error) {
        console.log(error)
    }
}

module.exports.getcompanies=async(req,res)=>{
    try {
        const response=await mongo.selectedDb.collection('Companies').find({}).toArray()
        res.send(response)
    } catch (error) {
        console.log(error)
    }
}


