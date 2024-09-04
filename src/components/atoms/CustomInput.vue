<script setup>
import { ref, defineEmits, watch, defineProps } from "vue";
import CustomImage from "@/components/atoms/CustomImage.vue";

const props = defineProps({
  modelValue: String,
  imageSrc: {
    type: String,
    required: true,
  },
});

const emit = defineEmits(["update:modelValue"]);

const searchQuery = ref(props.modelValue);

watch(searchQuery, (newValue) => {
  emit("update:modelValue", newValue);
});
</script>

<template>
  <div class="relative mb-4">
    <CustomImage
      :src="imageSrc"
      alt="Search Icon"
      imgClasses="absolute top-1/2 transform -translate-y-1/2 left-3 w-5 h-5"
    />
    <input
      v-model="searchQuery"
      type="text"
      placeholder="Search"
      class="pl-10 p-2 text-gray-800 placeholder-[#BFBFBF] font-medium border rounded w-full"
    />
  </div>
</template>
