<script setup>
import { useMutation, useQuery } from "@vue/apollo-composable";
import { uploadImageQuery, updateProject, addProject } from "@/gql/mutation";
import { fetchProjectByID } from "@/gql/query";
import { useForm } from "vee-validate";
import { ArrowLeftIcon } from "@heroicons/vue/outline";

const variables = computed(() => {
  return { id: parseInt(route.query.id) };
});

definePageMeta({
  middleware: "navgaurd",
});

const loadingshow = ref(false);
const showMessage = ref("");

const {
  mutate: imageUpload,
  onDone: uploadImageCompleted,
  onError: uploadedImageError,
} = useMutation(uploadImageQuery);
const {
  mutate: updateProjectByID,
  onDone: updateProjectCompleted,
  onError: updateProjectError,
} = useMutation(updateProject);

const route = useRoute();

const { result, loading, error } = useCustomeQuery(fetchProjectByID, variables);

const image = ref("");
const imageName = ref("");

const changeImage = (event) => {
  imageName.value = event.target.files[0].name;
  tobase64(event.target.files[0]);
};
const EditedProjectValue = ref({});
const computedResult = computed(() => {
  return result.value?.projects_by_pk;
});

const loadingResult = computed(() => {
  return loading.value;
});

// watchEffect(() => {
//     if (computedResult.value) {

//         image.value = data.image;

//     }
// })

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
const router = useRouter();

const { handleSubmit, resetForm, setValues } = useForm();
const submit = handleSubmit((value) => {
  loadingshow.value = true;
  if (imageName.value && imageName.value.trim()) {
    imageUpload(uplaodedImage.value);
    uploadImageCompleted((res) => {
      if (res.data.upLoadImage.url && !res.data.upLoadImage.error) {
        updateProjectByID({
          title: value.name,
          description: value.description,
          id: variables.value.id,
          date: value.date,
          size: value.size,
          link: value.link,
          image: res.data.upLoadImage.url,
        });
      } else {
        loadingshow.value = false;
        showMessage.value = "image upload error";
      }
    });
  } else {
    updateProjectByID({
      title: value.name,
      description: value.description,
      id: variables.value.id,
      date: value.date,
      size: value.size,
      link: value.link,
      image: image.value,
    });
  }
});

watchEffect(() => {
  const projectValue = computedResult.value;
  loadingResult.value;
  if (projectValue) {
    setValues({
      name: projectValue.title,
      description: projectValue.description,
      link: projectValue.link,
      date: projectValue.date,
      size: projectValue.size,
    });
     image.value = projectValue.image;
  }
});

updateProjectCompleted((res) => {
  if (res.data) {
    loadingshow.value = false;
    router.replace({
      params: { status: true },
      name: "Admin_dashboard-project",
    });
  }
});
uploadedImageError((error) => {
  loadingshow.value = false;
  showMessage.value = "Error please Try again";
});

updateProjectError((error) => {
  loadingshow.value = false;
  showMessage.value = "Error please Try again";
});

const back = () => {
  router.replace({ params: { status: false }, name: "Admin_dashboard-project" });
};
</script>
<template>
  <div class="w-full">
    <div class="h-[100vh] flex justify-center items-center w-full" v-if="loadingResult">
      Loading
    </div>

    <form
      @submit.prevent="submit"
      v-else-if="computedResult"
      class="rounded-md bg-slate-50 border border-white overflow-x-hidden overflow-y-auto mr-3 px-2 h-[calc(100vh-7rem)]"
    >
      <ArrowLeftIcon
        class="h-[1rem] text-primary sticky hover:cursor-pointer hover:opacity-80 lg:hidden block top-1 left-1"
        @click="back"
      />

      <span class="text-red-9000">{{ showMessage }}</span>

      <div class="flex flex-col w-full h-fit py-10 gap-5">
        <h2 class="w-full text-center text-title text-2xl font-semibold">EDIT Project</h2>
        <div class="flex xs:flex-row  flex-col items-center justify-center gap-3">
          <div class="rounded-md w-[10rem] h-[6rem] bg-body flex justify-center items-center">
            <img :src="image" class="object-contain w-[10rem] h-[6rem] object-center" alt="photo" />
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
            name="size"
            placeholder="Project Size e.g 23"
            rule="required|range:100"
          />
        </div>
      </div>
      <div class="sticky w-full justify-center bottom-2 left-0 items-center flex gap-4">
        <v-button-solid
          type="submit"
          class="w-[5rem] xs:w-[10rem]"
          value="Submit"
          :isLoading="loadingshow"
        />
        <v-button-out-line
          type="button"
          class="w-[5rem] bg-slate-50 xs:w-[10rem]"
          value="Reset"
          @click="resetForm()"
        />
      </div>
    </form>
  </div>
</template>
