<template>
  <v-sheet class="d-flex flex-column align-center justify-center">
    <h2>Админка</h2>
    <v-sheet class="ma-2 pa-2 d-flex flex-column align-center justify-center text-center">
      <Form :images="images" />
    </v-sheet>
    <v-sheet class="ma-2 pa-2 d-flex flex-column align-center justify-center text-center">
      <div v-if="images.length > 0" class="mt-4">
        <h3>Изображения для вставки в отзыв</h3>
        <v-row class="d-flex" dense>
          <v-col
              v-for="image in images"
              :key="image.id"
              cols="auto"
              class="d-flex align-center justify-center"
          >
            <img :src="image.urlImage" :alt="image.name" class="img-thumbnail" />
          </v-col>
        </v-row>
      </div>
      <div v-else class="mt-4">
        <p>Нет изображений для отображения.</p>
      </div>
      <ImageUpload />
    </v-sheet>
  </v-sheet>
</template>

<script setup>
import { computed } from 'vue';
import ImageUpload from '~/components/ImageUpload.vue';
import Form from '~/components/Form.vue';

// Используем useFetch напрямую
const { data: imagesData, error } = useFetch('http://localhost:3001/api/images');

const images = computed(() => imagesData.value?.allImages || []);

if (error.value) {
  console.error('Ошибка при получении изображений:', error.value);
}
</script>

<style scoped>
.img-thumbnail {
  max-width: 180px;
  max-height: 180px;
  object-fit: cover;
  margin: 10px;
}
</style>
