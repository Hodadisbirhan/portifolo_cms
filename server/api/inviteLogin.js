import bcrypt from "bcrypt";
import {queryInviterWithEmail}  from "@/gql/query"
import { customeFetch } from "./customFetch";
import jwt from "jsonwebtoken";
import {secureAction} from "./secureAuthenticate"
export default defineEventHandler(async (event) => {
  const {normal} =  secureAction({action_secret_key:event.req.headers.action_secret_key});
if(normal){

  const body = await useBody(event);
  const {email,code} = body.input.value;
  const accessToken = jwt.sign({"https://hasura.io/jwt/claims": {
    "x-hasura-allowed-roles": ["guest"],
    "x-hasura-default-role": "guest",
 
  },email,role:"Guest"},process.env.ACCESS_GENERATE_KEY);
 
  if (email) {
    try{
     
const result = await customeFetch(queryInviterWithEmail,{email:email});

   if(result.data.invite_users&&result.data.invite_users.length>0)
   {
 const isEqual= bcrypt.compareSync(code,result.data.invite_users[0].invite_code);
 
 if(isEqual)
 {
    return {message:"",status:200,accessToken}
 }

}

 return {message:"Email or PassWord is not correct",status:200,accessToken:null}
}
catch(e){
    return {message:"some Error please try again",status:401,accessToken:null}
}


}
}
return event.res.end();




});
