import  bcrypt from  "bcrypt";
import crypto from "crypto";
import {inviteUserMutation} from "@/gql/mutation";
 import {queryForFetchInvite}  from "@/gql/query";
import { customeFetch } from "./customFetch";
import { emailSend } from "./emailSend";
import {secureAction} from "./secureAuthenticate"
export default defineEventHandler(async(event)=>{
  const {normal} =  secureAction({action_secret_key:event.req.headers.action_secret_key});
if(normal){
const body = await useBody(event);

if(body.input.value.email)
{
  
const invitedCode =  crypto.randomBytes(3).toString('hex');
const hiddenCode =bcrypt.hashSync(invitedCode,Number(process.env.SALT));
try{
 
  const data = await emailSend({email:body.input.value.email,subject:"Hodadis CMS Invitation",value:"link: http://localhost:3000/InviteLogin  \n Invitation Code:"+invitedCode});
if(data.status ==="success"){
 const checkForInvited = await customeFetch(queryForFetchInvite,{email:body.input.value.email})

if(checkForInvited.data.invite_users.length<1){
 
 const InsertInvited = await customeFetch(inviteUserMutation,{email:body.input.value.email,invite_code:hiddenCode,name:body.input.value.name,user_id:body.input.value.user_id})

 if(InsertInvited.data.insert_invite_users.affected_rows)
 {

  return {message:'Invited',isInvited:true}

 }

 return {message:"Please Try Again",isInvited:false};



}
return {message:"Already Invited",isInvited:false};
}
else
return {message:"unable to send try again",isInvited:false}
}
catch(e){
 
  return {message:"Some Error Try Again",isInvited:false};
}

}
}
return event.res.end();

})