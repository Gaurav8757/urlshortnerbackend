import mongoose from "mongoose";
const urlSchema = new mongoose.Schema({
  original_url: { 
    type: String, 
    required: true 
},
  short_url: { 
    type: String, 
    required: true, 
    unique: true 
},
});
const URL = mongoose.model('URL', urlSchema);

export default URL;