<template>
  <div
    class="z-40 fixed inset-0 flex flex-col justify-center items-center cursor-pointer"
    @click="onNextState()"
  >
    <div class="absolute inset-x-0 bottom-0 px-8 py-6 leading-6">
      <p
        class="font-bolder text-sm text-gray-400 flex justify-center items-center"
      >
        <svg
          fill="currentColor"
          viewBox="0 0 20 20"
          class="w-6 h-6 text-indigo-500"
        >
          <path
            fill-rule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z"
            clip-rule="evenodd"
          ></path>
        </svg>
        <span class="ml-2">Click anywhere to proceed</span>
      </p>
    </div>
    <div class="modal-content px-12 py-20 rounded-lg text-center">
      <p class="text-base text-gray-400">Round {{ round.id }}</p>
      <h2 class="font-display font-black text-5xl text-white">
        Rolling Dice
      </h2>
      <div v-if="round.specialPowerLevel" class="">
        <div
          class="inline-block bg-yellow-600 text-lg text-yellow-900 font-black px-4 py-1 rounded shadow transform"
          style="transform: rotate(4deg);"
        >
          Double Shot!
        </div>
      </div>
      <div class="mt-8 flex justify-center text-white">
        <div
          class="flex justify-center items-center w-24 h-24 bg-gray-100 text-gray-900 mx-2 font-black text-4xl rounded-lg"
        >
          {{ round.roll1 }}
        </div>
        <div
          class="flex justify-center items-center w-24 h-24 bg-gray-100 text-gray-900 mx-2 font-black text-4xl rounded-lg"
        >
          {{ round.roll2 }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as RoundStateType from "../utils/roundStateTypes";

export default {
  data() {
    return {
      openTimeout: null
    };
  },
  props: ["round"],
  mounted() {
    this.openTimeout = setTimeout(() => {
      this.onNextState();
    }, 5000);
  },
  destroyed() {
    this.openTimeout = null;
  },
  methods: {
    onNextState() {
      this.$emit("closeModal", RoundStateType.ROUND_BEFORE_FIGHT);
    }
  }
};
</script>

<style scoped></style>
