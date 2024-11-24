import { ref } from 'vue'
import axios from 'axios'

export function useMenu() {
  const menu = ref([])
  const loading = ref(false)
  const error = ref(null)

  const fetchMenu = async () => {
    loading.value = true
    error.value = null
    try {
      const response = await axios.get('https://6ldruff9ul.execute-api.eu-north-1.amazonaws.com/menu', {
        headers: { 'x-zocom': 'sp-7BTxHCyHhzIME5TI' },
      })

      console.log('API Response:', response.data)

      if (Array.isArray(response.data.items)) {
        menu.value = response.data.items
      } else {
        menu.value = []
        console.error('Unexpected response format')
      }
    } catch (err) {
      error.value = 'Failed to load menu. Please try again.'
      console.error('API error:', err)
    } finally {
      loading.value = false
    }
  }

  return { menu, loading, error, fetchMenu }
}