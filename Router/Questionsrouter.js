const express=require('express')
const router=express.Router()

const Questionsmodule=require('../Modules/Questionsmodule')
router.get('/get',Questionsmodule.getquestions)
router.post('/ask',Questionsmodule.createquestion)
router.put('/postcomment',Questionsmodule.postcomment)
router.put('/vote',Questionsmodule.vote)
router.put('/view',Questionsmodule.view)
router.get('/getcompanies',Questionsmodule.getcompanies)


module.exports=router;