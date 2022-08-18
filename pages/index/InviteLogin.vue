<script setup>
import { useMutation } from "@vue/apollo-composable";
import { gql } from "@apollo/client/core";
import { useForm } from "vee-validate";
import inviteLogin from "~/gql/mutation/authenticationRelatedMutation/inviteLogin.gql";
const accessToken =  useCookie("accessToken");
accessToken.value = null;
const { mutate,onDone:InviteLoginCompleted,onError:errorOnInviteLogin } = useMutation(inviteLogin);
const showMessage = ref("");
const loading = ref(false);
const router = useRouter();
const { handleSubmit, resetForm } = useForm();
const submit = handleSubmit((value) => {
  loading.value = true;
  mutate({ email: value.Email, code: value.code })
    
});

InviteLoginCompleted((res)=>{
if (res.data && res.data.inviteLogin) {
        if (res.data.inviteLogin.accessToken && process.client) {
          const info = window.atob(res.data.inviteLogin.accessToken.split('.')[1]);
          const {email,role} = JSON.parse(info); 
          
          accessToken.value=res.data.inviteLogin.accessToken 
          loading.value = false;
          
          
          resetForm();
          router.replace({ name: "Admin_dashboard-index" });
        } else {
          loading.value = false;
          showMessage.value = res.data.inviteLogin.message;
        }
      } else {
        showMessage.value = "Try Again";
        loading.value = false;
      }

})

errorOnInviteLogin((error)=>{
 showMessage.value = "some error please check connection";
      loading.value = false;
    

})

</script>
<template>
  <div
    class="md:rounded-r-md md:rounded-l-none rounded-md flex flex-col px-3 justify-center items-center gap-3 h-[25rem] w-full"
  >
    <h1 class="text-title text-center font-semibold text-2xl">INVITE LOGIN</h1>
    <span class="text-xs text-red-900">{{ showMessage }}</span>
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
        name="code"
        label="Code"
        id="code"
        rule="required"
        placeholder="Enter the verification Code"
      />
      <v-button-solid type="submit" class="h-10" :isLoading="loading" value="Login" />
    </form>
    <div class="flex w-full flex-row justify-between text-sm">
      <NuxtLink
        :to="{ name: 'index' }"
        class="rounded-md border-[1px] border-primary px-3 py-1 hover:bg-primary hover:text-white"
      >
        Login as Admin</NuxtLink
      >
    </div>
  </div>
</template>
