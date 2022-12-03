const express=require('express')
const router=express.Router()

const Registermodule=require('../Modules/Registermodule')
router.get('/get',Registermodule.getuser)
router.post('/create',Registermodule.createuser)
router.post('/login',Registermodule.loginuser)
router.put('/update',Registermodule.udpateuser)
router.put('/picupdate',Registermodule.udpatepic)
router.put('/editprofile',Registermodule.editprofile)

module.exports=router;