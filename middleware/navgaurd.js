export default defineNuxtRouteMiddleware((to,from)=>{
  const token = useCookie("accessToken")
  if(token.value){
    
  const info =ref({});
  const status = ref('')
  if(process.client){
 info.value = window.atob(token.value.split(".")[1])
const {role} =JSON.parse(info.value);
status.value = role;
  }

if((to.name ==="Admin_dashboard-setting"||to.name ==="Admin_dashboard-changePassword")&&status.value ==="Guest")
{
  token.value=null;
return navigateTo('/');
}
 else if(status)
    {
    
       if(status.value==="Admin")
           {
               return true;
               }

               }
  else{
        return navigateTo('/');

       }
                        }


           else if(to.name ==="index-verify"){
   
                          if(from.name ==="index-forgetPassword")
                            {
               
                            return true
                             }
                           
                             else 
                               return navigateTo('/');
           
        
                                     }

                                     else if(to.name ==="index-ResetPassword")
                                     { 
                                       if(from.name ==="index-verify")
                                         {
                           
                                          return true;
                                            } 
                                       else
                                          return  navigateTo('/');
                               
                           
                                     }
                                     else
                                     return  navigateTo('/');

})