<template>
  <div class="swiper-container">
    <swiper
        :slides-per-view="3"
        :space-between="20"
        :loop="true"
        :navigation="true"
        :pagination="{ clickable: true }"
        :autoplay="{ delay: 3000 }"
        @swiper="onSwiper"
        @slideChange="onSlideChange"
    >
      <swiper-slide v-for="(item, index) in items" :key="index">
        <v-card class="slide-content">
          <v-card-title>{{ item.title }}</v-card-title>
          <v-card-text>{{ item.description }}</v-card-text>
        </v-card>
      </swiper-slide>
    </swiper>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/swiper-bundle.css';

const items = ref([
  { title: 'Slide 1', description: 'Описание для слайда 1' },
  { title: 'Slide 2', description: 'Описание для слайда 2' },
  { title: 'Slide 3', description: 'Описание для слайда 3' },
  { title: 'Slide 4', description: 'Описание для слайда 4' },
  { title: 'Slide 5', description: 'Описание для слайда 5' },
]);

const onSwiper = (swiper) => {
  console.log('Swiper initialized:', swiper);
};

const onSlideChange = () => {
  console.log('Slide changed');
};

// Подключаем модули Swiper
const modules = [Navigation, Pagination, Autoplay];
</script>
