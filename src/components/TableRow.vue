<template>
  <tr class="border-t border-gray-900">
    <td class="px-4 py-2">
      <span class="text-gray-600 text-sm">{{ creature.id }}.</span>
      <span class="ml-1 font-display font-bold text-white">{{ creature.name }}</span>
    </td>
    <td class="px-4 py-2">
      <div class="relative w-20 h-20 rounded-lg shadow">
        <img
          class="border border-gray-900 rounded-lg"
          :src="creature.type.image"
          :alt="creature.type.name"
        />
        <div
          class="absolute transform translate-x-2 bottom-0 right-0 mb-1 py-1 px-2 leading-none font-semibold text-center text-white rounded shadow-sm text-xs"
          :class="`bg-${creature.type.color}-700`"
        >
          {{ creature.type.name }}
        </div>
      </div>
    </td>
    <td class="px-4 py-2">
      <div class="w-24">
        <div class="flex justify-center items-center">
          <div class="font-bold text-gray-200 text-base text-center">
            {{ creature.strength }}
          </div>
          <span class="text-gray-600 text-sm mx-1">/</span>
          <div class="text-gray-600 text-sm text-center">
            {{ creature.strengthMax }}
          </div>
        </div>
        <div class="mt-2 h-2 bg-gray-900 overflow-hidden rounded-full">
          <div
            class="h-full bg-indigo-500 rounded-full"
            :style="`width: ${healthStrength}%`"
          ></div>
        </div>
      </div>
    </td>
    <td class="px-4 py-2">
      <div class="w-24">
        <div class="flex justify-center items-center">
          <div class="font-bold text-gray-200 text-base text-center">
            {{ creature.health }}
          </div>
          <span class="text-gray-600 text-sm mx-1">/</span>
          <div class="text-gray-600 text-sm text-center">
            {{ creature.healthMax }}
          </div>
        </div>
        <div class="mt-2 h-2 bg-gray-900 overflow-hidden rounded-full">
          <div
            class="h-full bg-red-500 rounded-full"
            :style="`width: ${healthPercentage}%`"
          ></div>
        </div>
      </div>
    </td>
    <td class="px-4 py-2">
      <div v-if="creature.specialPowers.length" class="text-white">
        <div
          class="flex items-center leading-4"
          v-for="(power, index) in creature.specialPowers"
          :key="index"
        >
          <svg
            fill="currentColor"
            viewBox="0 0 20 20"
            class="w-5 h-5 text-yellow-600"
          >
            <path
              fill-rule="evenodd"
              d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clip-rule="evenodd"
            ></path>
          </svg>
          <span class="ml-1 text-xs text-gray-500">{{ power.icon }}</span>
          <span
            v-if="power.quantity > 1"
            class="ml-2 text-xs text-gray-500 bg-gray-700 px-2 rounded-full"
            >x {{ power.quantity }}</span
          >
        </div>
      </div>
    </td>
    <td class="px-4 py-2">
      <div class="flex justify-center items-center">
        <button @click.prevent="increaseHealth" class="transition duration-300 rounded-full hover:bg-gray-900 focus:outline-none focus:shadow-outline">
          <svg fill="currentColor" viewBox="0 0 20 20" class="transition duration-300 w-8 h-8 text-gray-700 hover:text-gray-400 hover:bg-gray-900 rounded-full p-1"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clip-rule="evenodd"></path></svg>
        </button>
        <button @click.prevent="decreaseHealth" class="transition duration-300 rounded-full hover:bg-gray-900 focus:outline-none focus:shadow-outline">
          <svg fill="currentColor" viewBox="0 0 20 20" class="transition duration-300 w-8 h-8 text-gray-700 hover:text-gray-400 p-1"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 000 2h6a1 1 0 100-2H7z" clip-rule="evenodd"></path></svg>
        </button>
        <button @click.prevent="deleteCreature" class="transition duration-300 rounded-full hover:bg-gray-900 focus:outline-none focus:shadow-outline">
          <svg fill="currentColor" viewBox="0 0 20 20" class="transition duration-300 w-8 h-8 text-gray-700 hover:text-red-400 p-1"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"></path></svg>
        </button>
      </div>
    </td>
  </tr>
</template>

<script>
export default {
  props: ["creature"],
  computed: {
    healthStrength() {
      return parseInt(
        (this.creature.strength * 100) / this.creature.strengthMax
      );
    },
    healthPercentage() {
      return parseInt((this.creature.health * 100) / this.creature.healthMax);
    }
  },
  methods: {
    deleteCreature() {
      this.$emit("delete", this.creature.id);
    },
    increaseHealth() {
      this.$emit("increaseHealth", this.creature.id);
    },
    decreaseHealth() {
      this.$emit("decreaseHealth", this.creature.id);
    }
  }
};
</script>

<style></style>
