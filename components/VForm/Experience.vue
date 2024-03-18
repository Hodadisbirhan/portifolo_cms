<script setup>
import { XCircleIcon } from "@heroicons/vue/outline";
import { useForm } from "vee-validate";
import { useMutation, useQuery } from "@vue/apollo-composable";
import { addExperience, updateExperience } from "@/gql/mutation";

const props = defineProps({
  id: Number,
  name: String,
  description: String,
  position: String,
  start_date: String,
  end_date: String,
  taskType: String,
});
const emits = defineEmits(["close", "changeNotify"]);
const user_id = userID();
function close() {
  emits("close");
}
const { mutate: addExperienceByID, onDone: addCompleted } =
  useMutation(addExperience);
const { mutate: editExperience, onDone: EditCompleted } =
  useMutation(updateExperience);
const whatTodo = computed(() => {
  if (props.taskType === "Edit") {
    return "Update";
  }
  return "Add";
});
const title = computed(() => {
  if (props.taskType === "Edit") {
    return "Edit Experience";
  }
  return "Add Experience";
});
const { handleSubmit, setValues, resetForm } = useForm();
setValues({
  experience: props.name,
  description: props.description,
  position: props.position,
  start_date: props.start_date,
  end_date: props.end_date,
});
const submit = handleSubmit((value) => {
  if (props.taskType === "Edit") {
    editExperience({
      name: value.experience,
      description: value.description,
      position: value.position,
      start_date: value.start_date,
      end_date: value.end_date,
      id: props.id,
    });
  } else {
    addExperienceByID({
      name: value.experience,
      description: value.description,
      position: value.position,
      start_date: value.start_date,
      end_date: value.end_date,
      user_id: user_id.value,
    });
  }
});

const Reset = () => {
  resetForm();
};
addCompleted((res) => {
  if (res.data) {
    emits("changeNotify");
  }
});
EditCompleted((res) => {
  if (res.data) {
    emits("changeNotify");
  }
});
</script>
<template>
  <form
    @submit.prevent="submit"
    class="flex relative flex-col gap-3 bg-slate-50 px-4 justify-center rounded-md py-6 items-center sm:w-[65%] xs:w-[75%] w-[95%] lg:w-[40%]">
    <x-circle-icon
      class="absolute top-1 right-1 w-8 h-6 text-primary hover:cursor-pointer hover:opacity-80"
      @click="close" />
    <h2 class="text-title text-xl font-semibold">{{ title }}</h2>
    <field-v-input-field
      type="text"
      rule="required"
      name="experience"
      label="Company Name"
      placeholder="Company Name " />
    <field-v-input-field
      type="text"
      rule="required"
      name="position"
      label="Postion"
      placeholder=" e.g Intership" />

    <div class="flex gap-3 w-full">
      <field-v-input-field
        type="date"
        rule="required"
        name="start_date"
        label="Start Date" />

      <field-v-input-field
        type="date"
        name="end_date"
        label="End Date" />
    </div>
    <field-v-text-area
      rule="required"
      name="description"
      label="Description"
      placeholder="About on this Experience" />
    <div class="w-full justify-center items-center flex gap-4">
      <v-button-solid
        type="submit"
        class="px-2 xs:w-[10rem]"
        :value="whatTodo" />
      <v-button-out-line
        type="button"
        class="w-[5rem] xs:w-[10rem]"
        value="Clear"
        @click="Reset" />
    </div>
  </form>
</template>
