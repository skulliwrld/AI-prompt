import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google"


import { connectToDB } from "@utils/database"
import User from "@models/user";

// console.log({
//     clientId:process.env.GOOGLE_ID,
//     clientSecret: process.env.GOOGLE_CLIENT_SECRET
// })

const handlers = NextAuth({
    providers:[
        GoogleProvider({
            clientId:process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        })
    ],

    callbacks:{
        async session({session}) {
            const sessionUser =  await User.findOne({
                email:session.user.email
            });
            session.user.id = sessionUser._id.toString();

            return session;
        },
    
        async signIn({profile}){
            try {
                await connectToDB();
                //a function to know if a user is logged in 
                const userExists = await User.findOne({
                    email:profile.email
                });
                // if the user is not logged in ,create a new user
                if(!userExists){
                    await User.create({
                        email:profile.email,
                        username:profile.name.replace(" ", "").toLowerCase(),
                        image:profile.picture
                    });
                }
    
                return true
    
            }catch(error){
                console.log(error)
                return false
            }
        }   
    }

    
})

export { handlers as GET, handlers as POST}