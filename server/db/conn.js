import mongoose from "mongoose";
const connect = async(db)=>{
    await mongoose.connect(db||"mongodb://127.0.0.1:27017/mern", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useCreateIndex: true,
    // useFindAndModify: false,
    })
    .then(() => console.log("Connection successfull"))
    .catch(err => console.log(err))
}
export default connect;