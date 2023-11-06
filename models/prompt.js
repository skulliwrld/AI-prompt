import { Schema, model, models } from 'mongoose';

const PromptSchema = new Schema({
      creator:{
        type:Schema.Types.ObjectId,
        ref:"User",
    },

    prompt:{
        type: String,
        required:[true, " insert prompt ... "]
    },

    tag:{
        type: String,
        required:[true, " insert tag ... "]
    },

  
})

export  const PromptData = models.PromptData || model("PromptData",PromptSchema)