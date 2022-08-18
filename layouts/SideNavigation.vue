<script setup>
import {
  UserCircleIcon,
  ChevronDownIcon,KeyIcon,
  AcademicCapIcon,
  CogIcon,
  CollectionIcon,
  CubeIcon,
} from "@heroicons/vue/solid";

import { LogoutIcon } from "@heroicons/vue/outline";

const title = ref("Profile");

const sideNavigationList = ref([
  { id: 1, name: "Admin_dashboard-index", value: "Profile", icon: UserCircleIcon },
  { id: 2, name: "Admin_dashboard-project", value: "Project", icon: CollectionIcon },
  { id: 3, name: "Admin_dashboard-service", value: "Service", icon: CubeIcon },
  { id: 4, name: "Admin_dashboard-skill", value: "Skill", icon: AcademicCapIcon },
  { id: 5, name: "Admin_dashboard-setting", value: "Setting", icon: CogIcon,},
  {id:6,name:"Admin_dashboard-changePassword", value:"Password" ,icon:KeyIcon}
]);
const router = useRoute();
const titleheader = computed(() => {

  if (router.name === "Admin_dashboard-index-experience") {
    return "Experience";
  } else if (router.name === "Admin_dashboard-index-education") {
    return "Education";
  } else if (router.name === "Admin_dashboard-index") {
    return "Profile";
  } else return router.name.toString().split("-")[1];
});


const activeNavigationLink = ref(router.name);
const navigationLinkFunc = (value) => {
  activeNavigationLink.value = value;
};
const showProfile = ref(false);
const profileShow = () => {
  showProfile.value = !showProfile.value;
};
const hiddProfile = () => {
  showProfile.value = false;
};

const accessToken = useCookie("accessToken");
const emailref= ref('');
const statusref=ref('')
if(process.client&&accessToken.value)
{
    
   const adminInfo = window.atob(accessToken.value.split('.')[1]);
   const {email,role} = JSON.parse(adminInfo); 
emailref.value = email;
statusref.value = role
}
const computedEmail= computed(()=>{

  return emailref.value;
})
const computedStatus = computed(()=>{
  return statusref.value;
})


const logout = () => {
accessToken.value=null;
useRouter().replace("/");
};

const computedNavList = computed(()=>{
if(computedStatus.value ==="Admin")
{

return sideNavigationList.value;

}
else
return sideNavigationList.value.slice(0,4)
  
})
watchEffect(()=>{
computedEmail.value
computedNavList.value
computedStatus.value;
})
</script>
<template>
  <div class="bg-body w-full">
    <header
      class="flex z-10 flex-row  justify-between items-center bg-body left-0 pl-[3.6rem] sm:pl-[13rem] 2xl:pl-[18rem] shadow-md xs:pr-3 pr-2 fixed w-full h-14 top-0"
    >
      <h1 class="text-xl capitalize text-title font-semibold">
        {{ titleheader }}
      </h1>
      <div class="flex items-center hover:cursor-pointer group" @click="profileShow">
        <UserCircleIcon class="h-6 w-6 text-primary group-hover:opacity-80" />
        <ChevronDownIcon
          class="h-4 w-4 text-primary group-hover:opacity-80"
          :class="{ 'rotate-180': showProfile }"
        />
      </div>
    </header>
    <div
      class="h-screen flex flex-col gap-6 w-[3rem] sm:w-[12rem] 2xl:w-[17rem] overflow-y-auto text-white bg-primary fixed top-0 pt-[3rem] z-40 left-0"
    >
      <img
        src="/myLogo.png"
        class="sm:w-[5rem] sm:pl-5 sm:h-[5rem] 2xl:mx-9 w-[3rem] h-[3rem] object-contain object-center"
        alt="logo"
      />
      <nav
        class="flex flex-col min-h-[20rem] h-[70%] w-full gap-[1.5625rem] sm:px-3 lg:px-4 2xl:px-9 px-1"
      >
        <NuxtLink 
          v-for="link in computedNavList"
          @click="navigationLinkFunc(link.name)"
          :key="link.id"
          :to="{ name: link.name }"
          :class="{ 'bg-activeNavLinkColor': activeNavigationLink.includes(link.name) }"
          class="flex flex-row gap-[0.9375rem] py-[0.31rem] sm:py-[0.5125rem] justify-center sm:justify-start items-center sm:pl-5 rounded-md hover:bg-activeNavLinkColor"
          :title="link.value"
        >
          <component :is="link.icon" class="text-slate-200 w-5 h-5"></component>
          <span class="hidden  text-slate-200 text-sm sm:block">{{ link.value }}</span>
        </NuxtLink>
      </nav>
      <NuxtLink
        @click="logout"
        class="flex flex-row hover:cursor-pointer bg-activeNavLinkColor gap-2 justify-center items-center py-3"
        ><span class="text-slate-200 sm:block hidden text-xs">Logout</span>
        <LogoutIcon class="w-6 h-6 text-white" />
      </NuxtLink>
    </div>

    <div
      class="mt-[3.5rem] min-h-[calc(100vh-3.5rem)] sm:ml-[13rem] 2xl:ml-[18rem] ml-[3.6rem] pb-3"
    >
      <slot></slot>
    </div>
    <div
      :class="showProfile ? 'scale-100' : 'scale-0'"
      class="w-[12rem] bg-slate-50 border border-white duration-150 rounded-md justify-center items-center drop-shadow-2xl fixed top-16 shadow-black px-3 right-4 z-40 py-3 flex flex-col"
    >
      <h1 class="font-medium text-title">{{ computedStatus }}</h1>
      <p class="text-xs truncate text-bodyText">{{ computedEmail }}</p>
      <v-button-solid class="w-16" @click="logout" value="LogOut" />
    </div>
  </div>
</template>
