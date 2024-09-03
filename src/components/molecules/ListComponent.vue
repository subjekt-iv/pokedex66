<script setup>
import { computed, defineProps } from "vue";
import { usePokemonStore } from "@/stores/pokemonStore";
import CustomImage from "@/components/atoms/CustomImage.vue";
import favIcon from "../../../public/assets/fav.png";
import nonFavIcon from "../../../public/assets/nonfav.png";

const props = defineProps({
  pokemon: Object,
});

const store = usePokemonStore();

const isFavorite = computed(() =>
  store.favorites.some((fav) => fav.name === props.pokemon.name)
);

function toggleFavorite(event) {
  event.stopPropagation();
  if (isFavorite.value) {
    store.removeFavorite(props.pokemon);
  } else {
    store.addFavorite(props.pokemon);
  }
}

function openModal() {
  store.fetchPokemonDetails(props.pokemon.name);
}
</script>

<template>
  <div
    class="border p-4 rounded-lg flex justify-between cursor-pointer"
    @click="openModal"
  >
    <div class="flex justify-center items-center">
      <h2 class="text-lg font-semibold">{{ pokemon.name }}</h2>
    </div>
    <div class="flex items-center">
      <div @click.stop="toggleFavorite">
        <CustomImage
          :src="isFavorite ? favIcon : nonFavIcon"
          alt="Favorite Icon"
          class="w-8 h-8 cursor-pointer"
        />
      </div>
    </div>
  </div>
</template>
