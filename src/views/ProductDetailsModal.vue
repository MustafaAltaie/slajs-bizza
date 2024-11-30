<script setup>
import { defineProps, defineEmits } from 'vue';

// Props for item and visibility
const props = defineProps({
  selectedItem: {
    type: Object,
    required: true,
  },
  isModalVisible: {
    type: Boolean,
    required: true,
  },
});

// Emit close event and add to cart event
const emit = defineEmits(['closeModal', 'handleAddToCart']);

// Close the modal
const closeModal = () => {
  emit('closeModal');
};

// Add item to the cart
const addItemToCart = () => {
  emit('handleAddToCart', props.selectedItem);  // Emit the item to be added to cart
};
</script>

<template>
  <div v-if="isModalVisible" class="modal">
    <div class="modal-content">
      <!-- Close Button -->
      <button class="close-btn" @click="closeModal" aria-label="Close">X</button>

      <!-- Item Details -->
      <h2 id="modal-title">{{ selectedItem?.name || 'No Name Available' }}</h2>
      <p>{{ selectedItem?.description || 'No description available' }}</p>
      <p><strong>Price:</strong> {{ selectedItem?.price || 0 }} SEK</p>

      <!-- Ingredients -->
      <h3>Ingredients:</h3>
      <div>
        <h4 v-for="ingredient in selectedItem?.toppings || []" :key="ingredient">
          {{ ingredient }}
        </h4>
      </div>

      <!-- Allergens -->
      <h3>Allergens:</h3>
      <p>{{ selectedItem?.allergens?.join(', ') || 'None' }}</p>

      <!-- Add to Cart Button -->
      <button @click="addItemToCart" class="add-to-cart-btn">Add to Cart</button>
    </div>
  </div>
</template>

<style scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background: #fff;
  padding: 20px;
  border-radius: 10px;
  width: 400px;
  text-align: center;
  position: relative;
}

.close-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  color: #333;
}

.close-btn:hover {
  color: #000;
}

.add-to-cart-btn {
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.add-to-cart-btn:hover {
  background-color: #218838;
}
</style>
