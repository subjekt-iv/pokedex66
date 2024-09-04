<script setup>
import { useRouter } from "vue-router";
import { defineEmits, defineProps } from "vue";

const props = defineProps({
  label: {
    type: String,
    required: true,
  },
  route: {
    type: String,
    required: false,
    default: null,
  },
  buttonClasses: {
    type: String,
    default:
      "bg-[#F22539] mt-8 text-white px-4 py-2 font-medium rounded-full flex items-center justify-center",
  },
  imgSrc: {
    type: String,
    default: "",
  },
});

const emit = defineEmits(["click"]);
const router = useRouter();

function handleClick() {
  if (props.route) {
    router.push(props.route);
  } else {
    emit("click");
  }
}
</script>

<template>
  <button @click="handleClick" :class="buttonClasses">
    <div class="flex items-center justify-center">
      <template v-if="imgSrc">
        <img :src="imgSrc" alt="" class="mr-2 w-6 h-6" />
      </template>
      <span class="mt-1">{{ label }}</span>
    </div>
  </button>
</template>
