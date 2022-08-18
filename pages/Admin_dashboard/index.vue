<script setup>
definePageMeta({
  layout: "side-navigation",
  middleware: "navgaurd",
});
const router = useRoute();
const activeNavLink = ref(router.name);
const navigationLinkFunc = (value) => {
  activeNavLink.value = value;
};

const navigationList = ref([
  { name: "Admin_dashboard-index", value: "Basic Panel" },
  { name: "Admin_dashboard-index-education", value: "Education Panel" },
  { name: "Admin_dashboard-index-experience", value: "Experience Panel" },
]);
</script>
<template>
  <div class="flex flex-col gap-3 pt-[2.2rem]">
    <nav class="flex flex-row gap-6 overflow-x-auto pb-6 pr-3">
      <NuxtLink
        @click="navigationLinkFunc(link.name)"
        v-for="link in navigationList"
        :key="link.name"
        :class="
          activeNavLink === link.name
            ? 'before:left-0 before:right-0 '
            : 'before:right-[50%] before:left-[50%]'
        "
        class="relative text-primary whitespace-nowrap font-semibold before:content-[''] hover:before:left-0 hover:before:right-0 before:duration-300 before:absolute before:-bottom-1 before:bg-primary before:h-[0.15625rem]"
        :to="{ name: link.name }"
      >
        {{ link.value }}</NuxtLink
      >
    </nav>

    <NuxtPage> </NuxtPage>
  </div>
</template>
