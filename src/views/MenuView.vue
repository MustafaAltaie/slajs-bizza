<template>
    <div>
      <p v-if="loading">Loading menu...</p>
    
      <p v-if="error">{{ error }}</p>
    
      <div v-else>
        <div v-for="(items, type) in groupedMenu" :key="type" class="menu-section">
            <h1>Slajs {{ type }} Menu</h1>
          <ul>
            <li v-for="item in items" :key="item.id">
              <h3>{{ item.name }} - {{ item.price }} SEK</h3>
              <p>{{ item.description }}</p>
              <small>Ingredients: {{ item.toppings && Array.isArray(item.toppings) ? item.toppings.join(', ') : 'No toppings' }}</small>
              <img :src="item.imgUrl" alt="Image of {{ item.name }}" width="150">
            </li>
          </ul>
        </div>
      </div>
    </div>
  </template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useMenu } from '../composables/useMenu';

const { menu, loading, error, fetchMenu } = useMenu();

const groupedMenu = computed(() => {
  if (menu.value && Array.isArray(menu.value)) {
    const grouped = menu.value.reduce((acc, item) => {
      acc[item.type] = acc[item.type] || [];
      acc[item.type].push(item);
      return acc;
    }, {});
    console.log('Grouped Menu:', grouped);
    return grouped;
  }
  return {};
});

onMounted(() => {
  fetchMenu();
});
</script>

<style>
*{
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}
body{
    background-image: url('https://cdn.pixabay.com/photo/2014/09/17/20/26/restaurant-449952_1280.jpg');
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    background-attachment: fixed;
}
h1{
    background: #ffffffaa;
    padding: 30px;
    text-align: center;
}
ul{
    list-style: none;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 50px;
    background: #ffffffaa;
    width: 100%;
}
li{
    width: 300px;
    background: #eeeeeec9;
    box-shadow: 0 0 10px #00000033;
    padding: 20px;
    border-radius: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    gap: 20px;
    cursor: pointer;
    transition: 0.3s;
}
li:hover{
    transform: translateY(-10px);
}
h3{
    color: blue;
}
</style>