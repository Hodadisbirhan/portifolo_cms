<script setup>
import { useField } from "vee-validate";
import {EyeIcon,EyeOffIcon} from "@heroicons/vue/outline"

const props = defineProps({
  rule: { type: String },
  placeholder: { type: [String, Number] },
  name: { type: String, required: true },
  label: { type: String },
  id: { type: String },
  icon: { type: Object },
});
const isVisible = ref(false);
const icons = computed(()=>{
   if(isVisible.value)
   {
    return EyeOffIcon;
   }
   else
   return EyeIcon;
})
const showPassword = () => {
  isVisible.value = !isVisible.value;

};
const { value, errorMessage } = useField(props.name, props.rule);
</script>
<template>
  <div class="flex flex-col gap-1 w-full">
    <label class="text-sm font-bold px-2 text-primary" :for="id">{{ label }}</label>
    <div class="relative w-full">
      <input
        :id="id"
        class="w-full rounded-md bg-slate-50  outline-none border-[1px]  hover:border-blue-500 border-slate-500 text-xs placeholder:text-xs focus:border-blue-500 pl-2 pr-7 h-[3rem]"
        :type="isVisible?'text':'password'"
        :placeholder="placeholder"
        v-model="value"
      />
      <component :is="icons" class="w-[16px]  border-[0.01px] h-4 text-primary hover:opacity-90 cursor-pointer absolute bottom-[23%] right-1 " @click="showPassword"></component>
      <span class="text-red-900 absolute -bottom-1 text-xs bg-white px-2 right-1">{{
        errorMessage
      }}</span>
    </div>
  </div>
</template>
