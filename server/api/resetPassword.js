import bcrypt from "bcrypt";
import {resetPassword} from "@/gql/mutation"
import { customeFetch } from "./customFetch";
import {secureAction} from "./secureAuthenticate"
export default defineEventHandler( async (event)=>{
const body = await useBody(event);


const {normal} =  secureAction({action_secret_key:event.req.headers.action_secret_key});
if(normal){
    const  {email,password} = body.input.value;
if(password&&email)
{

try{
const hashedPassword = bcrypt.hashSync(password,Number(process.env.SALT));
 const insertPassword  = await customeFetch(resetPassword,{email:email,password:hashedPassword});

return {email:email,status:'success'}

}
catch(e){

return {email:email,status:'please try again'}
}



}

return {email:email,status:'please try again'}
}
return event.res.end();

}
) 