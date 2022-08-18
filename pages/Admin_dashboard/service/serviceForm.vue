<script setup>
import { useForm } from "vee-validate";
import { updateService, uploadImageQuery } from "~~/gql/mutation.js";
import { fetchServiceByID } from "~~/gql/query.js";
import { useMutation, useQuery } from "@vue/apollo-composable";
import { ArrowLeftIcon } from "@heroicons/vue/solid";
const route = useRoute();
const router = useRouter();

const variables = computed(() => {
  return { id: parseInt(route.query.id) };
});
const { mutate: ImageUpload, onDone: imageUploadCompleted, onError: ImageUploadedError } = useMutation(uploadImageQuery);
const { mutate: updateServiceById, onDone: updateServiceCompleted, onError: updateServiceError } = useMutation(updateService);
const { result, loading, error } = useCustomeQuery(fetchServiceByID, variables);
const EditedServiceValue = ref({
  title: "",
  year: 0,
  cleint: 0,
  description: "",
  image: "",
});

definePageMeta({
  middleware: "navgaurd",
});
const image = ref("");
const imageName = ref();
const showMessage = ref('');
const changeImage = (event) => {
  imageName.value = event.target.files[0].name;
  tobase64(event.target.files[0]);
};

const uplaodedImage = ref({});
const loadingShow = ref(false);

const tobase64 = (file) => {
  const reader = new FileReader();
  reader.onloadend = () => {
    image.value = reader.result;

    uplaodedImage.value = {
      name: imageName.value,
      base64: reader.result.toString().split(",")[1],
    };
    console.log(image.value);
  };
  reader.readAsDataURL(file);
};
const computedResult = computed(() => {
  return result.value?.services_by_pk;
});

const computedLoading = computed(() => {
  return loading.value;
});
watchEffect(() => {
  computedLoading.value;
  if (computedResult.value) {
    EditedServiceValue.value = { ...computedResult.value };

    image.value = computedResult.value.image;
  }
});
const { handleSubmit, resetForm } = useForm();
const submit = handleSubmit((value) => {
  showMessage.value = '';
  loadingShow.value = true;
  if (imageName.value && imageName.value.trim()) {
    ImageUpload(uplaodedImage.value)
    imageUploadCompleted((res) => {
      if (res.data.upLoadImage.url && !res.data.upLoadImage.error) {
        updateServiceById({
          title: value.name,
          id: variables.value.id,
          description: value.description,
          year: value.year ? value.year : 0,
          cleint: value.CleintNumber ? value.CleintNumber : 0,
          image: res.data.upLoadImage.url,
        })
      }
      else{
        loadingShow.value=false;
        showMessage.value = "Image Uploaded error"
      }
    })

  } else {
    updateServiceById({
      title: value.name,
      id: variables.value.id,
      description: value.description,
      year: value.year ? value.year : 0,
      cleint: value.CleintNumber ? value.CleintNumber : 0,
      image: image.value,
    })
  }
});

updateServiceCompleted((res) => {
  if (res.data) {

    loadingShow.value = false;
    router.replace({
      params: { status: true },
      name: "Admin_dashboard-service",
    });

  }

})

updateServiceError((error) => {
  showMessage.value ="please try again"
  loadingShow.value = false;

})
ImageUploadedError((error) => {
showMessage.value ="image uploaded error"
  loadingShow.value = false;

})
const back = () => {
  router.replace({ params: { status: false }, name: "Admin_dashboard-service" });
};
</script>
<template>
  <div class="w-full">
    <div class="text-lg w-full" v-if="computedLoading">Loading...</div>
    <form @submit.prevent="submit" v-if="computedResult"
      class="overflow-y-auto rounded-md bg-slate-50  w-full h-[calc(100vh-7rem)] mr-5 sm:px-4 lg:px-6 xs:px-2 px-1">
      <arrow-left-icon
        class="w-8 h-6 text-primary sticky z-20 hover:cursor-pointer hover:opacity-80 lg:hidden block top-1 left-1"
        @click="back" />

      <div class="flex flex-col w-full h-fit py-10 gap-5">
      <span class="text-xs text-red-900 w-full text-center">{{showMessage}}</span>
        <h2 class="w-full text-center text-title text-2xl font-semibold">
          Edit Services
        </h2>
        <div class="flex xs:flex-row flex-col items-center justify-center gap-3">
          <div class="rounded-md border-[0.01px] border-primary py-1 xl:w-[15rem] w-[10rem]  flex justify-center items-center">
            <img v-if="image" :src="image" class="object-contain h-[6rem] object-center" alt="photo" />
          </div>
          <input type="file" accept="image/png, image/gif, image/jpeg" class="h-0 w-0 invisible" @change="changeImage"
            name="file" id="file" />
          <label for="file" class="px-3 py-2 text-sm rounded-md bg-primary text-white">
            ChooseImage</label>
        </div>
        <field-v-input-field type="text" label="Service Name" id="name" name="name"
          placeholder="Service Name e.g Web App Development" v-model="EditedServiceValue.title" rule="required" />
        <field-v-text-area label="Description" v-model="EditedServiceValue.description" id="desc" name="description"
          placeholder="Service Decription" rule="required" />
        <div class="flex  w-full justify-center  gap-4">
          <field-v-input-field type="Number" v-model="EditedServiceValue.year" id="year" label="Year(Optional)"
            rule="range:0" name="year" placeholder="Year of Expereince on this Service" />
          <field-v-input-field type="number" id="numberofSatsfiedUser" v-model="EditedServiceValue.satisfied_cleint"
            label="Clients(Opt)" rule="range:0" name="CleintNumber" placeholder="Satisfied Number of Client e.g(2)" />
        </div>
      </div>

      <div class="w-full sticky bottom-2 left-0 justify-center items-center flex gap-4">
        <v-button-solid type="submit" class="w-[5rem] xs:w-[10rem]" value="Add" :isLoading="loadingShow" />
        <v-button-out-line type="button" class="bg-slate-50 w-[5rem] xs:w-[10rem]" value="Reset" @click="resetForm()" />
      </div>
    </form>
  </div>
</template>
