<script setup>
import {ExclamationIcon} from "@heroicons/vue/outline"
const show = ref(true);

const emits = defineEmits(['isDelete']);
const  deleteIt =(value)=>{
   
    emits('isDelete',value);
}
</script>
<template>
<div  class="flex duration-300 flex-row bg-slate-50 border border-white  py-6 px-7 gap-5 xs:w-fit w-[95%] items-center rounded-md ">
         <ExclamationIcon class="w-10 h-10 text-red-900"/>
<div class="flex flex-col gap-5">
   
    <h2 class="text-red-900 font-medium" >Are You Sure To Delete IT?</h2>
    <div class="flex flex-row gap-5 w-full justify-end"> <v-button-solid class="px-5 h-[2rem] " @click="deleteIt('yes')" value="Yes"/> <v-button-out-line @click="deleteIt('no')" class="px-5 h-[2rem] " value="No"/>  </div>
</div>
    </div>
   
</template>