import { Schema, model, models } from "mongoose";

const investorSchema = new Schema({
    name: { type: String, required: true},
    role:{type: String, required:true},
    mobileNumber: {type: Number, required:true},
    linkedIn:{type:String, required: true}
})

const Investor = models.Investor || model("Investor", investorSchema)

export default Investor;