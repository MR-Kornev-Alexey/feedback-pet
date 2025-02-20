<template>
  <v-sheet class="d-flex flex-column align-center justify-center" max-width="600px">
    <h2 class="text-center">Оцените изображение</h2>

    <!-- Форма -->
    <v-form v-model="isValid" lazy-validation>
      <!-- Поле для имени -->
      <v-text-field
          v-model="formData.customer"
          label="Ваше имя"
          required
      />

      <!-- Поле для оценки -->
      <v-rating
          v-model="formData.stars"
          label="Оценка"
          :max="5"
          required
      />

      <!-- Поле для текста -->
      <v-textarea
          v-model="formData.text"
          label="Ваше сообщение"
          required
      />

      <!-- Селектор изображений -->
      <v-select
          v-model="formData.id"
          :items="images"
          item-text="name"
          item-value="id"
          label="Выберите изображение"
          required
      />

      <!-- Кнопка отправки -->
      <v-btn :disabled="!isValid" @click="submitForm" color="primary">
        Отправить
      </v-btn>
    </v-form>
  </v-sheet>
</template>

<script setup>
import {ref, onMounted} from 'vue';

const formData = ref({
  customer: '',
  stars: null,
  text: '',
  id: null,
});

const images = ref([]);
const isValid = ref(false);

// Получение изображений с сервера при монтировании компонента
onMounted(async () => {
  try {
    const response = await fetch('http://localhost:3001/api/images');
    if (response.ok) {
      const data = await response.json();
      images.value = data.allImages;
    } else {
      console.error('Ошибка при загрузке изображений:', response.statusText);
    }
  } catch (error) {
    console.error('Ошибка при загрузке изображений:', error);
  }
});

// Отправка данных формы
const submitForm = async () => {
  try {
    const response = await fetch('/api/submitRating', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData.value),
    });

    if (response.ok) {
      const data = await response.json();
      alert('Форма успешно отправлена!');
      formData.value = {customer: '', stars: null, text: '', id: null}; // Очистка формы
    } else {
      console.error('Ошибка при отправке формы:', response.statusText);
      alert('Ошибка при отправке формы');
    }
  } catch (error) {
    console.error('Ошибка при отправке формы:', error);
    alert('Ошибка при отправке формы');
  }
};
</script>

<style scoped>
/* Дополнительные стили для формы */
</style>
