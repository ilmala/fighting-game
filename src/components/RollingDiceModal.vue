<template>
  <div class="z-40 fixed inset-0 flex justify-center items-center overlay-dark">
    <div class="text-center">
      <p class="text-base text-gray-400">Round {{ round.id }}</p>
      <h2 class="font-display font-black text-5xl text-white">
        Rolling Dice
      </h2>
      <div v-if="round.specialPowerLevel" class="">
        <div
          class="inline-block bg-yellow-600 text-yellow-900 font-black px-4 py-1 rounded shadow transform"
          style="transform: rotate(4deg);"
        >
          {{ round.specialPowerLevel }} Special Powers!
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

      <div class="mt-8">
        <button
          class="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg font-semibold text-sm"
          @click.prevent="onNextState"
        >
          Fight now!!
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import * as RoundStateType from "../utils/roundStateTypes";

export default {
  props: ["round"],
  methods: {
    onNextState() {
      this.$emit("closeModal", RoundStateType.ROUND_END);
    }
  }
};
</script>

<style scoped></style>
