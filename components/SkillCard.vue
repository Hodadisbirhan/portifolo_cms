<script setup>
import { TrashIcon,PencilIcon } from '@heroicons/vue/solid'; 
const  props = defineProps({
level:Number,
id:Number,
name:String

})

const emits = defineEmits(['delete','edit']);
const deleteIt =(id)=>{
    emits('delete',id);
} 
const editIt = ()=>{

    emits('edit',{...props});

}

const remainingLevel = computed(()=>{

return `width:${100-props.level}%`;

})

const filledLevel = computed(()=>{

return `width:${props.level}%`;

})
</script>
<template>
    <div class="flex flex-col gap-10 py-2 px-3 bg-slate-50 border border-white rounded-md">
<div class="flex flex-row gap-2 items-center">
    <p class="text-primary text-xs">{{name}}</p>
    <div class=" flex flex-row w-full  gap-0">
        <div class="bg-primary h-[0.6rem] rounded-l-lg " :style="filledLevel"></div>
        <div class="bg-body h-[0.6rem] rounded-r-lg" :style="remainingLevel"></div>
    </div>
    <span class="text-primary text-xs">{{level}}%</span>


</div>
<div class="flex w-full justify-center gap-10">


            <v-button-with-icon @click="deleteIt(props.id)" class="w-[6rem] bg-primary hover:opacity-90 text-white  px-3" value="Delete" :icon="TrashIcon"/>
             <v-button-with-icon @click="editIt" class="w-[6rem]  border-[1px] border-primary text-primary px-3 hover:bg-primary hover:text-white" value="Edit" :icon="PencilIcon"/>
             </div>

    </div >
</template>
