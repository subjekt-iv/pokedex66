import { defineStore } from 'pinia';

export const usePokemonStore = defineStore('pokemon', {
    state: () => ({
        pokemons: [],
        favorites: [],
        loading: false,
        showModal: false,
        modalPokemon: null,
    }),

    actions: {
        async fetchPokemons() {
            this.loading = true;
            const minLoadingTime = 1200;
            const startTime = Date.now();

            try {
                const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=9');
                const data = await response.json();

                this.pokemons = data.results;
            } catch (error) {
                console.error(error);
            } finally {
                const elapsedTime = Date.now() - startTime;
                const remainingTime = minLoadingTime - elapsedTime;

                if (remainingTime > 0) {
                    setTimeout(() => {
                        this.loading = false;
                    }, remainingTime);
                } else {
                    this.loading = false;
                }
            }
        },

        async fetchPokemonDetails(name) {
            // this.loading = true;
            try {
                const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
                const data = await response.json();

                this.modalPokemon = data;
                this.showModal = true;
            } catch (error) {
                console.error('Error fetching Pokémon details:', error);
            }
            // finally {
            //     this.loading = false;
            // }
        },

        addFavorite(pokemon) {
            if (!this.favorites.includes(pokemon)) {
                this.favorites.push(pokemon);
            }
        },

        removeFavorite(pokemon) {
            this.favorites = this.favorites.filter(fav => fav !== pokemon);
        },

        openModal(pokemon) {
            this.modalPokemon = pokemon;
            this.showModal = true;
        },

        closeModal() {
            this.showModal = false;
            this.modalPokemon = null;
        },
    },
});
