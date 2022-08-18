<script setup>
import {XCircleIcon} from "@heroicons/vue/outline";
import {insertSkill,updateSkillById} from "@/gql/mutation";
import { useMutation } from "@vue/apollo-composable";
import { useForm } from "vee-validate";
const props = defineProps({
    name:String,
    id:Number,
    level:{type:[Number,String],default:0},
    taskType:String
})
const emits = defineEmits(['close','showChange']);
function close(){
emits('close');
}
const {mutate:addSkill,onDone:addSkillCompleted} =useMutation(insertSkill);
const {mutate:updateSkill,onDone:updateSkillCompleted} = useMutation(updateSkillById)
const whatTodo = computed(()=>{
    if(props.taskType==="Edit")
    {
        return "Update"
    }
    return "Add";
})
const title = computed(()=>{
    if(props.taskType==="Edit")
    {
        return "Edit Skill"
    }
    return "Add Skill";
})
const {handleSubmit,setFieldValue} = useForm();
setFieldValue("name",props.name);
const submit = handleSubmit((value)=>{
    if(props.taskType==="Edit")
    {
updateSkill({name:value.name,level:props.level,id:props.id});
    }
    else
    {
addSkill({name:value.name,level:props.level,user_id:"6807e331-fecd-46ee-b3fd-108a67ab8322"})

    }

})


updateSkillCompleted((res)=>{
emits('showChange');
})
addSkillCompleted((res)=>{
    emits('showChange');
})




</script>
<template>
<form @submit.prevent="submit" class="flex relative flex-col gap-6 bg-slate-50 px-4 justify-center rounded-md py-6 items-center sm:w-[65%] xs:w-[75%] w-[95%]  lg:w-[40%]">
<x-circle-icon class="absolute top-1 right-1 w-8 h-6 text-primary hover:cursor-pointer hover:opacity-80" @click="close"/>
    <h2 class="text-title text-xl font-semibold">{{title}}</h2>
<field-v-input-field type="text"  rule="required"  name="name" label="Skill Name" placeholder="Skill Name e.g vujs"/> 
<div class="flex gap-1 w-full items-center">
<input type="range"  class="w-full h-2 accent-activeNavLinkColor appearance-none bg-primary"  v-model="level" name="level" label="Label" /> <span class="text-primary text-sm ">{{level}}%</span> </div>
    <div class="w-full justify-center items-center flex gap-4 "><v-button-solid type="submit" class="  px-2  xs:w-[10rem]" :value="whatTodo"/>
</div>
</form>
</template>
