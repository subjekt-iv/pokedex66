<script setup>
import { defineProps, defineEmits } from "vue";

const props = defineProps({
  src: {
    type: String,
    required: true,
  },
  alt: {
    type: String,
    default: "",
  },
  imgClasses: {
    type: String,
    default: "",
  },
  clickEnabled: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["click"]);

const handleClick = () => {
  if (props.clickEnabled) {
    emit("click");
  }
};
</script>

<template>
  <img
    :src="src"
    :alt="alt"
    :class="imgClasses"
    @click="handleClick"
    :style="clickEnabled ? 'cursor: pointer;' : ''"
  />
</template>
