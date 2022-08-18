<script setup>
import { useMutation } from "@vue/apollo-composable";
import resetAction from "~/gql/mutation/authenticationRelatedMutation/resetAction.gql"
import { useForm } from "vee-validate";
const showMessage = ref("");
const { handleSubmit, resetForm } = useForm();
definePageMeta({
  middleware: "navgaurd",
});

const route = useRouter();
const cookie = useCookie("emailForget");
const { mutate, onDone: resetCompleted, onError: resettingError } = useMutation(resetAction);
const loading = ref(false);
const submit = handleSubmit((value) => {
  loading.value = true;
 

  mutate({ email: cookie.value, password: value.password });
});

resetCompleted((res) => {
  if (res.data.resetPassword.status === "success") {
    loading.value = false;
    route.replace({ name: "index" });
    cookie.value =null;
    resetForm();
  } else {
    loading.value = false;
    showMessage.value = "Please Try Again";
  }

})
resettingError((error) => {
 
  loading.value = false;
  showMessage.value = "No Email or check connection";

})
</script>

<template>
  <div
    class="md:rounded-r-md md:rounded-l-none rounded-md flex flex-col px-3 justify-center items-center gap-4 h-[25rem] w-full">
    <h1 class="text-title text-center font-semibold text-2xl">NEW PASSWORD</h1>
    <span class="text-xs text-red-900">{{ showMessage }}</span>
    <form @submit.prevent="submit" class="w-full flex gap-4 flex-col">
      <field-v-password-input-field name="password" label="Password" id="password" rule="required|minLength:8"
        placeholder="New Password" />
      <field-v-password-input-field name="Confirm" label="Confirm" id="confirm" rule="required|confirm:password"
        placeholder="Confirm Password" />
      <v-button-solid type="submit" class="h-10" :isLoading="loading" value="Reset" />
    </form>
  </div>
</template>
