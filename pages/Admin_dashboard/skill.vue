<script setup>
import { PlusIcon, SearchIcon,ArrowLeftIcon,ArrowRightIcon } from "@heroicons/vue/solid";
import { deleteSkill } from "~~/gql/mutation";
import { useMutation, useQuery } from "@vue/apollo-composable";
import { fetchSkills ,fetchSkill} from "@/gql/query";
definePageMeta({
  layout: "side-navigation",
  middleware: "navgaurd",
});
useHead({ title: "Skill" });
const search = ref('');
const offset = ref(0);
const variables =computed(()=>{
  if(search.value.trim() !=='')
  return { search: search.value.trim(),id:userID().value,offset:0, }
else
 return {search: search.value.trim(),id:userID().value,offset:offset.value}
}) ;

const { result,fetchMore, loading} = useCustomeQuery(fetchSkill, variables,500
);
const skills = computed(() => {
  console.log(result.value);
  return result.value?.users_by_pk.skills;

});

const computedNumberofTerms=computed(()=>{
if(result.value?.users_by_pk.number_skill>0)
  return Math.ceil(result.value?.users_by_pk.number_skill/10);
})
const skill_id = ref();

const { mutate,onDone:deleteSkillCompleted,onError:deleteSkilError } = useMutation(deleteSkill);
const forAddSkill = ref(false);
const forEditSkill = ref(false);
const valueForEdited = ref({});
const taskType = ref("");
const changeForAddSkill = () => {
  taskType.value = "update";
  forAddSkill.value = !forAddSkill.value;
};
const showChange = () => {
 fetchMore({variables:{}})
  forAddSkill.value = false;
  forEditSkill.value = false;
};
const changeForEditSkill = (value) => {
  valueForEdited.value = value;
  taskType.value = "Edit";
  forEditSkill.value = !forEditSkill.value;
};
const closePopUp = () => {
  forAddSkill.value = false;
  forEditSkill.value = false;
};
const computedLoading = computed(() => {
  return loading.value;
});
watchEffect(() => {
  computedLoading.value;
  skills.value;

});
const isDeleteModalVisible = ref(false);
const deleteIt = (value) => {
  if (value === "yes" && skill_id.value) {
    mutate({ id: skill_id.value })
  }

  isDeleteModalVisible.value = false;
};
deleteSkillCompleted((res)=>{
 if (res.data.delete_skills_by_pk.id) {
  
      fetchMore({variables:{}});
      }
})

const showDelete = (id) => {
  isDeleteModalVisible.value = !isDeleteModalVisible.value;
  skill_id.value = id;
};
const currentPosition = ref(1);
const nextShow = (i)=>{
  currentPosition.value = i;
offset.value= 10*(i-1)

}
const previous = ()=>{
currentPosition.value = currentPosition.value-1;
offset.value = 10*(currentPosition.value-1);

}
const next = ()=>{
currentPosition.value = currentPosition.value+1;
offset.value = 10*(currentPosition.value-1);

}



</script>

<template>
  <div class="flex flex-col pr-3 gap-10 py-9">
    <div class="flex flex-col-reverse xs:items-start xs:flex-row gap-6 w-full">
      <div class="relative flex-1">
        <input
          type="text"
          v-model="search"
          placeholder="Search..."
          class="w-full h-[3rem] pl-7 text-sm rounded-md bg-slate-50 outline-none hover:border-blue-300 focus:border-blue-300 border-[1px]"
        />

        <SearchIcon class="absolute left-1 top-[30%] w-6 h-5 text-slate-300" />
      </div>
      <v-button-with-icon
        @click="changeForAddSkill"
        value="Add Skill"
        :icon="PlusIcon"
        class="py-3 text-white bg-primary w-[10rem] px-2 xs:px-6"
      />
    </div>
    <div v-if="computedLoading" class="text-lg w-full text-center">Loading</div>
    <div v-else-if="skills && skills.length < 1" class="text-lg w-full text-center">
      No Result
    </div>

    <div v-else-if="skills" class="grid lg:grid-cols-2 grid-cols-1 xl:grid-cols-3 gap-10">
      <skill-card
        @delete="showDelete"
        @edit="changeForEditSkill"
        v-for="item in skills"
        :key="item"
        v-bind="item"
      />
    </div>
    <div
      :class="forAddSkill ? 'scale-1 bg-black/30' : 'scale-0 bg-none'"
      class="transition-colors duration-500 flex justify-center items-center fixed top-0 left-0 z-40 w-[100vw] h-[100vh]"
    >
      <div
        :class="forAddSkill ? 'scale-1' : 'scale-0'"
        class="duration-500 w-full flex justify-center items-center h-[100vh] transition-all"
      >
        <v-form-skill
          @show-change="showChange"
          taskType="Add"
          v-if="forAddSkill"
          class=""
          @close="closePopUp"
        />
      </div>
    </div>
    <div
      :class="forEditSkill ? 'scale-1  bg-black/30' : 'scale-0 bg-none'"
      class="transition-colors duration-500 flex justify-center items-center fixed top-0 left-0 z-40 w-[100vw] h-[100vh]"
    >
      <div
        :class="forEditSkill ? 'scale-1' : 'scale-0'"
        class="duration-500 w-full flex justify-center items-center transition-all"
      >
        <v-form-skill
          @show-change="showChange"
          taskType="Edit"
          v-if="forEditSkill"
          v-bind="valueForEdited"
          @close="closePopUp"
        />
      </div>
    </div>
    <div
      @click.self="showDelete"
      :class="isDeleteModalVisible ? 'bg-black/25 scale-100' : 'bg-black/0 scale-0'"
      class="flex duration-300 transition-colors flex-row fixed justify-center items-center top-0 left-0 z-40 w-[100vw] h-[100vh]"
    >
      <delete-model
        :class="isDeleteModalVisible ? 'scale-100' : ' scale-0'"
        @is-delete="deleteIt"
      />

    </div>
    <div v-if="computedNumberofTerms>1 " class="flex w-full justify-evenly font-semibold px-3 pt-3 ">
    <button @click="previous()" :disabled="offset===0" class="text-xs disabled:opacity-50 text-primary items-center flex gap-2"> <ArrowLeftIcon class="w-3 h-2 "/> Previous</button>
    <div class="flex gap-2" v-if="computedNumberofTerms<=5">
    <button @click="nextShow(i)" :class="{'text-lg underline':i==currentPosition}" v-for="i in computedNumberofTerms" :key="i">{{i}}</button>
    </div>
    <div class="flex gap-2" v-if="computedNumberofTerms>5">
    <span  v-for="i in computedNumberofTerms" :key="i">{{i===computedNumberofTerms||i<=2?i:"."}}</span>
    </div>
     <button @click="next()" :disabled="offset===computedNumberofTerms*10-10" class="text-xs disabled:opacity-50 text-primary items-center flex gap-2">Next <ArrowRightIcon class="w-3 h-2"/> </button>
     
      </div>
  </div>
</template>
