<template>
  <div id="app" class="bg-gray-900 min-h-screen antialiased">
    <AppHeader />
    <div v-if="showModal" class="z-30 fixed inset-0 overlay-dark"></div>
    <transition-group name="slideIn" tag="div">
      <RollingDiceModal
        v-if="showModal === 'roll-dice'"
        :round="round"
        @closeModal="onNextState"
        key="roll-dice"
      />
      <SpecialPowersModal
        v-if="showModal === 'special-powers'"
        :round="round"
        @closeModal="onNextState"
        key="special-powers"
      />
    </transition-group>
    <header class="mt-16 max-w-5xl mx-auto px-4">
      <div class="">
        <div class="text-center">
          <h1 class="font-black text-5xl leading-10 tracking-wide text-white">
            Round {{ currentRound }}
          </h1>
          <p class="mt-2 text-gray-500 text-base tracking-wider leading-5">
            {{ creaturesCount }} creature{{ creaturesCount !== 1 ? "s" : "" }}
            still in game
          </p>
        </div>

        <div class="mt-8 flex flex-col justify-center items-center">
          <button
            class="transition duration-300 flex items-center bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:shadow-outline text-white text-lg px-4 py-2 leading-6 rounded-lg font-black"
            @click.prevent="rollDice"
          >
            <span class="mr-3">Roll The Dice</span>
            <svg
              fill="currentColor"
              viewBox="0 0 20 20"
              class="w-6 h-6 text-indigo-100"
            >
              <path
                d="M7 9a2 2 0 012-2h6a2 2 0 012 2v6a2 2 0 01-2 2H9a2 2 0 01-2-2V9z"
              ></path>
              <path
                d="M5 3a2 2 0 00-2 2v6a2 2 0 002 2V5h8a2 2 0 00-2-2H5z"
              ></path>
            </svg>
          </button>
          <button
            class="transition duration-300 mt-3 inline-flex bg-gray-800 hover:bg-gray-700 font-semibold text-xs text-gray-500 hover:text-white px-4 py-1 rounded-lg"
            @click.prevent="resetBoard"
          >
            <span class="">Reset game</span>
          </button>
        </div>
      </div>
    </header>

    <main class="mt-12 max-w-5xl mx-auto px-8">
      <div
        class="mt-4 bg-gray-800 rounded-lg shadow-2xl overflow-y-hidden overflow-x-auto"
      >
        <table class="w-full">
          <thead>
            <tr>
              <th
                class="px-4 py-3 text-xs text-gray-600 text-left uppercase tracking-wide"
              >
                Name
              </th>
              <th
                class="px-4 py-3 text-xs text-gray-600 text-center uppercase tracking-wide"
              >
                Type
              </th>
              <th
                class="px-4 py-3 text-xs text-gray-600 text-center uppercase tracking-wide"
              >
                Strength
              </th>
              <th
                class="px-4 py-3 text-xs text-gray-600 text-center uppercase tracking-wide"
              >
                Health
              </th>
              <th
                class="px-4 py-3 text-xs text-gray-600 text-left uppercase tracking-wide"
              >
                Special Power
              </th>
              <th
                class="px-4 py-3 text-xs text-gray-600 text-center uppercase tracking-wide"
              >
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

    <footer class="my-12 text-center">
      <p class="text-sm text-gray-600">
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
    </footer>
  </div>
</template>

<script>
import AppHeader from "./components/AppHeader";
import TableRow from "@/components/TableRow";
import RollingDiceModal from "@/components/RollingDiceModal";
import SpecialPowersModal from "./components/SpecialPowersModal";
import Creature from "./utils/creature";
import Dice from "./utils/dice";
import * as RoundStateType from "./utils/roundStateTypes";
import { specialPowers } from "./utils/specialPowerTypes";

export default {
  data() {
    return {
      creatures: {},
      rounds: {},
      currentRound: 1,
      roundState: RoundStateType.ROUND_INIT,
      showModal: null
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
      let diceRollResult = Dice.roll(this.currentRound);
      this.$set(this.rounds, this.currentRound, diceRollResult);
      this.showModal = "roll-dice";
    },
    assignSpecialPowers() {
      const shuffledCreatureIds = Creature.getShuffleIds(this.creatures);
      for (let i = 0; i < this.round.specialPowerLevel; i++) {
        // for now assign to random creature
        let specialPower = specialPowers.find(el => el.id === i + 1);
        let creature = this.creatures[shuffledCreatureIds[i]];
        let foundSP = creature.specialPowers.find(el => el.id === i + 1);
        if (foundSP) {
          foundSP.quantity++;
          console.log(foundSP.quantity);
        } else {
          creature.specialPowers.push(
            Object.assign(specialPower, { quantity: 1 })
          );
        }

        this.round.specialPowersAssigned.push({
          creature: creature,
          power: specialPower
        });

        console.info(
          `${creature.name} gain level ${i + 1} ${specialPower.description}`
        );
      }
      this.showModal = "special-powers";
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
      this.showModal = null;
      this.roundState = state;
      if (this.roundState === RoundStateType.ROUND_ROLL) {
        this.rollDice();
      }
      if (this.roundState === RoundStateType.ROUND_BEFORE_FIGHT) {
        if (this.round.specialPowerLevel > 0) {
          this.assignSpecialPowers();
        } else {
          this.roundState = RoundStateType.ROUND_END;
        }
      }
      if (this.roundState === RoundStateType.ROUND_END) {
        this.onNextRound();
      }
    },

    onNextRound() {
      this.currentRound++;
      this.roundState = RoundStateType.ROUND_INIT;
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
    AppHeader,
    TableRow,
    RollingDiceModal,
    SpecialPowersModal
  }
};
</script>

<style lang="scss" src="./assets/sass/app.scss"></style>
