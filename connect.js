const {MongoClient}=require('mongodb')

module.exports={
    selectedDb:{},
     connect(){
        try {
                 MongoClient.connect(process.env.MONGO_URL,(error,client)=>{
                if(error)return console.log(error)
                this.selectedDb=client.db('Stackoverflow')
            })
            
        } catch (error) {
            console.log(error)
        }
    }
}
