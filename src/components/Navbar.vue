<script setup>
import { onMounted, ref } from 'vue';

import { ROUTES } from '../constants.ts';

const isOpen = ref(false);
const currentPath = ref('/');

function updateRoutePath() {
  currentPath.value = window.location.pathname;
}

function listenAstroSwap() {
  document.addEventListener('astro:after-swap', () => {
    isOpen.value = false;
  });
}

onMounted(() => {
  updateRoutePath();
  listenAstroSwap();
});
</script>

<!--suppress CssUnusedSymbol -->
<style scoped>
.vp-menu-enter-active, .vp-menu-leave-active {
  transition: opacity 0.2s ease, transform 0.25s ease-out;
}

.vp-menu-enter-from, .vp-menu-leave-to {
  opacity: 0;
  transform: translateY(-5px);
}
</style>

<template>
  <nav class="sticky top-0 z-50 border-b border-slate-100 bg-white/95 backdrop-blur-sm w-full h-16 flex items-center">
    <div class="mx-auto max-w-5xl px-4 md:px-6 w-full flex items-center justify-between">
      <a
        href="/"
        class="text-xl font-bold tracking-tighter shrink-0 z-60 relative"
      >
        <span class="text-blue-600">TIDE</span> Lab
      </a>

      <div class="hidden md:flex items-center gap-8 text-[14px] font-medium text-slate-600">
        <a
          v-for="item in ROUTES"
          :key="item.path"
          :href="item.path"
          :class="[
            'transition-colors hover:text-blue-600',
            currentPath === item.path ? 'text-blue-600' : 'text-slate-600',
          ]"
        >
          {{ item.name }}
        </a>
      </div>

      <button
        @click="isOpen = !isOpen"
        class="md:hidden p-2 -mr-2 text-slate-600 z-60 relative flex items-center justify-center rounded-lg active:bg-slate-100 transition-colors"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            v-if="!isOpen"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 6h16M4 12h16M4 18h16"
          />
          <path
            v-else
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>
  </nav>

  <Transition name="vp-menu">
    <div
      v-if="isOpen"
      class="fixed inset-0 z-40 md:hidden bg-white flex flex-col pt-16 h-screen overflow-hidden"
    >
      <div class="grow flex flex-col items-center justify-center px-6 gap-8 pb-16 pt-8">
        <a
          v-for="item in ROUTES"
          :key="item.path"
          :href="item.path"
          @click="isOpen = false"
          :class="[
            'text-lg font-medium transition-colors',
            currentPath === item.path ? 'text-blue-600' : 'text-slate-800',
          ]"
        >
          {{ item.name }}
        </a>
        <div class="grow" />
      </div>
    </div>
  </Transition>
</template>
