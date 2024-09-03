<script setup>
import { ref, computed, onMounted } from "vue";
import { usePokemonStore } from "@/stores/pokemonStore";
import { storeToRefs } from "pinia";
import ListComponent from "@/components/molecules/ListComponent.vue";
import CustomSpinner from "@/components/atoms/CustomSpinner.vue";
import ModalComponent from "@/components/molecules/ModalComponent.vue";

const store = usePokemonStore();
const { pokemons, loading } = storeToRefs(store);

onMounted(() => {
  store.fetchPokemons();
});

const searchQuery = ref("");

const filteredPokemons = computed(() => {
  if (!searchQuery.value) {
    return pokemons.value;
  }
  return pokemons.value.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});
</script>

<template>
  <div>
    <div class="mb-4">
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Search Pokémon"
        class="p-2 border rounded w-full"
      />
    </div>

    <div
      v-if="loading"
      class="fixed inset-0 flex justify-center items-center bg-white bg-opacity-75 z-50"
    >
      <CustomSpinner />
    </div>

    <div v-else-if="filteredPokemons.length === 0" class="text-center p-4">
      <p class="text-lg font-semibold">Uh-Oh! No Pokémon found.</p>
      <router-link
        to="/"
        class="mt-4 inline-block px-4 py-2 bg-blue-500 text-white rounded"
      >
        Go Backkkk
      </router-link>
    </div>

    <div v-else class="grid grid-cols-1 gap-4">
      <ListComponent
        v-for="pokemon in filteredPokemons"
        :key="pokemon.name"
        :pokemon="pokemon"
      />
    </div>

    <ModalComponent
      v-if="store.showModal"
      :pokemon="store.modalPokemon"
      :show="store.showModal"
      @close="store.closeModal"
    />
  </div>
</template>
