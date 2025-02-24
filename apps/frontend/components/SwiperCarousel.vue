<template>
  <v-sheet class="mx-auto" elevation="3" max-width="1124">
    <!-- Слайдер -->
    <v-slide-group v-model="currentSlide" class="pa-4" center-active show-arrows>
      <v-slide-group-item
          v-for="n in totalSlides"
          :key="n"
          :value="n"
          v-slot="{ isSelected, toggle }"
      >
        <v-card
            :color="isSelected ? 'primary' : 'grey-lighten-1'"
            class="ma-2"
            height="242"
            width="314"
            @click="toggle"
        >
          <div class="d-flex fill-height align-center justify-center">
            <span class="text-h6">Слайд {{ n }}</span>
          </div>
        </v-card>
      </v-slide-group-item>
    </v-slide-group>

    <!-- Пагинация в виде точек -->
    <div class="pagination-dots">
      <span
          v-for="(p, index) in paginationsIndex"
          :key="index"
          :class="['dot', { active: index === activePage }]"
          @click="setPage(index)"
      ></span>
    </div>
  </v-sheet>
</template>

<script setup>
import { ref, computed, watch } from 'vue'

// Общее количество слайдов (например, 15)
const totalSlides = 15

// Текущий слайд. Будем считать, что currentSlide хранит номер первого слайда в группе.
// Если показываются по 3 слайда, то допустимые значения: 1, 4, 7, 10, 13.
const currentSlide = ref(1)

// Вычисляем количество страниц пагинации, округляя в меньшую сторону.
// Например, если totalSlides = 15 и по 3 слайда, то 15 / 3 = 5 страниц.
const paginationsIndex = computed(() => Math.floor(totalSlides / 3))

// Текущая страница пагинации (индекс начиная с 0).
// Определяем её по currentSlide.
const activePage = computed(() => {
  // Если currentSlide = 1, то страница 0; если 4, то страница 1; и т.д.
  return Math.floor((currentSlide.value - 1) / 3)
})

// При клике на точку пагинации меняем currentSlide так, чтобы отображалась соответствующая группа из 3 слайдов.
const setPage = (pageIndex) => {
  currentSlide.value = pageIndex * 3 + 1
}

// Если, например, currentSlide меняется извне (например, через стрелки),
// можно дополнительно следить за его изменением и корректировать activePage.
// В данном примере activePage вычисляется автоматически.
</script>

<style scoped>
.carousel-wrapper {
  /* если нужно */
}
.pagination-dots {
  display: flex;
  justify-content: center;
  margin-top: 16px;
}
.dot {
  display: inline-block;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: #ccc;
  margin: 0 4px;
  transition: background-color 0.3s;
  cursor: pointer;
}
.dot.active {
  background-color: orange;
}
</style>
