<script setup>
const props = defineProps({
    type:{type:String,default:"button"},value:String,isLoading:{type:[Boolean]}
})


</script>
<template>
<button :type="type" class="rounded-md text-xs py-2 bg-primary text-white hover:opacity-80 flex gap-1 justify-center items-center "><waitLoadshow class="w-6 h-6" v-if="isLoading"/>  {{value}} </button>

</template>