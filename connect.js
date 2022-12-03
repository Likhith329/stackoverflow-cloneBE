const {MongoClient}=require('mongodb')

module.exports={
    selectedDb:{},
    async connect(){
        try {
            const client=await MongoClient.connect('mongodb+srv://likhithkumar:BySVeto8CV6UtFzb@cluster0.3xbqzjp.mongodb.net/?retryWrites=true&w=majority')
            this.selectedDb=client.db('Stackoverflow')
        } catch (error) {
            console.log(error)
        }
    }
}
