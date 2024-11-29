<script setup>
import { computed, onMounted, ref } from 'vue';
import { useMenu } from '../composables/useMenu';
import { useOrder } from '../composables/useOrder';
import ProductDetailsModal from './ProductDetailsModal.vue';

const { menu, loading, error, fetchMenu } = useMenu();
const { cart, addItemToCart } = useOrder();

const typeList = ref([]);

onMounted(() => {
  fetchMenu();
});

const groupedMenu = computed(() => {
  if (menu.value && Array.isArray(menu.value)) {
    const grouped = menu.value.reduce((acc, item) => {
      acc[item.type] = acc[item.type] || [];
      acc[item.type].push(item);
      typeList.value = Object.keys(acc);
      return acc;
    }, {});
    return grouped;
  }
  return {};
});

const selectedItem = ref(null);
const isModalVisible = ref(false);

const showDetails = (item) => {
  selectedItem.value = item;
  isModalVisible.value = true;
};

const closeModal = () => {
  isModalVisible.value = false;
  selectedItem.value = null;
};

const handleAddToCart = (item) => {
  addItemToCart(item);
  closeModal();
};
</script>

<template>
  <div>
    <h3 v-if="loading">Loading menu...</h3>

    <p v-if="error">{{ error }}</p>

    <div v-else>
      <nav>
        <p v-for="type in typeList" :key="type" @click="scrollTo(`${type}Menu`)">{{ type.toUpperCase() }}</p>
      </nav>
      <div v-for="(items, type) in groupedMenu" :key="type" class="menu-section">
        <h1>{{ type.toUpperCase() }} MENU</h1>
        <ul :id="`${type}Menu`">
          <li v-for="item in items" :key="item.id" @click="showDetails(item)">
            <h3>{{ item.name }} - <span>{{ item.price }} SEK</span></h3>
            <p>{{ item.description }}</p>
            <small><span>Ingredients:</span> {{ item.toppings?.join(', ') || 'No toppings' }}</small>
            <img :src="item.imgUrl" alt="Image of {{ item.name }}" width="150">
          </li>
        </ul>
        <ProductDetailsModal 
          :item="selectedItem" 
          :visible="isModalVisible" 
          @close="closeModal" 
          @addToCart="handleAddToCart" 
        />
      </div>
    </div>

    <!-- Display cart contents -->
    <div v-if="cart.length" class="cart-info">
      <h2>Your Cart</h2>
      <ol>
        <li v-for="(item, index) in cart" :key="index">
          {{ item.name }} - {{ item.price }} SEK
        </li>
      </ol>
      <p>Total Items: {{ cart.length }}</p>
    </div>
  </div>
</template>


<style>
*{
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  font-family: sans-serif;
}
body{
  background-image: url('https://cdn.pixabay.com/photo/2014/09/17/20/26/restaurant-449952_1280.jpg');
  background-position: center;
  background-repeat: no-repeat;
  background-size: 100% 100%;
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
  padding-bottom: 50px;
}
ul > li{
  width: 300px;
  background: #eeeeeec9;
  box-shadow: 0 0 10px #00000011;
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
ul > li:hover{
  background: #eeeeee;
  box-shadow: 0 0 10px #00000044;
}
p{
  color: #555;
}
h3{
  color: #07a;
}
h3 > span{
  color: #057;
}
small{
  color: #777;
}
small > span{
  color: #111;
  font-weight: bold;
}
nav{
  position: fixed;
  background: #fff;
  display: flex;
  border-radius: 10px;
  overflow: hidden;
  transform: translate(10px, 10px);
  border: solid 1px #aaa;
}
nav > p{
  padding: 15px;
  border-right: solid 1px #aaa;
  cursor: pointer;
  user-select: none;
  margin-right: -1px;
}
.cart-info{
  position: fixed;
  top: 0;
  right: 0;
  width: 300px;
  background: #ffffffaa;
}
</style>