export const customeFetch =async (query,variables)=>{
    try{
  const data =   await $fetch(process.env.API_ENDPOINT,{method:"POST",headers:{'x-hasura-admin-secret': process.env.X_HASURA_ADMIN_SECRET,'content-type':'application/json'},body:{query
        ,variables}
       });

    return  data
    
}
catch(e){

    return {status:'Error'};
}
}