import {queryAdmin} from "@/gql/query"
import { customeFetch } from "./customFetch";
import {resetPassword} from "@/gql/mutation"
import bcrypt from "bcrypt";
import {secureAction} from "./secureAuthenticate"
export default defineEventHandler(async (event)=>{

    const {normal} =  secureAction({action_secret_key:event.req.headers.action_secret_key});
if(normal)
{
    const body= await useBody(event);
    const {email,oldPassword,newPassword} = body.input.value
    try{
    const fetchUserByEmail = await customeFetch(queryAdmin,{email})
    if(fetchUserByEmail.data&&fetchUserByEmail.data.users[0]&&fetchUserByEmail.data.users[0].password)
    {
       
       let hashedPassFromTable = fetchUserByEmail.data.users[0].password;
       let isEquals = bcrypt.compareSync(oldPassword,hashedPassFromTable);
       if(isEquals)
       {

let hashPass = bcrypt.hashSync(newPassword,Number(process.env.SALT));
const insertPassword  = await customeFetch(resetPassword,{email:email,password:hashPass});
return {status:"successfully Changed"};



       }
       else{
        return {status:"wrong old password"}
       }


    }
    return {status:"you are intruder"};

    }
    catch(e){
return {status:"please check the connection"};

    }
}
return event.res.end();
})