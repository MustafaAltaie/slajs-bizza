<script setup>
import { ref } from 'vue';
import { useOrderHistory } from '../composables/useOrderHistory';

// Import composable for order history
const { orders, fetchOrderHistory } = useOrderHistory();
const customerTel = ref('');

// Fetch orders based on customer telephone number
const fetchOrders = () => {
  if (customerTel.value.trim()) {
    fetchOrderHistory(customerTel.value.trim());
  } else {
    alert('Please enter a valid phone number.');
  }
};
</script>

<template>
  <div>
    <h1>Order History</h1>
    <!-- Input for phone number -->
    <input 
      type="text" 
      v-model="customerTel" 
      placeholder="Enter phone number" 
      aria-label="Customer Phone Number" 
    />
    <button @click="fetchOrders">Fetch Orders</button>
    
    <!-- Order list -->
    <ul v-if="orders?.length">
      <li v-for="order in orders" :key="order.id">
        <p><strong>Order ID:</strong> {{ order.id }}</p>
        <p><strong>Items:</strong> {{ order.items?.join(', ') || 'No items available' }}</p>
        <p><strong>Date:</strong> {{ order.date || 'No date available' }}</p>
      </li>
    </ul>
    <p v-else>No orders found. Please check the phone number.</p>
  </div>
</template>

<style scoped>
h1 {
  font-size: 1.5em;
  margin-bottom: 1em;
}
input {
  margin-right: 1em;
  padding: 0.5em;
  font-size: 1em;
}
button {
  padding: 0.5em 1em;
  font-size: 1em;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
button:hover {
  background-color: #0056b3;
}
ul {
  margin-top: 1em;
  list-style: none;
  padding: 0;
}
li {
  background: #f9f9f9;
  margin-bottom: 1em;
  padding: 1em;
  border-radius: 4px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
}
p {
  margin: 0.5em 0;
}
</style>
