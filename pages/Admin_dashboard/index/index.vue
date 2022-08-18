<script setup>
import { PencilIcon } from "@heroicons/vue/solid";
import { useMutation } from "@vue/apollo-composable";
import { fetchAdmin } from "@/gql/query";
import { useForm } from "vee-validate";
import { uploadImageQuery, updateAdminByUsers } from "@/gql/mutation";
const { mutate: upLoadImage ,onDone:uploadImageCompleted,onError:imageUploadError} = useMutation(uploadImageQuery);
const { mutate: updateAdminMutate,onDone:profileUpdateCompleted,onError:profileUpdateError } = useMutation(updateAdminByUsers);
const user_id = userID();
const variables = computed(() => {
  return { id: user_id.value };
});
const showForm = ref(false);
const { result, fetchMore, loading } = useCustomeQuery(fetchAdmin, variables);

const AdminInfo = computed(() => result.value?.users_by_pk);
const message = ref("");
const image = ref("/myLogo.png");
const imageName = ref(null);
const uplaodedImage = ref({});
const buttonLoading = ref(false);
useHead({ title: "Basic Info" });
const changeImage = (event) => {
  imageName.value = event.target.files[0].name;
  tobase64(event.target.files[0]);
};


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

const { handleSubmit, setValues, resetForm } = useForm();
const submit = handleSubmit((value) => {
  message.value='';
  buttonLoading.value = true;
  if (imageName.value && imageName.value?.trim()) {
    upLoadImage(uplaodedImage.value);
    uploadImageCompleted((res)=>{
  if (res.data.upLoadImage.url && !res.data.upLoadImage.error) {
        updateAdminMutate({
          first_name: value.Fname,
          profile_image: res.data.upLoadImage.url,
          last_name: value.Lname,
          email: value.email,
          status: value.status,
          phone: value.phone,
          address: value.address,
          about: value.bio,
          id: user_id.value,
        })
      }
      else{
        message.value = "uploading image error try again"
        buttonLoading.value = false;
      }

    })
    
    
    
  } else {
    updateAdminMutate({
      first_name: value.Fname,
      profile_image: image.value,
      last_name: value.Lname,
      email: value.email,
      status: value.status,
      phone: value.phone,
      address: value.address,
      about: value.bio,
      id: user_id.value,
    })
    
  }
});

const computedLoading = computed(() => {
  return loading.value;
});
watchEffect(() => {
  computedLoading.value;
  if (AdminInfo.value) {
    const info = AdminInfo.value;
    image.value = info.profile_image;
    setValues({
      Fname: info.first_name,
      Lname: info.last_name,
      status: info.status,
      email: info.email,
      address: info.address,
      phone: info.phone,
      bio: info.about,
    });
    showForm.value = true;
   
  }
});
profileUpdateCompleted((res)=>{
   if (res.data) {
          buttonLoading.value = false;
          message.value = "Successfully updated";
          setTimeout(() => {
            message.value = "";
          }, 10000);
          showForm.value = false;
          fetchMore({});
        }
})
imageUploadError((error)=>{
buttonLoading.value = false;
message.value = "upload Image Error";
console.log(error);
})
profileUpdateError((error)=>{
 message.value = "Not submited Please try Again";
        buttonLoading.value = false;
        console.log(error);
})

const clear = () => {
  resetForm();
};
</script>
<template>
  <div class="w-full">
    <div
      v-if="computedLoading"
      class="text-lg w-full h-[100vh] flex justify-center items-center"
    >
      Loading...
    </div>
    <form
      v-if="showForm"
      @submit.prevent="submit"
      class="flex flex-col gap-4 md:px-[5%] bg-slate-50 border border-white drop-shadow-sm xs:px-3 px-2 xs:mr-4 mr-3 py-6 rounded-md"
    >
      <span class="w-full text-center text-red-900">{{ message }}</span>
      <div
        class="flex relative flex-row mx-auto rounded-[100%] border-[1px] border-white bg-body justify-center items-center gap-10 min-h-[5rem] w-[5rem] min-w-[5rem] xs:w-[6rem] h-[5rem] xs:h-[6rem]"
      >
        <input
          type="file"
          accept="image/png, image/gif, image/jpeg"
          @change="changeImage"
          class="w-0 h-0 absolute invisible"
          name="photo"
          id="photo"
        />
        <img :src="image" class="rounded-[100%] object-cover object-center" alt="photo" />
        <label
          for="photo"
          class="absolute bottom-1 hover:cursor-pointer hover:opacity-80 w-6 h-6 rounded-[100%] bg-primary flex justify-center items-center right-0"
          ><PencilIcon class="w-5 h-5 text-white"
        /></label>
      </div>
      <div class="flex flex-col justify-center items-center sm:flex-row gap-7">
        <field-v-input-field
          type="text"
          name="Fname"
          placeholder="Hodadis"
          label="First Name"
          id="fname"
          rule="required"
        />
        <field-v-input-field
          type="text"
          name="Lname"
          placeholder="Birhan"
          label="Last Name"
          id="lname"
          rule="required"
        />
      </div>
      <div class="flex flex-col sm:flex-row gap-7">
        <field-v-input-field
          type="text"
          name="status"
          placeholder="Software Engineering"
          label="Status"
          id="status"
          rule="required"
        />
        <field-v-input-field
          type="email"
          name="email"
          placeholder="hodadis@gmail.com"
          label="Email"
          id="email"
          rule="required|email"
        />
      </div>
      <div class="flex flex-col sm:flex-row gap-7">
        <field-v-input-field
          type="text"
          name="address"
          placeholder="Addis Ababa Bole"
          label="Address"
          id="address"
          rule="required"
        />
        <field-v-input-field
          type="tel"
          name="phone"
          placeholder="+251995183367"
          label="Phone"
          id="phone"
          rule="required|ethioPhone"
        />
      </div>
      <field-v-text-area
        name="bio"
        label="Bio"
        rule="required|minLength:30"
        id="bio"
        placeholder="Your Bio... At least 30 character"
      />
      <div class="w-full sticky bottom-1 left-0 justify-center items-center flex gap-4">
        <v-button-solid
          type="submit"
          class="w-[10rem]"
          :is-loading="buttonLoading"
          value="Submit"
        />
        <v-button-out-line
          type="button"
          class="w-[10rem] bg-slate-50"
          value="Reset"
          @click="clear"
        />
      </div>
    </form>
  </div>
</template>
