<template>
  <div>
    <h1>Главная страница</h1>
    <SwiperCarousel :feedback="feedback" />
  </div>
</template>

<script setup>
import { useSocket } from '~/composables/useSocket';
import SwiperCarousel from '~/components/SwiperCarousel.vue';

const { feedback } = useSocket('http://localhost:3001');
</script>

<style scoped>
/* Стили для главной страницы */
</style>
