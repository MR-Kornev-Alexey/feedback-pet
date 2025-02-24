<template>
  <v-container>
    <div class="d-flex justify-center align-center my-3">
      <h1 >Главная страница</h1>
    </div>
    <SwiperCarousel :feedback="feedback" />
  </v-container>
</template>

<script setup>
import { useSocket } from '~/composables/useSocket';
import SwiperCarousel from '~/components/SwiperCarousel.vue';

const { feedback } = useSocket('http://localhost:3001');
</script>

<style scoped>
/* Стили для главной страницы */
</style>
