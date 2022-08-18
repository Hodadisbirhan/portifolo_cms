import {forgetCodeMutation} from "@/gql/mutation"
import {queryAdmin} from "@/gql/query"
import crypto from 'crypto';
import bcrypt from "bcrypt";
import { customeFetch } from "./customFetch";
import { emailSend } from "./emailSend";
import {secureAction} from "./secureAuthenticate"
export default defineEventHandler(async (event)=>{
  const {normal} =  secureAction({action_secret_key:event.req.headers.action_secret_key});
if(normal){
const body = await useBody(event);
const forgetCode =  crypto.randomBytes(2).toString('hex');
const hashedCode = bcrypt.hashSync(forgetCode,Number(process.env.SALT));

  try{
 
  const emailSends = await emailSend({email:body.input.value.email,subject:"HodadisBirhanPortifolio CMS  Password Reset Code",value:forgetCode});
  
if(emailSends.status ==="success")
{
const check = await customeFetch(queryAdmin,{email:body.input.value.email});


if(check.data.users.length>0)
{

 const checkForInvited = await customeFetch(forgetCodeMutation,{email:body.input.value.email,code:hashedCode})

setTimeout(async ()=>{

const fetch = await customeFetch(forgetCodeMutation,{email:body.input.value.email,code:null})

},190000);
return {status:'sent',email:body.input.value.email}

}
else
return {status:'email is not registed',email:''};
}
else 
 return {status:'unable to send Email please try again',email:''}
  
}
  catch(e){
  
    return {status:'some error please try again',email:''};
  }
}
return event.res.end();



})