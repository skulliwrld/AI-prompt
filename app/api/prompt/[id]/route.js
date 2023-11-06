import { connectToDB } from "@utils/database";
import { PromptData } from "@models/prompt";

// GET(read)
export async function GET(request, {params}){
    try {
        await connectToDB();

        const prompt = await PromptData.findById(params.id).populate('creator')
        if(!prompt){
            return new Response("Prompt not found",{status:500})
        }

        return new Response(JSON.stringify(prompt),{status:200})

    } catch (error) {
        return new Response("there was an issues when trying to get data from DB",{status:500})        
    }
}


//PATCH(update)
export async function PATCH(request, {params}){
    const {prompt ,tag} = await request.json()
    try {
        await connectToDB();

        const existingPrompt = await PromptData.findById(params.id)

        if(!existingPrompt){
            return new Response("Prompt not found")
        }
        existingPrompt.prompt = prompt;
        existingPrompt.tag = tag

        await existingPrompt.save()
    
        return new Response(JSON.stringify(existingPrompt), {status:200})
    } catch (error) {
        return new Response('failed to be update prompt',error, {status:500})
    }
}

// deleting post (DELETE)
export const DELETE = async (request, { params }) => {
    try {
        await connectToDB();

        // Find the prompt by ID and remove it
        await PromptData.findByIdAndRemove(params.id);

        return new Response("Prompt deleted successfully", { status: 200 });
    } catch (error) {
        return new Response("Error deleting prompt", { status: 500 });
    }
};