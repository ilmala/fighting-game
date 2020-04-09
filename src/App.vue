<template>
  <div
    id="app"
    class="bg-gray-900 py-16 border-t-8 border-indigo-500 min-h-screen antialiased"
  >
    <RollingDiceModal
      v-if="isRollingDice"
      :round="round"
      @closeModal="onNextState"
    />

    <header class="max-w-4xl mx-auto px-4">
      <div class="flex justify-between items-center">
        <div class="">
          <h1 class="font-display font-black text-5xl text-white">
            Fighting Game
          </h1>
          <p class="text-gray-500 text-sm tracking-wider leading-5">
            <span class="inline-block font-semibold text-white rounded-lg">
              Round {{ currentRound }}
            </span>
            &bull;
            <span class="">
              {{ creaturesCount }} creature{{ creaturesCount !== 1 ? "s" : "" }}
              still in game
            </span>
          </p>
        </div>

        <div class="flex justify-center">
          <button
            class="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg font-semibold text-sm"
            @click.prevent="rollDice"
          >
            Roll The Dice
          </button>
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
              <path
                d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"
              ></path>
            </svg>
            <span class="ml-2">Reset</span>
          </button>
        </div>
      </div>
    </header>

    <main class="mt-12 max-w-4xl mx-auto px-4">
      <div
        class="mt-4 bg-gray-800 rounded-lg shadow-2xl overflow-y-hidden overflow-x-auto"
      >
        <table class="w-full">
          <thead>
            <tr>
              <th class="px-4 py-3 text-xs text-gray-600 text-left">Name</th>
              <th class="px-4 py-3 text-xs text-gray-600 text-left">Type</th>
              <th class="px-4 py-3 text-xs text-gray-600 text-left">
                Strength
              </th>
              <th class="px-4 py-3 text-xs text-gray-600 text-left">Health</th>
              <th class="px-4 py-3 text-xs text-gray-600 text-left">
                Special Power
              </th>
              <th class="px-4 py-3 text-xs text-gray-600 text-center">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            <template v-for="(creature, index) in creatures">
              <TableRow
                :key="creature.id"
                :creature="creature"
                :index="index"
                @delete="handleDeleteRow"
                @increaseHealth="handleIncreaseHealth"
                @decreaseHealth="handleDecreaseHealth"
              ></TableRow>
            </template>
          </tbody>
        </table>
      </div>
    </main>

    <footer class="mt-8 text-center">
      <p class="font-semibold text-sm text-gray-600">
        Created by Luca Malattia with
        <a
          class="text-indigo-500 underline"
          href="https://vuejs.org/"
          target="_blank"
          >Vue.js</a
        >
        and
        <a
          class="text-indigo-500 underline"
          href="https://tailwindcss.com/"
          target="_blank"
          >Tailwind CSS</a
        >
      </p>
      <p class="mt-2 font-semibold text-sm text-gray-600">
        The code is freely available on
        <a
          class="text-indigo-500 underline"
          href="https://github.com/ilmala/fighting-game"
          target="_blank"
          >GitHub</a
        >.
      </p>
    </footer>
  </div>
</template>

<script>
import TableRow from "@/components/TableRow";
import RollingDiceModal from "@/components/RollingDiceModal";
import Creature from "./utils/creature";
import Dice from "./utils/dice";
import * as RoundStateType from "./utils/roundStateTypes";

export default {
  data() {
    return {
      creatures: {},
      rounds: {},
      currentRound: 1,
      roundState: RoundStateType.ROUND_INIT
    };
  },
  mounted() {
    this.fillBoard();
  },
  computed: {
    isRollingDice() {
      return this.roundState === RoundStateType.ROUND_ROLL;
    },
    round() {
      return this.rounds[this.currentRound] || false;
    },
    creaturesCount() {
      return Object.keys(this.creatures).length;
    }
  },
  methods: {
    rollDice() {
      this.roundState = RoundStateType.ROUND_ROLL;
      let diceRollResult = Dice.roll(this.currentRound);

      this.$set(this.rounds, this.currentRound, diceRollResult);
    },

    fillBoard() {
      this.creatures = {};
      for (let i = 1; i <= 100; i++) {
        this.$set(this.creatures, i, Creature.create(i));
      }
    },
    resetBoard() {
      this.rounds = {};
      this.currentRound = 1;
      this.roundState = RoundStateType.ROUND_INIT;
      this.fillBoard();
    },

    onNextState(state) {
      this.roundState = state;
      if (this.roundState === RoundStateType.ROUND_END) {
        this.onNextRound();
      }
    },
    onNextRound() {
      this.currentRound++;
    },

    handleDeleteRow(id) {
      this.$delete(this.creatures, id);
    },
    handleIncreaseHealth(id) {
      this.creatures[id].health++;
    },
    handleDecreaseHealth(id) {
      this.creatures[id].health--;
    }
  },
  components: {
    TableRow,
    RollingDiceModal
  }
};
</script>

<style lang="scss" src="./assets/sass/app.scss"></style>
