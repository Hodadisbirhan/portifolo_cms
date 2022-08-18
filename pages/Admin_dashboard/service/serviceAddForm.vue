<script setup>
import { useForm } from "vee-validate";
import { useMutation } from "@vue/apollo-composable";
import { addService, uploadImageQuery } from "~~/gql/mutation.js";
import { ArrowLeftIcon } from "@heroicons/vue/solid";
const { mutate: ImageUpload,onDone:uploadedImageCompleted,onError:uploadedImageError } = useMutation(uploadImageQuery);
const { mutate: updateServiceById,onDone:addServiceIsDone,onError:addServiceError } = useMutation(addService);
const user_id = userID();

definePageMeta({
  middleware: "navgaurd",
});
const image = ref("");
const imageName = ref();
const imageSelected = ref("");
const loading = ref(false);
const showMessage = ref('');
const changeImage = (event) => {
  imageName.value = event.target.files[0].name;
  tobase64(event.target.files[0]);
  imageSelected.value = "";
};

const uplaodedImage = ref({});
const router = useRouter();

const tobase64 = (file) => {
  const reader = new FileReader();
  reader.onloadend = () => {
    image.value = reader.result;

    uplaodedImage.value = {
      name: imageName.value,
      base64: reader.result.toString().split(",")[1],
    };
  };
  
  reader.readAsDataURL(file);
};

const { handleSubmit, resetForm } = useForm();
const submit = handleSubmit((value) => {
  showMessage.value = '';
  if (imageName.value && imageName.value.trim()) {
    loading.value = true;
    ImageUpload(uplaodedImage.value);
uploadedImageCompleted((res)=>{
  
   if (res.data.upLoadImage.url && !res.data.upLoadImage.error)
   {
     updateServiceById({
            title: value.name,
            user_id: user_id.value,
            description: value.description,
            year: value.year ? value.year : 0,
            cleint: value.CleintNumber ? value.CleintNumber : 0,
            image: res.data.upLoadImage.url,
          })
   }
   else{

    loading.value=false;
    showMessage.value=res.data.upLoadImage.error;
   }
})

     
  } else {
    imageSelected.value = "please Choose Image";
  }
});

addServiceIsDone((res)=>{
  if (res.data) {
              loading.value = false;
              router.replace({
                params: { status: true },
                name: "Admin_dashboard-service",
              });
            }
            loading.value = false;
            showMessage.value ="please try again"
            

}

) 

uploadedImageError((error)=>{
  loading.value=false;
  showMessage.value ="Image Uploaded Error Please try again"
})
addServiceError((error)=>{
  console.log(error);
loading.value=false;
showMessage.value ="some Error please try again"

})

const back = () => {
  router.replace({ params: { status: false }, name: "Admin_dashboard-service" });
};
</script>
<template>
  <form
    @submit.prevent="submit"
    class="overflow-y-auto rounded-md bg-slate-50 w-full h-[calc(100vh-7rem)]  sm:px-4 lg:px-5 xs:px-2 px-1"
  >
    <arrow-left-icon
      class="w-8 h-6 z-20 text-primary sticky hover:cursor-pointer hover:opacity-80 lg:hidden block top-1 left-1"
      @click="back"
    />
    <div class="flex flex-col w-full h-fit py-10 gap-5">
    <span class="text-xs text-red-900 w-full text-center">{{showMessage}}</span>
      <h2 class="w-full text-center text-title text-2xl font-semibold">Add Services</h2>
      <span>{{ imageSelected }}</span>
      <div class="flex xs:flex-row flex-col items-center justify-center gap-3">
        <div
          class="rounded-md border-[0.01px] border-primary py-1 xl:w-[15rem] w-[10rem] min-h-[6rem] flex justify-center items-center"
        >
          <img
            :src="image"
            v-if="image"
            class="object-contain h-[6rem] object-center"
            alt="photo"
          />
        </div>
        <input
          type="file"
          accept="image/png, image/gif, image/jpeg"
          class="h-0 w-0 invisible"
          @change="changeImage"
          name="file"
          id="file"
        />
        <label for="file" class="px-3 py-2 text-xs rounded-md bg-primary text-white">
          ChooseLogo</label
        >
      </div>
      <field-v-input-field
        type="text"
        label="Service Name"
        id="name"
        name="name"
        placeholder="Service Name e.g Web App Development"
        rule="required"
      />
      <field-v-text-area
        label="Description"
        id="desc"
        name="description"
        placeholder="Service Decription"
        rule="required"
      />
      <div class="flex w-full justify-center gap-4">
        <field-v-input-field
          type="Number"
          id="year"
          label="Year(Optonal)"
          name="year"
          rule="range:0"
          placeholder="Year of Expereince on this Service"
        />
        <field-v-input-field
          type="number"
          id="numberofSatsfiedUser"
          label="Clients(Opt)"
          name="CleintNumber"
          rule="range:0"
          placeholder="Satisfied Number of Client e.g(2)"
        />
      </div>
    </div>

    <div class="w-full sticky bottom-2 left-0 justify-center items-center flex gap-4">
      <v-button-solid
        type="submit"
        class="w-[5rem] xs:w-[10rem]"
        value="Add"
        :isLoading="loading"
      />
      <v-button-out-line
        type="button"
        class="bg-slate-50 w-[5rem] xs:w-[10rem]"
        value="Clear"
        @click="resetForm()"
      />
    </div>
  </form>
</template>
