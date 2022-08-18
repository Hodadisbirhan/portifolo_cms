<script setup>
import { useField } from "vee-validate";

const props = defineProps({
  rule: { type: String },
  placeholder: { type: [String, Number] },
  name: { type: String, required: true },
  label: { type: String },
  type: { type: [String, Number, Object], required: true },
  id: { type: String },
  modelValue: { type: [String, Object, Array, Function, Number] },
});

const { value, errorMessage } = useField(props.name, props.rule);

if (props.modelValue) {
  value.value = props.modelValue;
}
</script>
<template>
  <div class="flex flex-col gap-1 w-full">
    <label class="text-sm font-bold px-2 text-primary" :for="id">{{ label }}</label>
    <div class="relative w-full">
      <input
        :id="id"
        class="w-full rounded-md outline-none border-[1px] bg-slate-50 hover:border-blue-500 border-slate-500 text-xs placeholder:text-xs focus:border-blue-500 px-2 h-[3rem]"
        :type="type"
        :placeholder="placeholder"
        v-model="value"
      />

      <span class="text-red-900 absolute -bottom-1 text-xs bg-white px-2 right-1">{{
        errorMessage
      }}</span>
    </div>
  </div>
</template>
