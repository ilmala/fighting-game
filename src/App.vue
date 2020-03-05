<template>
  <div id="app" class="bg-gray-900 py-16 border-t-4 border-indigo-500 min-h-screen antialiased">
    <header>
      <div class="flex justify-center">
        <div class="text-center">
          <h1 class="font-display font-black text-5xl text-white">Fighting Game</h1>
          <p
            class="mt-1 text-gray-500 text-sm tracking-wider"
          >How To Code Well - March 2020 Code Challenges</p>
        </div>
      </div>
    </header>

    <main class="mt-10 max-w-4xl mx-auto px-4">
      <div class="flex justify-center">
        <button
          class="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg font-semibold text-sm"
          @click.prevent="rollDice"
        >Roll The Dice</button>
        <button
          class="ml-2 inline-flex bg-gray-800 hover:bg-gray-700 text-gray-500 hover:text-white px-4 py-2 rounded-lg font-semibold text-sm"
          @click.prevent="resetBoard"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="w-5 h-5"
          >
            <polyline points="23 4 23 10 17 10"></polyline>
            <polyline points="1 20 1 14 7 14"></polyline>
            <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path>
          </svg>
          <span class="ml-2">Reset</span>
        </button>
      </div>

      <div class="mt-12 bg-gray-800 rounded-lg shadow-2xl overflow-y-hidden overflow-x-auto">
        <table class="w-full">
          <thead>
            <tr>
              <th class="px-4 py-3 text-xs text-gray-600 text-left">Name</th>
              <th class="px-4 py-3 text-xs text-gray-600 text-left">Type</th>
              <th class="px-4 py-3 text-xs text-gray-600 text-left">Strength</th>
              <th class="px-4 py-3 text-xs text-gray-600 text-left">Health</th>
              <th class="px-4 py-3 text-xs text-gray-600 text-left">Special Power</th>
              <th class="px-4 py-3 text-xs text-gray-600 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            <template v-for="(creature, index) in creatures">
              <TableRow :key="creature.id" :creature="creature" :index="index"></TableRow>
            </template>
          </tbody>
        </table>
      </div>
    </main>

    <footer class="mt-8 text-center">
      <p class="font-semibold text-sm text-gray-600">
        Created by Luca Malattia with <a class="text-indigo-500 underline" href="https://vuejs.org/" target="_blank">Vue.js</a> and <a class="text-indigo-500 underline" href="https://tailwindcss.com/" target="_blank">Tailwind CSS</a>
      </p>
      <p class="mt-2 font-semibold text-sm text-gray-600">
        The code is freely available on <a class="text-indigo-500 underline" href="https://github.com/ilmala/fighting-game" target="_blank">GitHub</a>.
      </p>
    </footer>
  </div>
</template>

<script>
import * as names from "./utils/names.js";
import {Types} from "./utils/types.js";
import TableRow from "@/components/TableRow";

export default {
  name: "App",
  data() {
    return {
      creatures: []
    };
  },
  mounted() {
    this.fillBoard();
  },
  methods: {
    createCreature(index) {
      const typeId = this.getRandomIntInclusive(1, 4);
      const type = Types.find(type => type.id === typeId);
      const strength = this.getRandomIntInclusive(type.strength[0], type.strength[1]);
      const health = this.getRandomIntInclusive(type.health[0], type.health[1]);
      const name = this.getRandomNameByType(type.id, index);

      return {
        id: index + 1,
        name: name,
        type: type,
        strength: strength,
        strengthMax: strength,
        health: health,
        healthMax: health,
        specialPower: type.specialPower
      };
    },
    rollDice() {
      alert(`Roll the Dice`);
    },
    resetBoard() {
      this.fillBoard();
    },
    fillBoard() {
      this.creatures = [];
      for (let i = 0; i < 100; i++) {
        this.creatures.push(this.createCreature(i));
      }
    },
    getRandomIntInclusive(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min + 1)) + min; //Il max è incluso e il min è incluso
    },
    getRandomNameByType(type, index) {
      if (type == 1) {
        return names.witches[index];
      } 
      if (type == 2) {
        return names.dragons[index];
      } 
      if (type == 3) {
        return names.snakes[index];
      } 
      if (type == 4) {
        return names.trolls[index];
      }

      return null;
    }
  },
  components: {TableRow}
};
</script>

<style lang="scss" src="./assets/sass/app.scss">

</style>
