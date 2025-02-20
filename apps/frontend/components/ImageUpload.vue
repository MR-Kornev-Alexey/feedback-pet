<template>
  <v-container class="d-flex flex-column align-center justify-center">
    <v-card class="pa-4" max-width="500">
      <v-card-title>Загрузка изображений</v-card-title>
      <v-card-text>
        <v-file-input
            v-model="selectedFiles"
            label="Выберите изображения"
            accept="image/*"
            multiple
            prepend-icon="mdi-camera"
            show-size
            @change="previewImages"
        />

        <v-row>
          <v-col v-for="(image, index) in previewUrls" :key="index" cols="4">
            <v-img :src="image" class="rounded" height="80" contain></v-img>
          </v-col>
        </v-row>
      </v-card-text>

      <v-card-actions>
        <v-btn color="primary" :disabled="!selectedFiles.length" @click="uploadImages">
          Отправить
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script setup>
import { ref } from "vue";

const selectedFiles = ref([]);
const previewUrls = ref([]);

const previewImages = () => {
  previewUrls.value = selectedFiles.value.map((file) => URL.createObjectURL(file));
};

const uploadImages = async () => {
  if (!selectedFiles.value.length) return;

  const formData = new FormData();
  selectedFiles.value.forEach((file) => {
    formData.append("files", file);
  });

  try {
    const response = await fetch("http://localhost:3001/upload", {
      method: "POST",
      body: formData,
    });

    if (response.ok) {
      console.log("Файлы успешно загружены");
      selectedFiles.value = [];
      previewUrls.value = [];
    } else {
      console.error("Ошибка загрузки файлов");
    }
  } catch (error) {
    console.error("Ошибка сети", error);
  }
};
</script>

<style scoped>
.v-container {
  min-height: 100vh;
}
</style>
