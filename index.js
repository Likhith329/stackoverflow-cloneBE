const cors=require('cors')
var logger = require('morgan');
const express=require('express')
const jwt=require('jsonwebtoken')
const mongo=require('./connect')
const Registerrouter=require('./Router/Registerrouter')
const Questionsrouter=require('./Router/Questionsrouter')
const Authmodule=require('./Modules/Authmodule')
const dotenv=require('dotenv')
const nodemailer=require('nodemailer')

dotenv.config()

const app=express()

//buit-in middleware
app.use(express.json())

//cross origin resource sharing(cors)
app.use(cors())

app.use(logger('dev'));

//mongodb connection
mongo.connect()

app.use('/users',Registerrouter)


//email function
function sendEmail(email,link){
    return new Promise((resolve,reject)=>{
        //transporter is the object which is used to send emails
        const transporter=nodemailer.createTransport({
            service:'gmail',
            auth:{
                user:'emypersonalemail@gmail.com',
                pass:process.env.PASS
            }
        })
         //mail configurations
        const mail_configs={
            from:'emypersonalemail@gmail.com',
            to:email,
            subject:'Reset-password',
            text:`To reset your password ,click on the link ${link}`
        }
        //sending the mail
        transporter.sendMail(mail_configs,(error)=>{
            if(error) {
                console.log(error)
                reject({message:"error occured"})}
            return  resolve({message:"email sent successfully!"})
        })
    })
}

//secret key or privatekey
const privatekey=process.env.PRIVATE_KEY
// creation of token and sending the token through email
app.post('/forgotpassword',async(req,res)=>{

    //token creation 
    const token=jwt.sign(req.body.user,privatekey,{expiresIn:'120s'})
     //updating the token to database
     await mongo.selectedDb.collection('Users').updateOne({email:req.body.user.email},{$set:{token:token}})
    //creating and sending the link through email
    const link=`https://stackoverflow-clonefe.netlify.app/resetpassword/${req.body.user.email}/${token}`
    sendEmail(req.body.user.email,link).then(resp=> res.send(resp)).catch(error=>res.send(error))
 
})

app.post('/resetpassword',async(req,res)=>{
   
    //validate token
    try {
        const validuser=jwt.verify(req.body.user.token,privatekey)
        res.send('token validated')
        console.log('token validated')
    } catch (error) {
        console.log(error)
        res.status(400).send('token expired!!')
    }
})

app.use('/',Authmodule.authenticate)
app.use('/questions',Questionsrouter)
app.use('/companies',Questionsrouter)

//listening to server
app.listen(process.env.PORT)



