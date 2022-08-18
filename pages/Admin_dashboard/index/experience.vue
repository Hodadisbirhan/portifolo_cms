<script setup>
import { TrashIcon, PencilIcon, BriefcaseIcon, PlusIcon } from "@heroicons/vue/solid";
import { useMutation, useQuery } from "@vue/apollo-composable";
import { deleteExperience } from "~~/gql/mutation";
import { fetchExperience } from "~~/gql/query";
const forAddExperience = ref(false);
const forEditExperience = ref(false);
const valueForEdited = ref({});
const delete_id = ref();

useHead({ title: "Experience" });
const { fetchMore, result, loading, error } = useCustomeQuery(fetchExperience);
const { mutate,onDone } = useMutation(deleteExperience);
const computedLoading = computed((e) => {
  return loading.value;
});
const changeForAddExperience = () => {
  forAddExperience.value = !forAddExperience.value;
};

const changeForEditExperience = (value) => {
  valueForEdited.value = value;
  forEditExperience.value = !forEditExperience.value;
};
const changeExperience = computed(() => {
  return result.value?.experiences;
});

watchEffect(() => {
  computedLoading.value;
  changeExperience.value;
});

const closePopUp = () => {
  forAddExperience.value = false;
  forEditExperience.value = false;
  const deleted_id = ref();
};
const isDeleteModalVisible = ref(false);
const deleteIt = (value) => {
  if (delete_id.value && value === "yes") {
    mutate({ id: delete_id.value });
  }
  isDeleteModalVisible.value = false;
};
const updateQuery = () => {
  fetchMore({});
  closePopUp();
};

const showDelete = () => {
  isDeleteModalVisible.value = !isDeleteModalVisible.value;
};
const delete_ExpereinceByID = (id) => {
  delete_id.value = id;
  showDelete();
};

onDone((res)=>{
 
  if(res.data){
    fetchMore({variables:{}});
  }
})
</script>
<template>
  <div class="w-full">
    <div class="w-full text-lg" v-if="computedLoading">Loading...</div>
     <div class="w-full text-lg" v-else-if="error">Error...</div>
    <div
      v-else-if="changeExperience"
      class="grid lg:grid-cols-2 grid-cols-1 gap-y-9 gap-x-[2rem] pr-3  py-6"
    >
      <div
        class="flex flex-row bg-slate-50 border border-white px-4 py-5 items-center justify-between rounded-md"
        v-for="item in changeExperience"
        :key="item.id"
      >
        <div class="flex flex-row gap-6 items-center">
          <BriefcaseIcon
            class="md:w-[3rem] md:h-[3rem] sm:w-[2rem] sm:h-[2rem] xs:w-[1.7rem] w-[2rem] h-[1rem] xs:h-8 min-w-[2rem] text-primary"
          />
          <div class="flex flex-col gap-7 h-full">
            <h1 class="font-semibold text-title truncate">{{ item.name }}</h1>
            <p class="text-xs text-bodyText">{{ item.description }}</p>
          </div>
        </div>

        <div class="flex flex-col gap-7 pt-1 h-full">
          <PencilIcon
            class="min-w-[1rem] w-[1rem] h-[1.2rem] hover:cursor-pointer hover:opacity-80"
            @click="changeForEditExperience(item)"
          />
          <TrashIcon
            class="min-w-[1rem] w-[1rem] h-[1.2rem] hover:cursor-pointer hover:opacity-80"
            @click="delete_ExpereinceByID(item.id)"
          />
        </div>
      </div>
      <div
        :class="forEditExperience ? 'scale-1  bg-black/30' : 'scale-0 bg-none'"
        class="transition-colors duration-500 flex justify-center items-center fixed top-0 left-0 z-40 w-[100vw] h-[100vh]"
      >
        <div
          class="flex w-full justify-center items-center duration-300"
          :class="forEditExperience ? 'scale-1' : 'scale-0'"
        >
          <v-form-experience
            v-bind="valueForEdited"
            @change-notify="updateQuery"
            task-type="Edit"
            v-if="forEditExperience"
            @close="closePopUp"
          />
        </div>
      </div>
      <div
        :class="forAddExperience ? 'scale-1 bg-black/30' : 'scale-0 bg-none'"
        class="transition-colors duration-500 flex justify-center items-center fixed top-0 left-0 z-40 w-[100vw] h-[100vh]"
      >
        <div
          class="flex w-full justify-center items-center duration-300"
          :class="forAddExperience ? 'scale-1' : 'scale-0'"
        >
          <v-form-experience
            @change-notify="updateQuery"
            task-type="Add"
            v-if="forAddExperience"
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
      value="Add Experience"
      :icon="PlusIcon"
      @click="changeForAddExperience"
      class="py-3 fixed bottom-24 right-5 text-white bg-primary px-6"
    />
  </div>
</template>
