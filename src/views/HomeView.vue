<script setup>
import CustomButton from "@/components/atoms/CustomButton.vue";
import CustomImage from "@/components/atoms/CustomImage.vue";
</script>

<template>
  <div
    class="flex flex-col justify-center items-center px-4 py-8 md:px-8 lg:px-12"
  >
    <div class="w-[80%] max-w-[325px] h-[288px]">
      <CustomImage
        src="../assets/pikachu.png"
        alt="pikachu"
        class="w-full h-full object-contain"
      />
    </div>
    <h1 class="mt-8 text-[22px] md:text-[26px] font-bold text-center">
      Welcome to Pokédex
    </h1>
    <p class="mt-8 text-center">
      The digital encyclopedia created by Professor Oak is an invaluable tool
      <br class="hidden md:block" />
      to Trainers in the Pokémon world.
    </p>
    <CustomButton class="mt-8" label="Get Started" :route="'/list'" />
  </div>
</template>
