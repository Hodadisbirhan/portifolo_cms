<script setup>
import { CodeIcon, LinkIcon, TrashIcon, PencilIcon } from "@heroicons/vue/solid"
import { CalendarIcon } from "@heroicons/vue/outline"
const props = defineProps({
    title: { type: [String], required: true },
    description: { type: [String], required: true },
    date: { type: [String], required: true },
    link: String,
    size: { type: [Number] },
    image: { type: [String] },
    id:Number

})
const emits = defineEmits(['delete'])
function deleteProject(id){

emits('delete',id);

}
const sizeCalculation = computed(() => {
    if (props.size && props.size >= 1000) {

        return Math.round((props.size + Number.EPSILON)) / 1000 + "k"
    }
    else
        return props.size

})


</script>
<template>

    <div class="flex flex-col  gap-5 w-full py-3 bg-slate-50 drop-shadow-sm border border-white rounded-md px-3">


        <div class="flex w-full flex-col xs:flex-row gap-3 ">
            <div class="2xl:min-w-[9.999rem] 2xl:w-[9.999rem] flex justify-center items-center  w-full bg-slate-50 xs:w-[6rem] xs:min-w-[6rem]  lg:w-[8rem]  lg:min-w-[8rem]  h-[6rem] sm:h-auto   "><img
                    class=" object-fill rounded-sm aspect-square w-full   h-[6rem] object-center" :src="image" :alt="title" /></div>

            <div class="flex flex-col gap-5 w-full">
                <h1 class="text-title   font-semibold ">{{title}}</h1>
                <p class="text-[0.8rem] text-bodyText line-clamp-2 ">{{description}}</p>

                
                <div class="flex flex-row md:gap-6 gap-3">
                    <div class="flex flex-row gap-1">
                        <CalendarIcon class="w-[1.125rem] text-primary h-[0.875rem]" />
                        <p class="text-[0.625rem] text-bodyText">{{date}} </p>
                    </div>
                    <div class="flex flex-row gap-1">
                        <CodeIcon class="w-[1.125rem] text-primary h-[0.875rem]" />
                        <p class="text-[0.625rem] text-bodyText">{{ sizeCalculation }} lines</p>
                    </div>
                    <div class="flex flex-row gap-1">
                        <LinkIcon class="w-[1.125rem] text-primary h-[0.875rem]" />
                        <a :href="link" target="_blanck" class="text-[0.625rem] hover:text-blue-700 text-bodyText">See Project</a> 
                    </div>
                </div>

            </div>

        </div>
        <div class="flex w-full justify-center flex-row-reverse gap-10">


            <v-button-with-icon class="xs:w-[7rem] w-20 border-[1px] text-primary border-primary hover:text-white hover:bg-primary   py-1 px-3" value="Delete"
                :icon="TrashIcon" @click="deleteProject(id)"
                 />

            <NuxtLink class="" :to="{ name: `Admin_dashboard-project-projectForm`, query:{id:id} }">
                <v-button-with-icon
                    class="xs:w-[7rem] w-20 py-1 text-white  px-3  bg-primary hover:opacity-90  "
                    value="Edit" :icon="PencilIcon" />
            </NuxtLink> 
        </div>

    </div>

</template>