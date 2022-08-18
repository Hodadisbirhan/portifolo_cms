<script setup>
import { useForm } from "vee-validate";
import { changePasswordMutation } from "~~/gql/mutation";
import { useMutation } from "@vue/apollo-composable";
definePageMeta({
    layout:"side-navigation",
    middleware:"navgaurd",

})
const {mutate,onDone,onError} = useMutation(changePasswordMutation);
const loading = ref(false);

const {handleSubmit,resetForm} = useForm()
const showMessage = ref('');
const submit = handleSubmit((value)=>{
    loading.value = true;
    showMessage.value = '';
  const loged =  useCookie("accessToken");
  if(loged.value&&process.client)
  {
 const info = window.atob(useCookie("accessToken").value.split(".")[1])
 const {email} = JSON.parse(info);
mutate({oldPass:value.oldPass,newPass:value.newPass,email:email});
}
});

onDone((res)=>{
    loading.value = false;
resetForm();
showMessage.value = res.data.changePassword.status
})
onError((e)=>{
    loading.value = false;
    console.log(e);
})


</script>

<template>
<div class="w-full flex min-h-[calc(100vh-6rem)] items-center xs:pr-0 pr-2   justify-center">
<div class="flex flex-col md:max-w-[60%] bg-slate-50 sm:max-w-sm max-w-xs md:px-8 px-3  py-5 drop-shadow-md rounded-md border border-white  w-full mx-auto justify-center items-center  gap-5">
<h1 class="text-lg text-primary text-center  font-semibold">Change Password</h1>
<span class="text-red-900 text-xs text-center">{{showMessage}}</span>
<form @submit.prevent="submit" class="flex flex-col gap-5 w-full justify-center items-center ">
<field-v-password-input-field label="Old Password" name="oldPass" placeholder="Old Password" rule="required"/>
<field-v-password-input-field  label="New Password" name="newPass" placeholder="Set New Password" rule="required|minLength:8"/>
<field-v-password-input-field  label="Confirm Password" name="confirm" placeholder="Confirm Password" rule="required|confirm:newPass"/>
<v-button-solid value="Change Password" class="w-[10rem]" type="submit" :is-loading="loading"/>
</form>
</div>
</div>
</template>
