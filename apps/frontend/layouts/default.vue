<template>
  <v-container class="flex flex-col justify-center items-center" >
    <header class="header">
      <h1 >Отзывы</h1>
      <nav class="nav">
        <NuxtLink to="/">Главная</NuxtLink> |
        <NuxtLink to="/admin">Админка</NuxtLink>
      </nav>
    </header>
    <main>
      <slot /> <!-- Сюда будут подставляться страницы -->
    </main>
    <footer class="footer">
      <p>&copy; 2025 Kornev Alexey</p>
    </footer>
    </v-container>
</template>

<style scoped>
.header, .footer {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  margin-bottom: 2rem;
}

</style>
