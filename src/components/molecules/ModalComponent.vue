<!-- components/molecules/PokemonModal.vue -->
<script setup>
import { defineProps, defineEmits, computed } from "vue";
import { usePokemonStore } from "@/stores/pokemonStore";
import CustomImage from "@/components/atoms/CustomImage.vue";
import CustomButton from "@/components/atoms/CustomButton.vue";
import favIcon from "../../../public/assets/fav.png";
import nonFavIcon from "../../../public/assets/nonfav.png";

const props = defineProps({
  pokemon: Object,
  show: Boolean,
});

const emit = defineEmits(["close"]);

const store = usePokemonStore();

const closeModal = () => {
  emit("close");
};

const pokemonImage = computed(() => {
  if (!props.pokemon?.id) return "";
  const id = props.pokemon.id;
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
});

const isFavorite = computed(() =>
  store.favorites.some((fav) => fav.name === props.pokemon.name)
);

const toggleFavorite = () => {
  if (isFavorite.value) {
    store.removeFavorite(props.pokemon);
  } else {
    store.addFavorite(props.pokemon);
  }
};

const copyToClipboard = () => {
  const name = props.pokemon?.name || "Unknown";
  const weight = props.pokemon?.weight || "Unknown";
  const height = props.pokemon?.height || "Unknown";
  const type = props.pokemon?.types[0]?.type.name || "Unknown";
  const type2 = props.pokemon?.types[1]?.type.name || "";

  const textToCopy = `${name}, ${weight}, ${height}, ${type}, ${type2}`;

  navigator.clipboard
    .writeText(textToCopy)
    .then(() => {
      alert("Pokemon copied :)");
    })
    .catch((err) => {
      console.error("Failed to copy pokemon :(", err);
    });
};

const formattedName = computed(() => {
  return (
    props.pokemon?.name.charAt(0).toUpperCase() + props.pokemon?.name.slice(1)
  );
});
</script>

<template>
  <div v-if="show" class="fixed inset-0 flex items-center justify-center z-50">
    <div class="fixed inset-0 bg-black opacity-50" @click="closeModal"></div>
    <div class="bg-white p-0 rounded shadow-lg z-10 relative w-full max-w-lg">
      <CustomImage
        :src="'../assets/close.png'"
        alt="Close"
        :imgClasses="'absolute top-2 right-2 z-20 w-6 h-6'"
        :clickEnabled="true"
        @click="closeModal"
      />

      <div class="relative">
        <CustomImage
          src="../assets/hero.png"
          alt="Banner"
          imgClasses="w-full h-44 object-cover"
        />

        <CustomImage
          :src="pokemonImage"
          alt="Pokemon image"
          imgClasses="absolute top-28 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 object-cover rounded-full"
        />
      </div>
      <div class="pb-4 pt-4 px-4">
        <div class="text-left border-b border-[#E8E8E8] pb-2 mb-2">
          <p class="text-xl text-[#5E5E5E]">
            <span class="font-bold">Name:</span>
            <span class="font-medium ml-2">{{ formattedName }}</span>
          </p>
        </div>
        <div class="text-left border-b border-[#E8E8E8] pb-2 mb-2">
          <p class="text-xl text-[#5E5E5E]">
            <span class="font-bold">Weight:</span>
            <span class="font-medium ml-2">{{ pokemon?.weight }}</span>
          </p>
        </div>
        <div class="text-left border-b border-[#E8E8E8] pb-2 mb-2">
          <p class="text-xl text-[#5E5E5E]">
            <span class="font-bold">Height:</span>
            <span class="font-medium ml-2">{{ pokemon?.height }}</span>
          </p>
        </div>
        <div class="text-left border-b border-[#E8E8E8] pb-2">
          <p class="text-xl text-[#5E5E5E]">
            <span class="font-bold">Type:</span>
            <span class="font-medium ml-2">
              {{ pokemon?.types[0]?.type.name }}
              <span v-if="pokemon?.types[1]?.type.name"
                >, {{ pokemon?.types[1]?.type.name }}</span
              >
            </span>
          </p>
        </div>

        <div class="flex justify-between items-center">
          <CustomButton
            class="h-11"
            label="Share to my friends"
            @click="copyToClipboard"
          />
          <div @click="toggleFavorite">
            <CustomImage
              :src="isFavorite ? favIcon : nonFavIcon"
              alt="Favorite Icon"
              class="w-8 h-8 mt-8 cursor-pointer"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
