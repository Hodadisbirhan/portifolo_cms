<script setup>
const props = defineProps({
    type:{type:String,default:"button"},value:String
})

</script>
<template>
<button :type="type" class="rounded-md hover:bg-primary hover:text-white text-xs py-2 border-[1px] border-primary text-primary">{{value}}</button>
</template>
