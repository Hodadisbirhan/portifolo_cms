<script setup>
import { UserIcon, TrashIcon } from "@heroicons/vue/solid";
import { gql } from "@apollo/client/core";
import { invitMutation, remove_GuestMutation } from "@/gql/mutation";
import { fectchAllGust } from "@/gql/query";
import { useForm } from "vee-validate";
import { useMutation, useQuery } from "@vue/apollo-composable";
definePageMeta({
  layout: "side-navigation",
  middleware: "navgaurd",
});
useHead({ title: "Setting" });

const { mutate,onDone:InvitationCompleted ,onError:inviteError} = useMutation(invitMutation);
const { mutate: removeGuest,onDone:removeGuestCompleted } = useMutation(remove_GuestMutation);
const { result, loading, error, fetchMore } = useCustomeQuery(fectchAllGust);
const buttonLoading = ref(false);
const allGuest = computed(() => {
  return result.value?.invite_users;
});
const loadingComputed = computed(() => {
  return loading.value;
});
const showMessage = ref("");
const user_id = userID();
const { handleSubmit, resetForm } = useForm();
const submit = handleSubmit((value) => {
  buttonLoading.value = true;
  mutate({ name: value.userName, email: value.email, user_id: user_id.value })
    

});
InvitationCompleted((res)=>{
  showMessage.value = res.data.inviteUser.message;
      setTimeout(() => {
        showMessage.value = "";
      }, 1000);
      buttonLoading.value = false;
      if (res.data.inviteUser.message === "Invited") {
        resetForm();
        fetchMore({});
      }
else
console.log(res.data.inviteUser);

})
removeGuestCompleted((res)=>{

fetchMore({});
})
inviteError((e)=>{
  console.log(e);
  showMessage.value = "Please check connection";
      setTimeout(() => {
        showMessage.value = "";
      }, 1000);
      buttonLoading.value = false;

})

const id = ref(0);
const isDeleteModalVisible = ref(false);
function showDeleteModel(value) {
  id.value = value;
  isDeleteModalVisible.value = !isDeleteModalVisible.value;
}

function deleteConfirm(value) {
  if (value === "yes") {
    removeGuest({ id: id.value })
  }
  isDeleteModalVisible.value = !isDeleteModalVisible.value;
}

watchEffect(() => {
  allGuest.value;
  loadingComputed.value;
});
</script>
<template>
  <div class="flex flex-col gap-6 mr-5">
    <div class="flex flex-col py-9 gap-5">
      <form @submit.prevent="submit" class="flex flex-col gap-2">
        <h1 class="text-title text-lg font-bold">Invite User</h1>
        <div class="flex md:flex-row flex-col gap-5">
          <field-v-input-field 
            type="text"
            name="userName"
            label="Name"
            placeholder="Invited Name"
            rule="required"
          />
          <field-v-input-field
            type="email"
            name="email"
            label="Email"
            placeholder="hodadis@gmail.com"
            rule="required|email"
          />
        </div>
        <div class="flex flex-row gap-5">
          <v-button-solid
            type="submit"
            class="w-[10rem]"
            :is-loading="buttonLoading"
            value="Invite"
          />
          <span class="text-sm text-primary">{{ showMessage }}</span>
        </div>
      </form>
    </div>
    <hr v-if="allGuest" class="w-full h-[3px] bg-primary" />
    <h1 v-if="allGuest" class="text-title font-bold text-lg">INVITED USER</h1>
    <div v-if="loadingComputed" class="flex justify-center items-center">Loading...</div>
    <div
      v-if="allGuest"
      class="grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-x-7 sm:gap-y-10 gap-5"
    >
      <div
        v-for="item in allGuest"
        :key="item.email"
        class="flex flex-row sm:gap-10 gap-5 border border-white bg-slate-50 py-3 px-2 rounded-md items-center"
      >
        <UserIcon class="min-w-[2rem] w-[2rem] h-[2rem] text-primary" />
        <div class="flex-col flex gap-7 w-full">
          <div class="flex justify-between w-full items-center">
            <h1 class="text-title text-base break-all font-medium pr-6">{{ item.name }}</h1>
            <TrashIcon
              @click="showDeleteModel(item.id)"
              class="min-w-[1.25rem] w-5 h-7 text-primary hover:opacity-80 hover:cursor-pointer"
            />
          </div>
          <p class="text-xs text-bodyText break-all  pr-6">{{ item.email }}</p>
        </div>
      </div>
    </div>
    <div
      @click.self="showDeleteModel"
      :class="isDeleteModalVisible ? 'bg-black/25 scale-100' : 'bg-black/0 scale-0'"
      class="flex duration-300 transition-colors flex-row fixed justify-center items-center top-0 left-0 z-40 w-[100vw] h-[100vh]"
    >
      <delete-model
        :class="isDeleteModalVisible ? 'scale-100' : ' scale-0'"
        @is-delete="deleteConfirm"
      />
    </div>
  </div>
</template>
