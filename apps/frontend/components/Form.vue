<template>
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
</template>

<script setup>
import { ref, defineProps } from 'vue';

// Объявляем пропс images
const props = defineProps({
  images: {
    type: Array,
    default: () => [],
  },
});

const formData = ref({
  customer: '',
  stars: null,
  text: '',
  id: null,
});

const isValid = ref(false);

const submitForm = async () => {
  try {
    const response = await fetch('http://localhost:3001/api/submitRating', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData.value),
    });

    if (response.ok) {
      alert('Форма успешно отправлена!');
      // Очистка формы
      formData.value = { customer: '', stars: null, text: '', id: null };
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
