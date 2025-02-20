<template>
  <v-sheet class="d-flex align-center justify-center">
    <v-sheet class="ma-2 pa-2 d-flex flex-column align-center justify-center text-center">
      <h2>Админка</h2>
      <ImageUpload />
      <Form />
      <div v-if="images.length > 0" class="mt-4">
        <h3>Список изображений</h3>
        <div v-for="image in images" :key="image.id" class="mb-4">
          <img :src="image.urlImage" :alt="image.name" class="img-thumbnail" />
        </div>
      </div>
      <div v-else class="mt-4">
        <p>Нет изображений для отображения.</p>
      </div>
    </v-sheet>
  </v-sheet>
</template>

<script setup>
import ImageUpload from '~/components/ImageUpload.vue';
import Form from '~/components/Form.vue';
// Состояние для списка изображений
const images = useState('images', () => []);

// Загружаем список изображений с бэкенда
const { data, error } = await useFetch('http://localhost:3001/api/images');

if (error.value) {
  console.error('Ошибка при получении изображений:', error.value);
} else if (data.value) {
  images.value = data.value.allImages; // Помещаем изображения в стейт
}
</script>

<style scoped>
/* Стили для админки */
.img-thumbnail {
  max-width: 200px;
  max-height: 200px;
  object-fit: cover;
  margin: 10px;
}
</style>
