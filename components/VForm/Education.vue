<script setup>
import {XCircleIcon} from "@heroicons/vue/outline";
import { useForm } from "vee-validate";
import { useMutation,useQuery } from "@vue/apollo-composable";
import {addEducation,updateEducation} from "@/gql/mutation"
const userId = userID();
const props = defineProps({

    name:String,
    description:String,
    id:Number,
    taskType:String
})

const emits = defineEmits(['close','changeNotify']);
function close(){
emits('close');


}

const {mutate:addEducationById,onDone:addEducationCompleted} = useMutation(addEducation);
const {mutate:editEducation,onDone:editEducationCompleted} = useMutation(updateEducation);

const whatTodo = computed(()=>{
    if(props.taskType==="Edit")
    {
        return {button1:"Update",button2:"Reset"}
    }
    return {button1:"Add",button2:"Clear"};
})
const title = computed(()=>{
    if(props.taskType==="Edit")
    {
        return "Edit Education"
    }
    return "Add Education";
})



const {handleSubmit,setValues,resetForm} = useForm();

    setValues({school_name:props.name,description:props.description});


const submit = handleSubmit((value)=>{

if(props.taskType==="Edit")
{

editEducation({name:value.school_name,id:props.id,description:value.description})

}
else{
addEducationById({name:value.school_name,description:value.description,user_id:userId.value})


}

})
addEducationCompleted((res)=>{
    
    if(res.data){

        emits("changeNotify");
    }
})
editEducationCompleted((res)=>{
    
   emits("changeNotify"); 
})


</script>
<template>
<form @submit.prevent="submit" class="flex relative flex-col gap-3 bg-slate-50 px-4 justify-center rounded-md py-6 items-center sm:w-[65%] xs:w-[75%] w-[95%]  lg:w-[40%]">
<x-circle-icon class="absolute top-1 right-1 w-8 h-6 text-primary hover:cursor-pointer hover:opacity-80" @click="close"/>
    <h2 class="text-title text-xl font-semibold">{{title}}</h2>
<field-v-input-field type="text"  rule="required"  name="school_name" label="School Name" placeholder="School Name e.g Mankussa"/> 
<field-v-text-area  rule="required" name="description"  label="Description" placeholder="Your history on this School"/>
    <div class="w-full justify-center items-center flex gap-4 "><v-button-solid type="submit" class="  px-2  xs:w-[10rem]" :value="whatTodo.button1"/>
 <v-button-out-line type="button" class=" w-[5rem] xs:w-[10rem]" :value="whatTodo.button2" @click="resetForm()" /> </div>
</form>
</template>
