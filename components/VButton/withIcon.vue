<script setup>
const props = defineProps({

    value:{type:String},
    type:{type:String,default:"button"},
    icon:{type:[Object,Function]}


})
</script>
<template>
<button class="text-xs rounded-md justify-center items-center flex flex-row gap-1" :type="type"><component :is="props.icon" class="w-[1rem] h-[1.2rem]"></component><span >{{value}}</span></button>

</template>