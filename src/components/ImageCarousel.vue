<script setup>
import { computed, nextTick, onMounted, onUnmounted, ref } from 'vue';

const props = defineProps({
  photos: { type: Array, required: true },
  autoPlayInterval: { type: Number, default: 5000 },
});

const currentIndex = ref(0);
const isAnimating = ref(false);
const isTransitioning = ref(true);
let timer = null;

const firstPhoto = computed(() => props.photos[0]);
const lastPhoto = computed(() => props.photos[props.photos.length - 1]);

const displayIndex = computed(() => {
  if (currentIndex.value >= props.photos.length) {
    return 0;
  } else if (currentIndex.value < 0) {
    return props.photos.length - 1;
  } else {
    return currentIndex.value;
  }
});

const containerStyle = computed(() => ({
  transform: `translateX(-${(currentIndex.value + 1) * 100}%)`,
  transition: isTransitioning.value
    ? 'transform 700ms cubic-bezier(0.4, 0, 0.2, 1)'
    : 'none',
}));

function handleTransitionEnd() {
  isAnimating.value = false;
  if (currentIndex.value >= props.photos.length) {
    isTransitioning.value = false;
    currentIndex.value = 0;
    nextTick(() => {
      setTimeout(() => {
        isTransitioning.value = true;
      }, 20);
    });
  } else if (currentIndex.value <= -1) {
    isTransitioning.value = false;
    currentIndex.value = props.photos.length - 1;
    nextTick(() => {
      setTimeout(() => {
        isTransitioning.value = true;
      }, 20);
    });
  }
}

function next() {
  if (isAnimating.value) {
    return;
  }
  isAnimating.value = true;
  currentIndex.value++;
  restartAutoPlay();
}

function prev() {
  if (isAnimating.value) {
    return;
  }
  isAnimating.value = true;
  currentIndex.value--;
  restartAutoPlay();
}

function goTo(index) {
  if (isAnimating.value || index === currentIndex.value) {
    return;
  }
  isAnimating.value = true;
  currentIndex.value = index;
  restartAutoPlay();
}

function startAutoPlay() {
  if (props.photos.length > 1) {
    timer = setInterval(next, props.autoPlayInterval);
  }
}

function stopAutoPlay() {
  if (timer) {
    clearInterval(timer);
  }
}

function restartAutoPlay() {
  stopAutoPlay();
  startAutoPlay();
}

function getDisplayClass(index) {
  if (displayIndex.value === index) {
    return 'bg-white w-8';
  } else {
    return 'bg-white/40 w-2';
  }
}

onMounted(startAutoPlay);
onUnmounted(stopAutoPlay);
</script>

<template>
  <div class="overflow-hidden w-full relative bg-slate-100 aspect-video group sm:aspect-21/9">
    <div
      class="flex h-full w-full"
      :style="containerStyle"
      @transitionend="handleTransitionEnd"
    >
      <div class="h-full min-w-full relative">
        <img
          :src="lastPhoto.src"
          :alt="lastPhoto.alt"
          loading="lazy"
          class="block object-cover h-full w-[1000dvh] max-w-full"
        />
        <div class="p-6 pt-12 absolute bottom-0 left-0 right-0 bg-linear-to-t from-black/70 to-transparent via-black/10">
          <p class="font-medium text-sm text-white sm:text-base drop-shadow-md">
            {{ lastPhoto.alt }}
          </p>
        </div>
      </div>

      <div
        v-for="(photo, index) in photos"
        :key="index"
        class="h-full min-w-full relative"
      >
        <img
          :src="photo.src"
          :alt="photo.alt"
          :loading="index === 0 ? 'eager' : 'lazy'"
          class="block object-cover h-full w-[1000dvh] max-w-full select-none"
        />
        <div class="p-6 pt-12 absolute bottom-0 left-0 right-0 bg-linear-to-t from-black/70 to-transparent via-black/10">
          <p class="font-medium text-sm text-white sm:text-base drop-shadow-md">
            {{ photo.alt }}
          </p>
        </div>
      </div>

      <div class="h-full min-w-full relative">
        <img
          :src="firstPhoto.src"
          :alt="firstPhoto.alt"
          loading="lazy"
          class="block object-cover h-full w-[1000dvh] max-w-full"
        />
        <div class="p-6 pt-12 absolute bottom-0 left-0 right-0 bg-linear-to-t from-black/70 to-transparent via-black/10">
          <p class="font-medium text-sm text-white sm:text-base drop-shadow-md">
            {{ firstPhoto.alt }}
          </p>
        </div>
      </div>
    </div>

    <button
      @click="prev"
      :disabled="isAnimating"
      class="p-3 absolute left-4 top-1/2 z-20 text-white bg-white/20 hover:bg-white/40 rounded-full opacity-0 disabled:opacity-0 group-hover:opacity-100 backdrop-blur-md duration-300 transition-all -translate-y-1/2"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M15 19l-7-7 7-7"
        />
      </svg>
    </button>

    <button
      @click="next"
      :disabled="isAnimating"
      class="p-3 absolute right-4 top-1/2 z-20 text-white bg-white/20 hover:bg-white/40 rounded-full opacity-0 disabled:opacity-0 group-hover:opacity-100 backdrop-blur-md duration-300 transition-all -translate-y-1/2"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M9 5l7 7-7 7"
        />
      </svg>
    </button>

    <div class="flex gap-2.5 absolute bottom-6 left-1/2 z-20 -translate-x-1/2">
      <!--suppress JSUnusedLocalSymbols -->
      <button
        v-for="(_, index) in photos"
        :key="index"
        @click="goTo(index)"
        class="h-1.5 rounded-full duration-500 transition-all"
        :class="getDisplayClass(index)"
      >
      </button>
    </div>
  </div>
</template>
