import { useMutation, useQuery } from "@vue/apollo-composable";
export const useCustomeQuery = (queryGql,variable,debounce,fetchPolicy)=>{
const {result,loading,error,fetchMore,refetch}  =  useQuery(queryGql,variable,{debounce,fetchPolicy:"no-cache"});

return {result,error,loading,fetchMore,refetch};
}