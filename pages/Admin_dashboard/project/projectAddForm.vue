<script setup>
import { useMutation, useQuery } from "@vue/apollo-composable";
import { uploadImageQuery, addProject } from "@/gql/mutation";
import { ArrowLeftIcon } from "@heroicons/vue/solid";
import { useForm } from "vee-validate";
definePageMeta({
  middleware: "navgaurd",
});

const { mutate: imageUpload ,onDone:uploadImageCompleted,onError:uploadedImageError} = useMutation(uploadImageQuery);
const { mutate: addNewProject,onDone:addNewProjectCompleted,onError:addNewProjectError } = useMutation(addProject);

const route = useRoute();

watchEffect(() => {
  route.name;
});

const loading = ref(false);

const image = ref("");
const imageName = ref("");

const showMessage = ref("");
const changeImage = (event) => {
  imageName.value = event.target.files[0].name;
  tobase64(event.target.files[0]);
  showMessage.value = "";
};

const uplaodedImage = ref({});

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
const user_id = userID();

const router = useRouter();
const { handleSubmit, resetForm } = useForm();
const submit = handleSubmit((value) => {
  if (image.value.trim()) {
    loading.value = true;

    imageUpload(uplaodedImage.value);
    uploadImageCompleted((res)=>{
         if (res.data.upLoadImage.url && !res.data.upLoadImage.error) {
        addNewProject({
          title: value.name,
          description: value.description,
          date: value.date,
          size: value.size,
          link: value.link,
          image: res.data.upLoadImage.url,
          user_id: user_id.value,
        })
      }
      else{
       showMessage.value = "image upload error try again "; 
       loading.value= false;
      }
    });
  } else {
    showMessage.value = "please choose an image";
  }
    })
    

addNewProjectCompleted((res)=>{
  if (res.data) {
            loading.value = false;
            router.replace({ params: { status: true }, name: "Admin_dashboard-project" });
          }
      
})

uploadedImageError((error)=>{
showMessage.value="Upload image Error";
loading.value = false;

})
addNewProjectError((error)=>{
showMessage.value="some error happend try again";
loading.value = false;
console.log(error)

})

const back = () => {
  router.replace({ params: { status: false }, name: "Admin_dashboard-project" });
};
</script>
<template>
  <form
    @submit.prevent="submit"
    class="rounded-md w-full bg-slate-50 border border-white overflow-x-hidden overflow-y-auto xs:mr-3 mr-2 px-2 h-[calc(100vh-7rem)]"
  >
    <arrow-left-icon
      class="w-8 h-6 text-primary hover:cursor-pointer hover:opacity-80 sticky lg:hidden block top-1 left-1"
      @click="back"
    />

    <div class="flex flex-col w-full h-fit py-10 gap-5">
      <span class="text-red-900 w-full text-center">{{ showMessage }}</span>
      <h2 class="w-full text-center text-title text-2xl font-semibold">Add Project</h2>
      <div class="flex xs:flex-row flex-col items-center justify-center gap-3">
        <div
          class="rounded-md w-[10rem] bg-body h-[6rem] flex justify-center items-center"
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
          rule="required|image"
          @change="changeImage"
          name="file"
          id="file"
        />
        <label for="file" class="px-3 py-2 text-sm rounded-md bg-primary text-white">
          ChooseImage</label
        >
      </div>
      <field-v-input-field
        type="text"
        label="Project Name"
        id="name"
        name="name"
        placeholder="Project Name"
        rule="required"
      />
      <field-v-text-area
        label="Description"
        id="desc"
        name="description"
        placeholder="Project Decription"
        rule="required"
      />
      <field-v-input-field
        type="url"
        id="url"
        label="Project Link"
        placeholder="Project Link"
        name="link"
        rule="required"
      />
      <div class="flex justify-center gap-4">
        <field-v-input-field
          type="date"
          id="date"
          label="Published Date"
          name="date"
          placeholder="Published Date"
          rule="required|date"
        />
        <field-v-input-field
          type="number"
          id="size"
          label="Size"
          rule="required|range:100"
          name="size"
          placeholder="Project Size e.g 23"
        />
      </div>
    </div>
    <div class="sticky w-full justify-center bottom-2 left-0 items-center flex gap-4">
      <v-button-solid
        type="submit"
        class="w-[5rem] xs:w-[10rem]"
        value="Submit"
        :is-loading="loading"
      />
      <v-button-out-line
        type="button"
        class="w-[5rem] bg-slate-50 xs:w-[10rem]"
        value="Clear"
        @click="resetForm()"
      />
    </div>
  </form>
</template>
