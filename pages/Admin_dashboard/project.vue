<script setup>
import { SearchIcon, PlusIcon } from "@heroicons/vue/solid";
import { projectQuery } from "@/gql/query";
import { useMutation, useQuery } from "@vue/apollo-composable";
import { deleteProject } from "@/gql/mutation";
definePageMeta({
  layout: "side-navigation",
  middleware: "navgaurd",
});
useHead({ title: "Project" });
const search = ref("");
const variables = computed(()=>{return {search:search.value.trim()} });

const { fetchMore, result, loading, error } = useCustomeQuery(projectQuery, variables, 
  500
);
const projectResult = computed(() => result.value?.projects);
const { mutate,onDone,onError } = useMutation(deleteProject);
const showForm = ref(false);
const router = useRoute();
const project_Id = ref();

const isDeleteModalVisible = ref(false);

function showDelete(id) {
  project_Id.value = id;
  isDeleteModalVisible.value = !isDeleteModalVisible.value;
}
function showFormFunction() {
  showForm.value = !showForm.value;
}
function deleteIt(value) {
  if (value === "yes") {
    mutate({ id: project_Id.value });
  }

  isDeleteModalVisible.value = !isDeleteModalVisible.value;
}
onDone((res)=>{
  if(res.data)
 fetchMore({variables:{}})
})

const routes = computed(() => {
  if (router.params.status) {
    router.params.status = false;

    fetchMore({});
  }

  return router.name === "Admin_dashboard-project";
});



const computedLoading = computed(() => {
  return loading.value;
});

watchEffect(() => {
  projectResult.value;
  computedLoading.value;
});
const computedNoResult = computed(()=>{
return projectResult.value && projectResult.value.length<1&&!computedLoading.value
})
</script>
<template>
  <div class="flex-row h-fit pb-2  flex gap-6 py-6">
    <div
      :class="routes ? 'flex' : 'lg:flex hidden'"
      class="relative flex-col gap-10 overflow-y-auto h-[calc(100vh-6.5rem)] pb-5  xs:pr-2 pr-1 lg:pr-[1.2rem] w-full  lg:border-r-2 lg:border-r-primary"
    >
      <div class="relative">
        <input
          type="text"
          v-model="search"
         
          placeholder="Search..."
          class="w-full h-[3rem] pl-7 bg-slate-50 text-sm rounded-md outline-none hover:border-blue-300 focus:border-blue-300 border-[1px]"
        />
        <SearchIcon class="absolute left-1 top-[30%] w-6 h-5 text-slate-300" />
      </div>
      <div class="text-lg" v-if="computedLoading">Loading...</div>
      
      <div v-else class="relative flex flex-col gap-10 items-end pb-5 w-full">
      <div class="text-lg w-full text-center" v-if="computedNoResult">No Result</div>
        <div class="flex flex-col gap-10 pb-5 w-full" v-else-if="projectResult">
          <project-card
            @delete="showDelete"
            v-for="item in projectResult"
            :key="item"
            v-bind="item"
          />
        </div>
        <NuxtLink
          :class="routes ? 'lg:hidden flex' : 'lg:flex hidden'"
          class="sticky left-0 bottom-0 w-fit justify-end"
          :to="{ name: `Admin_dashboard-project-projectAddForm` }"
        >
          <v-button-with-icon
            value="Add Project"
            :icon="PlusIcon"
            class="text-white bg-primary py-3 block px-6"
          />
        </NuxtLink>
      </div>
    </div>
    <div :class="!routes ? 'flex' : 'lg:flex hidden'" class="w-full justify-center">
      <NuxtPage />
      <div
        v-if="routes"
        class="h-[calc(100vh-7rem)] w-full flex justify-center items-center"
      >
        <NuxtLink class="" :to="{ name: `Admin_dashboard-project-projectAddForm` }">
          <v-button-with-icon
            value="Add Project"
            :icon="PlusIcon"
            @click="showFormFunction"
            class="text-white bg-primary py-3 block px-6"
          />
        </NuxtLink>
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
</template>
