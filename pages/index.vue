<script setup></script>
<template>
  <div
    class="flex md:flex-row flex-col gap-14 md:gap-0 justify-center items-center w-full h-[100vh] min-h-[32rem]"
  >
    <div
      class="flex flex-col justify-center md:rounded-l-md md:drop-shadow-md items-center max-w-xs w-full sm:w-[22rem] md:bg-primary bg-body md:h-[25rem] h-auto"
    >
      <img src="/myLogo.png" class="w-20 h-14 object-cover object-center" alt="logo" />
      <h3 class="text-primary md:text-white">HODADIS BIRHAN</h3>
    </div>
    <div
      class="sm:w-[24rem] sm:max-w-none w-full bg-slate-50 drop-shadow-md rounded-md md:rounded-r-md md:rounded-l-none max-w-[26rem] px-4 h-[25rem]"
    >
      <NuxtPage></NuxtPage>
    </div>
  </div>
</template>
