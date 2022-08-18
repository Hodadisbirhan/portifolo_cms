<script setup>
import { PlusIcon, SearchIcon } from "@heroicons/vue/solid";
import { fetchService } from "~~/gql/query.js";
import { useMutation, useQuery } from "@vue/apollo-composable";
import { deleteService } from "~~/gql/mutation.js";
const search = ref("");
const variables = computed(()=> {return { search: search.value.trim() }});
const { result, loading, fetchMore } = useCustomeQuery(fetchService, variables, 
500
);

useHead({ title: "Service" });
const { mutate,onDone } = useMutation(deleteService);

const computedResult = computed(() => {
  if (result && result.value) {
    return result.value;
  } else return [];
});
const computedLoading = computed(() => {
  return loading.value;
});
watchEffect(() => {
  computedResult.value;
  computedLoading.value;
});
definePageMeta({
  layout: "side-navigation",
  middleware: "navgaurd",
});

const service_id = ref();

const isDeleteModalVisible = ref(false);
const deleteServicebyID = (id) => {
  service_id.value = id;
  isDeleteModalVisible.value = !isDeleteModalVisible.value;
};
const deleteConfirm = (value) => {
  if (value === "yes") {
    mutate({ id: service_id.value })
  }
  isDeleteModalVisible.value = !isDeleteModalVisible.value;
};

const showDeleteModel = () => {
  isDeleteModalVisible.value = !isDeleteModalVisible.value;
};

const router = useRoute();
const routes = computed(() => {
  if (router.params.status) {
    router.params.status = false;
    fetchMore({});
  }

  return router.name === "Admin_dashboard-service";
});
onDone((res)=>{
  if(res.data){
    fetchMore({})
  }
})
</script>
<template>
  <div class="flex flex-row py-6 h-fit gap-4">
    <div
      :class="routes ? 'flex' : 'lg:flex hidden'"
      class="xs:pr-2 pr-1 border-r-2 overflow-y-auto h-[calc(100vh-9rem)] pb-2 lg:border-r-primary lg:w-[70%] w-full flex-col gap-y-7"
    >
      <div class="relative">
        <input
          type="search"
          placeholder="Search..."
          v-model="search"
         
          class="w-full h-[3rem] pl-7 bg-slate-50  text-sm rounded-md outline-none hover:border-blue-300 focus:border-blue-300 border-[1px]"
        />
        <SearchIcon class="absolute left-1 top-[30%] w-6 h-5 text-slate-300" />
      </div>
      <div v-if="computedLoading" class="w-full flex justify-center items-center text-lg">
        Loading
      </div>
 <div v-else-if="!computedResult.services || (computedResult.services&&computedResult.services.length<1)" class="w-full flex justify-center items-center text-lg">
        No Result
      </div>

      <div v-else-if="computedResult.services" class="pb-2 flex w-full flex-col gap-y-7">
        <ServiceCard
          v-for="item in computedResult.services"
          :key="item"
          v-bind="item"
          @delete="deleteServicebyID"
        />

        <NuxtLink
          :class="routes ? 'lg:hidden flex' : 'lg:flex hidden '"
          class="justify-end sticky bottom-2 left-0"
          :to="{ name: `Admin_dashboard-service-serviceAddForm` }"
        >
          <v-button-with-icon
            value="Add Service"
            :icon="PlusIcon"
            class="text-white bg-primary py-3 block px-6"
          />
        </NuxtLink>
      </div>
    </div>
    <div :class="routes ? 'lg:flex hidden' : 'flex'" class=" w-full sm:pr-3 pr-2 justify-center">
      <NuxtPage></NuxtPage>
      <div
        v-if="routes"
        class="h-[calc(100vh-7rem)] w-full flex justify-center items-center"
      >
        <NuxtLink class="" :to="{ name: `Admin_dashboard-service-serviceAddForm` }">
          <v-button-with-icon
            value="Add Service"
            :icon="PlusIcon"
            class="text-white bg-primary py-3 block px-6"
          />
        </NuxtLink>
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
