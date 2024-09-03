<script setup>
import { computed } from "vue";
import { usePokemonStore } from "@/stores/pokemonStore";
import ListComponent from "@/components/molecules/ListComponent.vue";

const store = usePokemonStore();

const favoritePokemons = computed(() => {
  return store.pokemons.filter((pokemon) =>
    store.favorites.includes(pokemon.name)
  );
});
</script>

<template>
  <div class="p-4">
    <div v-if="favoritePokemons.length === 0">no favs yettt</div>
    <div v-else>
      <div v-for="pokemon in favoritePokemons" :key="pokemon.name">
        <ListComponent :pokemon="pokemon" />
      </div>
    </div>
  </div>
</template>