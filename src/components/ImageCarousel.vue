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

const handleTransitionEnd = () => {
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
};

const next = () => {
  if (isAnimating.value) {
    return;
  }
  isAnimating.value = true;
  currentIndex.value++;
  restartAutoPlay();
};

const prev = () => {
  if (isAnimating.value) {
    return;
  }
  isAnimating.value = true;
  currentIndex.value--;
  restartAutoPlay();
};

const goTo = (index) => {
  if (isAnimating.value || index === currentIndex.value) {
    return;
  }
  isAnimating.value = true;
  currentIndex.value = index;
  restartAutoPlay();
};

const startAutoPlay = () => {
  if (props.photos.length > 1) {
    timer = setInterval(next, props.autoPlayInterval);
  }
};

const stopAutoPlay = () => {
  if (timer) {
    clearInterval(timer);
  }
};

const restartAutoPlay = () => {
  stopAutoPlay();
  startAutoPlay();
};

onMounted(startAutoPlay);
onUnmounted(stopAutoPlay);
</script>

<template>
  <div class="relative group w-full overflow-hidden bg-slate-100 aspect-video sm:aspect-21/9">
    <div
      class="flex h-full w-full"
      :style="containerStyle"
      @transitionend="handleTransitionEnd"
    >
      <div class="min-w-full h-full relative">
        <img
          :src="lastPhoto.src"
          class="w-full h-full object-cover block"
          alt=""
        />
        <div class="absolute bottom-0 left-0 right-0 bg-linear-to-t from-black/70 via-black/10 to-transparent p-6 pt-12">
          <p class="text-white text-sm sm:text-base font-medium drop-shadow-md">
            {{ lastPhoto.alt }}
          </p>
        </div>
      </div>

      <div
        v-for="(photo, index) in photos"
        :key="index"
        class="min-w-full h-full relative"
      >
        <img
          :src="photo.src"
          :alt="photo.alt"
          class="w-full h-full object-cover block select-none"
        />
        <div class="absolute bottom-0 left-0 right-0 bg-linear-to-t from-black/70 via-black/10 to-transparent p-6 pt-12">
          <p class="text-white text-sm sm:text-base font-medium drop-shadow-md">
            {{ photo.alt }}
          </p>
        </div>
      </div>

      <div class="min-w-full h-full relative">
        <img
          :src="firstPhoto.src"
          class="w-full h-full object-cover block"
          alt=""
        />
        <div class="absolute bottom-0 left-0 right-0 bg-linear-to-t from-black/70 via-black/10 to-transparent p-6 pt-12">
          <p class="text-white text-sm sm:text-base font-medium drop-shadow-md">
            {{ firstPhoto.alt }}
          </p>
        </div>
      </div>
    </div>

    <button
      @click="prev"
      :disabled="isAnimating"
      class="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/40 text-white p-3 rounded-full backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all duration-300 disabled:opacity-0"
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
      class="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/40 text-white p-3 rounded-full backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all duration-300 disabled:opacity-0"
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

    <div class="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2.5 z-20">
      <!--suppress JSUnusedLocalSymbols -->
      <button
        v-for="(_, index) in photos"
        :key="index"
        @click="goTo(index)"
        class="h-1.5 rounded-full transition-all duration-500"
        :class="displayIndex === index
        ? 'bg-white w-8'
        : 'bg-white/40 w-2'"
      >
      </button>
    </div>
  </div>
</template>
