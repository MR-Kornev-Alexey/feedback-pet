<template>
  <v-container>
    <header>
      <h1>Мой сайт</h1>
      <nav>
        <NuxtLink to="/">Главная</NuxtLink> |
        <NuxtLink to="/admin">Админка</NuxtLink>
      </nav>
    </header>
    <main>
      <slot /> <!-- Сюда будут подставляться страницы -->
    </main>
    <footer>
      <p>&copy; 2023 Мой сайт</p>
    </footer>
    </v-container>
</template>

<style>
/* Общие стили для макета */
</style>
