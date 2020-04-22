<template>
  <div class="z-40 fixed inset-0 flex flex-col justify-center items-center cursor-pointer" @click="onNextState()">
    <div class="absolute inset-x-0 bottom-0 px-8 py-6 leading-6">
      <p class="font-bolder text-sm text-gray-400 flex justify-center items-center">
        <svg fill="currentColor" viewBox="0 0 20 20" class="w-6 h-6 text-indigo-500"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z" clip-rule="evenodd"></path></svg>
        <span class="ml-2">Click anywhere to proceed</span>
      </p>
    </div>
    <div class="modal-content px-12 py-20 rounded-lg text-center">
      <p class="text-base text-gray-400">Round {{ round.id }}</p>
      <h2 class="font-display font-black text-5xl text-white">
        {{ round.specialPowerLevel }} Special Powers Activated!
      </h2>
      <div class="mt-10 px-12 text-lg text-gray-400 text-left">
        <div class="mt-3 flex items-center" v-for="(assign, index) in round.specialPowersAssigned" :key="index">
          <svg fill="currentColor" viewBox="0 0 20 20" class="w-8 h-8 text-yellow-600"><path fill-rule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg>
          <div class="ml-2 font-black text-gray-100">{{ assign.creature.name }}</div>
          <div class="ml-2 text-text-600">gain <span class="text-yellow-600">{{ assign.power.description }}</span></div>
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
    }, 10000);
  },
  destroyed() {
    this.openTimeout = null;
  },
  methods: {
    onNextState() {
      this.$emit("closeModal", RoundStateType.ROUND_END);
    }
  }
};
</script>

<style scoped></style>
