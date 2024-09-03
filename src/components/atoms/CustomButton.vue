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
    default: "bg-red-500 mt-8 text-white px-4 py-2 font-medium rounded-full",
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
    {{ label }}
  </button>
</template>




