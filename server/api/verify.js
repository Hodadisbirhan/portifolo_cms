import { getForgetCode} from "~~/gql/query";
import {forgetCodeMutation} from "@/gql/mutation"
import bcrypt from "bcrypt";
import { customeFetch } from "./customFetch";
import {secureAction} from "./secureAuthenticate"
export default defineEventHandler (  async (event)=>{
   
    const {normal} =  secureAction({action_secret_key:event.req.headers.action_secret_key});
   
    if(normal){
    try{

const body = await useBody(event);
const code = body.input.value.verifyCode;
const email = body.input.value.email;

const fetchverifyCodeByEmail =await customeFetch(getForgetCode,{email:email});

if(fetchverifyCodeByEmail.data.users.length>0){

    let isEquals = bcrypt.compareSync(code,fetchverifyCodeByEmail.data.users[0].forgetCode);

    if(isEquals)
    {
        const fetch = await customeFetch(forgetCodeMutation,{email:email,code:null})
        return {email:email,status:'success'}
    }
    else{
        return {email:'',status:"Incorrect Code"}
    }


}
return {email:'',status:"please Try again"}

    }
    catch(e){

        return {email:'',status:'try again'};
    }
}
return event.res.end();

})