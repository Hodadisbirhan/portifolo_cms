<script setup>
import { useForm } from "vee-validate";
import verifyMutation from "~/gql/mutation/authenticationRelatedMutation/verifyMutation.gql";
import { useMutation } from "@vue/apollo-composable";
const { handleSubmit, resetForm } = useForm();
const router = useRouter();
const loading = ref(false);
const { mutate, onDone: verifyCompleted, onError: verifyError } = useMutation(verifyMutation);
const showMessage = ref("");
definePageMeta({ middleware: "navgaurd" });
const submit = handleSubmit((value) => {
  const cookie = useCookie("emailForget");
  loading.value = true;
  mutate({
    email: cookie.value,
    code: value.code,
  });
});
verifyCompleted((res) => {
  if (res.data.verify.status === "success") {
    loading.value = false;
    router.replace({ name: "index-ResetPassword" });

    resetForm();
  } else {
    loading.value = false;
    showMessage.value = res.data.verify.status;

    resetForm();
  }
})


verifyError((error) => {
  loading.value = false;
  showMessage.value = "Some Error again";


})
</script>
<template>
  <div
    class="flex md:rounded-r-md md:rounded-l-none rounded-md flex-col gap-4 justify-center px-3 items-center h-[25rem]">
    <h1 class="text-2xl text-title font-semibold">VERIFICATION CODE</h1>
    <span>{{ showMessage }} </span>
    <p class="text-xs text-primary">Enter the Verification Code in Your Email</p>
    <p class="text-xs">you have 3 minute</p>
    <form @submit.prevent="submit" class="flex flex-col gap-4 w-full">
      <field-v-input-field type="text" label="Code" name="code" rule="required"
        placeholder="Verification Code to Reset" />
      <v-button-solid type="submit" class="py-2" value="Send" :is-loading="loading" />
    </form>
  </div>
</template>
