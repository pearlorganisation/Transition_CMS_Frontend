import connectToDatabase from "../../database/index"
import Investor from "../models/investorModel";
export  async function createInvestor ({data}){
    try {
     await connectToDatabase()
     const data = {
        name:"Manish",
        role:"ADMIN",
        mobile
     }
    //   name: { type: String, required: true},
    // role:{type: String, required:true},
    // mobileNumber: {type: Number, required:true},
    // linkedIn:{type:String, required: true}
     const investor = await Investor.create({})
    } catch (error) {
        console.log(error)
        return error.message;
    }
}