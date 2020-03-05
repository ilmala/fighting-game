<template>
  <tr class="border-t border-gray-900">
    <td class="font-display font-bold text-white px-4 py-2">{{ creature.name }}</td>
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
        >{{ creature.type.name }}</div>
      </div>
    </td>
    <td class="px-4 py-2">
      <div class="w-24">
        <div class="flex items-center">
          <div class="font-bold text-gray-200 text-base text-center">{{ creature.strength }}</div>
          <span class="text-gray-600 text-sm mx-1">/</span>
          <div class="text-gray-600 text-sm text-center">{{ creature.strengthMax }}</div>
        </div>
        <div class="mt-2 h-3 bg-gray-900 overflow-hidden shadow rounded-full">
          <div
            class="h-full bg-indigo-500 rounded-full"
            :style="`width: ${(100-(creature.strength/creature.strengthMax)/100)}%`"
          ></div>
        </div>
      </div>
    </td>
    <td class="px-4 py-2">
      <div class="w-24">
        <div class="flex items-center">
          <div class="font-bold text-gray-200 text-base text-center">{{ creature.health }}</div>
          <span class="text-gray-600 text-sm mx-1">/</span>
          <div class="text-gray-600 text-sm text-center">{{ creature.healthMax }}</div>
        </div>
        <div class="mt-2 h-3 bg-gray-900 overflow-hidden shadow rounded-full">
          <div
            class="h-full bg-red-500 rounded-full"
            :style="`width: ${(100-(creature.health/creature.healthMax)/100)}%`"
          ></div>
        </div>
      </div>
    </td>
    <td class="px-4 py-2"></td>
    <td class="px-4 py-2">
      <div class="flex justify-center">
        <button @click.prevent="increaseHealth">
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
            class="w-6 h-6 text-gray-600 hover:text-gray-200"
          >
            <path
              d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
            />
            <line x1="12" y1="7" x2="12" y2="16" />
            <line x1="8" y1="11" x2="16" y2="11" />
          </svg>
        </button>
        <button @click.prevent="decreaseHealth" class="ml-2">
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
            class="w-6 h-6 text-gray-600 hover:text-gray-200"
          >
            <path
              d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
            />
            <line x1="8" y1="11" x2="16" y2="11" />
          </svg>
        </button>
        <button @click.prevent="deleteCreature" class="ml-2">
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
            class="w-6 h-6 text-gray-800 bg-gray-700 hover:text-white hover:bg-red-500 rounded"
          >
            <line x1="15" y1="9" x2="9" y2="15" />
            <line x1="9" y1="9" x2="15" y2="15" />
          </svg>
        </button>
      </div>
    </td>
  </tr>
</template>

<script>
export default {
  props: ["creature","index"],
  methods: {
    deleteCreature() {
      alert(`Delete creature ${this.creature.name}`);
    },
    increaseHealth() {
      alert(`Increase ${this.creature.name} Health`);
    },
    decreaseHealth() {
      alert(`Decrease ${this.creature.name} Health`);
    },
  }
};
</script>

<style>
</style>