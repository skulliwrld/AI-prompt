import { connectToDB } from "@utils/database";
import { PromptData } from "@models/prompt";


export async function GET(request, {params}){
    try {
        await connectToDB();

        const prompt = await PromptData.find({
            creator:params.id
        }).populate('creator')

        return new Response(JSON.stringify(prompt),{status:200})

    } catch (error) {
        return new Response("there was an issues when trying to get data from DB",{status:500})        
    }
}