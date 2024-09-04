<script setup>
import { ref, computed, onMounted } from "vue";
import { usePokemonStore } from "@/stores/pokemonStore";
import { storeToRefs } from "pinia";
import ListComponent from "@/components/molecules/ListComponent.vue";
import CustomSpinner from "@/components/atoms/CustomSpinner.vue";
import CustomButton from "@/components/atoms/CustomButton.vue";
import ModalComponent from "@/components/molecules/ModalComponent.vue";
import BottomBarComponent from "@/components/molecules/BottomBarComponent.vue";
import SearchInput from "@/components/atoms/CustomInput.vue";

const store = usePokemonStore();
const { pokemons, loading } = storeToRefs(store);

onMounted(() => {
  store.fetchPokemons();
});

const filterType = ref("all");

const filteredPokemons = computed(() => {
  if (filterType.value === "favorites") {
    return pokemons.value.filter((pokemon) =>
      store.favorites.some((fav) => fav.name === pokemon.name)
    );
  }
  return pokemons.value;
});

const searchQuery = ref("");

const searchedPokemons = computed(() => {
  if (!searchQuery.value) {
    return filteredPokemons.value;
  }
  return filteredPokemons.value.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

function handleFilterChange(newFilter) {
  filterType.value = newFilter;
}
</script>

<template>
  <div class="flex flex-col mx-auto max-w-[800px]">
    <SearchInput v-model="searchQuery" imageSrc="../assets/search.png" />

    <div
      v-if="loading"
      class="fixed inset-0 flex justify-center items-center bg-white bg-opacity-75 z-50"
    >
      <CustomSpinner />
    </div>

    <div v-else-if="searchedPokemons.length === 0" class="text-center mt-8">
      <p class="text-4xl font-semibold">Uh-Oh!</p>
      <p class="text-xl mt-4 font-medium text-center">
        You look lost on your journey!
      </p>
      <div class="flex justify-center items-center">
        <CustomButton class="mt-4" label="Go back home" :route="'/'" />
      </div>
    </div>

    <div v-else class="grid grid-cols-1 gap-4">
      <ListComponent
        v-for="pokemon in searchedPokemons"
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

    <BottomBarComponent @filterChange="handleFilterChange" />
  </div>
</template>
