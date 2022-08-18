import imgbbuploader from "imgbb-uploader";
import {secureAction} from "./secureAuthenticate"
export default defineEventHandler( async (event)=>{
    const {normal} =  secureAction({action_secret_key:event.req.headers.action_secret_key});
if(normal)
{

    const body = await useBody(event);
const name = body.input.value.name;
const image = body.input.value.base64;


try{
const base64Resolver = ()=>{

   return new Promise((resolve,reject)=>{

return setTimeout(()=>{
resolve(image)

},

1000)

    })
}
    return await imgbbuploader({
apiKey:process.env.API_KEY,
base64string: await base64Resolver(),
name:name,timeout:3000

    }).then((result)=>{
     return {   url:result.url,
        error:null
     }
    }).catch((e)=>{

        return {
            url:'',
            error:"Some Error in Image Upload"
        }
    })



}
catch(e){

return {url:'',error:"Some thing wrong happend"}
}
}
return event.res.end();

})