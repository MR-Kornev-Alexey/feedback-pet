<template>
  <div v-if="feedback.length > 0">
    <h2>Отзывы</h2>
    <!-- Пример без Swiper: просто список отзывов -->
    <div v-for="item in feedback" :key="item.id" class="feedback-item">
      <h3>{{ item.customer }} ({{ item.stars }} ★)</h3>
      <p>{{ item.text }}</p>
      <img :src="item.urlImage" :alt="item.customer" class="feedback-img" />
    </div>
  </div>
  <div v-else>
    <p>Нет отзывов для отображения.</p>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  feedback: {
    type: Array,
    default: () => [],
  },
});
</script>

<style scoped>
.feedback-item {
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-bottom: 10px;
  padding: 10px;
}

.feedback-img {
  max-width: 100px;
  max-height: 100px;
  object-fit: cover;
}
</style>
