import { ref } from 'vue';
import axios from 'axios';

export function useOrderHistory() {
  const orders = ref([]);
  const fetchOrderHistory = async (customerTel) => {
    try {
      if (!customerTel.trim()) {
        throw new Error('Customer telephone number is required.');
      }
      const response = await axios.get('https://6ldruff9ul.execute-api.eu-north-1.amazonaws.com/orders', {
        headers: {
          'x-zocom': 'sp-7BTxHCyHhzIME5TI',
          'Content-Type': 'application/json'
        },
        params: { customerTel: customerTel.trim() }
      });
      orders.value = response.data || [];
    } catch (error) {
      console.error('Error fetching order history:', error.message || error);
      orders.value = []; // Reset orders if there's an error
    }
  };

  return { orders, fetchOrderHistory };
}
