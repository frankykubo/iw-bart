<script setup lang="ts">
</script>

<template>
    <div class="not-found">
        <h1>404 - Stránka nebola nájdená</h1>
        <p>Stránka, ktorú hľadáte, neexistuje.</p>
        <router-link :to="{ name: 'home' }" class="bg-gray-300 hover:bg-gray-400 px-2 py-1 rounded-lg">Prejsť na domovskú
            stránku
            fotogalérie</router-link>
    </div>
</template>
  
<style scoped>
.not-found {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100dvh;
    padding: 2rem;
    text-align: center;
}

h1 {
    font-size: 3rem;
    font-weight: bold;
    margin-bottom: 1rem;
}

p {
    font-size: 1.5rem;
    margin-bottom: 1rem;
}
</style>