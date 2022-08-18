<script setup>
import { useMutation } from "@vue/apollo-composable";
import { useForm } from "vee-validate";
import { gql } from "@apollo/client/core";
import { adminGqlMutation } from "@/gql/mutation";
const accessToken = useCookie("accessToken");
accessToken.value = null;
const router = useRouter();
const { handleSubmit, resetForm } = useForm();
const { mutate ,onDone:onCompletedOperation,onError:errorOnLogin} = useMutation(adminGqlMutation);
const someError = ref("");
const loading = ref(false);
const submit = handleSubmit((value) => {
  loading.value = true;
  mutate({ password: value.Password, email: value.Email })
   
});

onCompletedOperation((res)=>{
if (res.data.adminLogin.accessToken) {
        loading.value = false;
        
        accessToken.value = res.data.adminLogin.accessToken
        if(process.client){
   const adminInfo = window.atob(res.data.adminLogin.accessToken.split('.')[1]);
   const {email,role} = JSON.parse(adminInfo);  
   console.log(res.data.adminLogin);
    router.replace({name: "Admin_dashboard-index" });
}
       
      
      } else {
        console.log(res.data.adminLogin);
        loading.value = false;
        someError.value = res.data.adminLogin.message;
      }
})

errorOnLogin((error)=>{
console.log(error);
      someError.value = "Some Error  Please check connection";
      loading.value = false;
})
</script>
<template>
  <div
    class="md:rounded-r-md md:rounded-l-none rounded-md flex flex-col px-3 justify-center items-center gap-4 h-[25rem] py-2 w-full"
  >
    <h1 class="text-title text-center font-semibold text-2xl">ADMIN LOGIN</h1>
    <span class="text-xs text-red-900">{{ someError }}</span>
    <form @submit.prevent="submit" class="w-full flex gap-4 flex-col">
      <field-v-input-field
        name="Email"
        label="Email"
        id="email"
        type="email"
        rule="required|email"
        placeholder="hodadis@gmail.com"
      />
      <field-v-password-input-field
        name="Password"
        label="Password"
        id="password"
        rule="required"
        placeholder="Your Password"
      />
      <v-button-solid
        type="submit"
        class="h-10"
        :isLoading="loading"
        :disabled="loading"
        value="Login"
      />
    </form>
    <div class="flex w-full flex-row justify-between text-sm">
      <NuxtLink
        class="rounded-md border-[1px] border-primary px-3 py-1 text-xs hover:bg-primary hover:text-white"
        :to="{ name: 'index-InviteLogin' }"
      >
        Login as Invite</NuxtLink
      >
      <NuxtLink
        :to="{ name: 'index-forgetPassword' }"
        class="text-xs text-blue-700 hover:underline"
        >Forget Password
      </NuxtLink>
    </div>
  </div>
</template>
