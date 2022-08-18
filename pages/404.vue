<script setup>
const router = useRouter(); 
function toHome(){
router.replace({path:'/'});
}


</script>
<template>

<div class="w-full text-primary flex justify-center gap-2  flex-col items-center bg-white h-[100vh]">
<h1 class="text-4xl">404</h1>
<span class="text-2xl">PAGE NOT FOUND</span>
<button @click="toHome()" class="w-[10rem] py-2 drop-shadow-md bg-primary text-white  rounded-md">Back To Home</button>


</div>

</template>