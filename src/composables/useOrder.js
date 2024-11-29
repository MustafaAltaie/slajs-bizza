import { ref } from 'vue'
import axios from 'axios'

export function useOrder() {
  const cart = ref([])

  const addItemToCart = (item) => {
    cart.value.push(item)
  }

  const placeOrder = async (customerTel) => {
    const response = await Promise.all(
      cart.value.map(item =>
        axios.post('https://6ldruff9ul.execute-api.eu-north-1.amazonaws.com/orders', {
          item: item.id,
          customerTel
        }, {
          headers: {
            'x-zocom': 'your-api-key',
            'Content-Type': 'application/json'
          }
        })
      )
    )
    cart.value = [] // Clear the cart after order
    return response
  }

  return { cart, addItemToCart, placeOrder }
}
