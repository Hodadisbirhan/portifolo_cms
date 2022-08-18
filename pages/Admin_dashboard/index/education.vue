<script setup>
import { TrashIcon, PencilIcon, PlusIcon } from "@heroicons/vue/solid";
import { fetchEducation } from "@/gql/query";
import { deleteEducation } from "~~/gql/mutation";
import { useMutation, useQuery } from "@vue/apollo-composable";
const forAddEducation = ref(false);
const forEditEducation = ref(false);
const valueForEdited = ref({});
useHead({ title: "Educations" });

const { result, loading, fetchMore,error } =  useCustomeQuery(fetchEducation);
const computedEducation = computed(() => {
  return result.value?.educations;
});
const computedLoading = computed(() => {
  return loading.value;
});
watchEffect(() => {
  computedEducation.value;
  computedLoading.value;
});

const { mutate,onDone:deletionCompleted } = useMutation(deleteEducation);

const changeForAddEducation = () => {
  forAddEducation.value = !forAddEducation.value;
};
const changeForEditEducation = (value) => {
  valueForEdited.value = value;
  forEditEducation.value = !forEditEducation.value;
};
const queryUpdate = () => {
  fetchMore({});
  forEditEducation.value = false;
  forAddEducation.value = false;
};
const closePopUp = () => {
  forAddEducation.value = false;
  forEditEducation.value = false;
};

const isDeleteModalVisible = ref(false);
const deleted_id = ref();
const deleteIt = (value) => {
  if (deleted_id.value && value === "yes") {
    mutate({ id: deleted_id.value })
  }
  isDeleteModalVisible.value = false;
};
deletionCompleted((res)=>{
  if(res.data)
  {
    fetchMore({});
  }
})
const showDelete = () => {
  isDeleteModalVisible.value = !isDeleteModalVisible.value;
};

const deleteEducationById = (id) => {
  deleted_id.value = id;
  showDelete();
};
</script>
<template>
  <div class="w-full">
    <div v-if="computedLoading">Loading...</div>
    <div
      v-else-if="computedEducation"
      class="grid md:grid-cols-2 grid-cols-1 gap-y-9 gap-x-5 pr-3  mr-0 py-6"
    >
      <div
        class="flex flex-row bg-slate-50 border border-white px-3 py-4 items-center justify-between rounded-md"
        v-for="item in computedEducation"
        :key="item.id"
      >
        <div class="flex flex-col w-[calc(100%-1.6rem)] gap-7">
          <h1 class="font-semibold truncate text-title">{{ item.name }}</h1>
          <p class="text-xs truncate w-[95%] text-bodyText">{{ item.description }}</p>
        </div>
        <div class="flex flex-col h-full pt-2 gap-5">
          <PencilIcon
            class="min-w-[1rem] w-[1rem] h-[1.2rem] hover:opacity-80 hover:cursor-pointer text-primary"
            @click="changeForEditEducation(item)"
          />
          <TrashIcon
            @click="deleteEducationById(item.id)"
            class="min-w-[1rem] w-[1rem] h-[1.2rem] hover:opacity-80 hover:cursor-pointer text-primary"
          />
        </div>
      </div>
      <div
        :class="forAddEducation ? 'scale-1 bg-black/30' : 'scale-0 bg-none'"
        class="transition-colors duration-500 flex justify-center items-center fixed top-0 left-0 z-40 w-[100vw] h-[100vh]"
      >
        <div
          class="flex w-full justify-center items-center duration-300"
          :class="forAddEducation ? 'scale-1' : 'scale-0'"
        >
          <v-form-education
            task-type="Add"
            v-if="forAddEducation"
            @change-notify="queryUpdate"
            if="forAddEducation"
            @close="closePopUp"
          />
        </div>
      </div>
      <div
        :class="forEditEducation ? 'scale-1  bg-black/30' : 'scale-0 bg-none'"
        class="transition-colors duration-500 flex justify-center items-center fixed top-0 left-0 z-40 w-[100vw] h-[100vh]"
      >
        <div
          class="flex w-full justify-center items-center duration-300"
          :class="forEditEducation ? 'scale-1' : 'scale-0'"
        >
          <v-form-education
            v-bind="valueForEdited"
            @change-notify="queryUpdate"
            task-type="Edit"
            v-if="forEditEducation"
            @close="closePopUp"
          />
        </div>
      </div>

      <div
        @click.self="showDelete"
        :class="isDeleteModalVisible ? 'bg-black/25 scale-100' : 'bg-black/0 scale-0'"
        class="flex duration-300 transition-colors flex-row fixed justify-center items-center top-0 left-0 z-40 w-[100vw] h-[100vh]"
      >
        <delete-model
          :class="isDeleteModalVisible ? 'scale-100' : ' scale-0'"
          @is-delete="deleteIt"
        />
      </div>
    </div>
    <v-button-with-icon
      value="Add Education"
      :icon="PlusIcon"
      @click="changeForAddEducation"
      class="py-3 fixed bottom-24 right-5 text-white bg-primary px-6"
    />
  </div>
</template>
