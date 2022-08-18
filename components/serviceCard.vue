<script setup>
import { TrashIcon,PencilIcon } from '@heroicons/vue/solid'; 
const props = defineProps({

    title:{type:String},
    description:{type:String},
    year:Number,
    satisfied_cleint:Number,
    image:{
        type:String
    },
    id:Number
})

const emits = defineEmits(["edit",'delete']);
const emitForEdit=()=>{
emits('edit')

}
const emitForDelete=(id)=>{
emits('delete',id);

}



</script>

<template><div class="flex flex-col drop-shadow-sm bg-slate-50 border border-white xs:px-2 px-1 py-2 rounded-md gap-2">
    
<div class="flex xs:flex-row gap-3  flex-col  items-center">
    <div class="min-w-[4rem] min-h-[4rem] w-16 h-16"><img :src="image" :alt="title" class="object-contain object-center  h-full"/></div>

<div class="flex flex-col gap-4">
    <h1 class="text-title  font-semibold">{{title}}</h1>
    <p class="text-[0.7rem] text-bodyText">{{description}}</p>
    <div class="flex flex-row gap-3 text-[0.6rem] text-bodyText">
<span class="">{{year}} year experience </span>
<span class="">{{satisfied_cleint}} client satisfied</span>

    </div>

</div>

</div>
<div class="flex w-full flex-row-reverse justify-center gap-10">


            <v-button-with-icon class="xs:w-[7rem]  py-1 px-3 border-[1px] border-primary text-primary  hover:bg-primary hover:text-white" value="Delete" :icon="TrashIcon" @click="emitForDelete(id)"/>
             <NuxtLink class="h-fit"  :to="{name:`Admin_dashboard-service-serviceForm`,params:{id},query:{id:id}}">
<v-button-with-icon @click="emitForEdit" class=" xs:w-[7rem] px-3  py-1 bg-primary hover:opacity-90 text-white  " value="Edit" :icon="PencilIcon"/>
         

             </NuxtLink>
                 </div>

    
    </div></template>