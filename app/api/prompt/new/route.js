import { connectToDB } from "@utils/database"
import { PromptData } from "@models/prompt"

export async function POST(request){
    const {userId , prompt, tag} = await request.json()
    try{ 
        await connectToDB()
        const newPrompt = new PromptData({
            creator:userId,
            prompt,
            tag
        })

        await newPrompt.save();


        return new Response(JSON.stringify(newPrompt),{
            status:202
        })
    }catch(error){
        return new Response("there was an  while trying to create prompts",{
            status:500
        })
    }

}