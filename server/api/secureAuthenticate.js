export const secureAction=(key)=>{

const {action_secret_key} = key;
if(action_secret_key === process.env.ACTION_SECRET_KEY)
{

return {normal:true}

}
else 
return {normal:false};


}