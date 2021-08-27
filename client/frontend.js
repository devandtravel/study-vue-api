Vue.createApp({
  data() {
    return {
      loading: false,
      form: {
        name: 'defaultName',
        value: '+99999999999'
      },
      contacts: []
    }
  },
  computed: {
    canCreateContact() {
      return this.form.value.trim() && this.form.name.trim()
    }
  },
  methods: {
    async createContact() {
      const { ...contact } = this.form
      const newContact = await request('/api/contacts', 'POST', contact)
      this.contacts.push(newContact)
      this.form.name = this.form.value = ''
    },
    async removeContact(id) {
      await request(`/api/contacts/${id}`, 'DELETE')
      this.contacts = this.contacts.filter(contact => contact.id !== id)
    },
    async markContact(id) {
      const contact = this.contacts.find(contact => contact.id === id)
      const markedContact = await request(`/api/contacts/${id}`, 'PUT', { ...contact, marked: true })
      contact.marked = markedContact.marked
    }
  },
  async mounted() {
    this.loading = true
    this.contacts = await request('/api/contacts')
    this.loading = false
  }
})
  .component('loader', {
    template: `<div style="display: flex; justify-content: center; align-items: center;">
    <div class="spinner-border" role="status">
    <span class="visually-hidden">Loading...</span>
    </div>
  </div>`
  })
  .mount('#app')

async function request(url, method = 'GET', data = null) {
  try {
    const headers = {}
    let body = ''
    if (data) {
      headers['Content-Type'] = 'application/json'
      body = JSON.stringify(data)
      const response = await fetch(url, { method, headers, body })
      return response.json()
    }
    if (data === null) {
      const response = await fetch(url, { method, headers })
      return response.json()
    }
  } catch (error) {
    console.warn('Warning:', error.message)
  }
}
