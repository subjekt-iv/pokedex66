

<script setup>
import { ref, defineEmits } from "vue";
import CustomButton from "@/components/atoms/CustomButton.vue";

const activeFilter = ref("all");
const emit = defineEmits(["filterChange"]);

function buttonClasses(type) {
  const baseClasses =
    "w-72 lg:w-96 h-12 px-4 py-2 font-medium rounded-full text-white";
  const activeClasses = "bg-[#F22539]";
  const inactiveClasses = "bg-[#BFBFBF]";

  return `${baseClasses} ${
    activeFilter.value === type ? activeClasses : inactiveClasses
  }`;
}

function showAll() {
  activeFilter.value = "all";
  emit("filterChange", "all");
}

function showFavorites() {
  activeFilter.value = "favorites";
  emit("filterChange", "favorites");
}
</script>

<template>
  <div
    class="fixed bottom-0 left-0 right-0 bg-white p-4 flex justify-center gap-8 items-center shadow-md"
  >
    <CustomButton
      label="All"
      imgSrc="../assets/list.png"
      :buttonClasses="buttonClasses('all')"
      @click="showAll"
    />
    <CustomButton
      label="Favorites"
      imgSrc="../assets/star.png"
      :buttonClasses="buttonClasses('favorites')"
      @click="showFavorites"
    />
  </div>
</template>

<style scoped>
.shadow-md {
  box-shadow: 0 2px 18px rgba(0, 0, 0, 0.1);
}
</style>
