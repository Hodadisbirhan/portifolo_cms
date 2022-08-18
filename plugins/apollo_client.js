import { defineNuxtPlugin } from "#app"
import { ApolloClient, InMemoryCache ,createHttpLink, ApolloLink,from} from "@apollo/client/core"
import { DefaultApolloClient } from "@vue/apollo-composable"
const default_auth_link = new ApolloLink((operation, forward) => { 
  const token = useCookie("accessToken"); 
 
  if (token.value) { 
  
    operation.setContext({ 
      headers: { 
        authorization: `Bearer ${token.value}`, 
      }, 
    }); 
  } 
  return forward(operation); 
});

export default defineNuxtPlugin((nuxtApp) => {

    const config = useRuntimeConfig()
    const httpLink = createHttpLink({ 
      uri:config.public.apiendpoint, 
    }); 
  



  const apolloClient = new ApolloClient({
    cache: new InMemoryCache({typePolicies:{
      Query: {
fields:{
  educations:{merge(existing,incoming){
    return incoming;
}},services:{merge(existing,incoming){
  return incoming;
}},
experiences:{merge(existing,incoming){
  return incoming;
}},
projects:{merge(existing,incoming){
  return incoming;
}},
skills:{merge(existing,incoming){
  return incoming;
}}
},
  },
    },
   } )
   ,
     link: from([default_auth_link, httpLink]),
   
  })
  nuxtApp.vueApp.provide(DefaultApolloClient, apolloClient)
})
