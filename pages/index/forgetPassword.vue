<script setup>
import { gql } from "@apollo/client/core";
import { useMutation } from "@vue/apollo-composable";
import { useForm } from "vee-validate";
import forgetPasswordMutation from "~/gql/mutation/authenticationRelatedMutation/forgetpassword.gql";
const { mutate,onDone:forgetPasswordCompleted,onError:forgetPasswordError } = useMutation(forgetPasswordMutation);
const router = useRouter();

const showMessage = ref("");
const { handleSubmit, resetForm } = useForm();
const loading = ref(false);
const submit = handleSubmit((value) => {
  loading.value = true;
  mutate({ email: value.Email })
});
forgetPasswordCompleted((res)=>{
if (res.data.forgetPassword.status === "sent") {
        const cookie = useCookie("emailForget");

   cookie.value = res.data.forgetPassword.email;
        loading.value = false;
        router.push({ name: "index-verify" });
        resetForm();
      } else {
        loading.value = false;
        showMessage.value = res.data.forgetPassword.status;
      }
})
forgetPasswordError((error)=>{
  
 showMessage.value = "Some Error Please  try again";
      
      loading.value = false;

})
</script>
<template>
  <div
    class="w-full flex flex-col gap-4 px-3 md:rounded-r-md md:rounded-l-none rounded-md justify-center h-[25rem] items-center"
  >
    <h1 class="text-title text-2xl font-semibold">FORGET PASSWORD</h1>
    <span class="text-xs text-red-900">{{ showMessage }}</span>
    <p class="text-xs text-primary">
      Enter Your Email that you have to get verification code
    </p>
    <form @submit.prevent="submit" class="flex w-full flex-col gap-4">
      <field-v-input-field
        type="email"
        name="Email"
        placeholder="hodadis@gmail.com"
        label="Email"
        id="email"
        rule="required|email"
      />

      <v-button-solid type="submit" class="py-2" :isLoading="loading" value="Send" />
    </form>

    <div class="flex w-full justify-end">
      <NuxtLink
        :to="{ name: 'index' }"
        class="border-primary px-3 py-1 hover:bg-primary text-sm hover:text-white rounded-md border-[1px]"
        >Back to Admin Login</NuxtLink
      >
    </div>
  </div>
</template>
