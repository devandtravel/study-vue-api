Vue.createApp({
  data() {
    return {
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
    createContact() {
      const { ...contact } = this.form
      this.contacts.push({ ...contact, id: Date.now(), marked: false })
      this.form.name = this.form.value = ''
    },
    markContact(id) {
      const contact = this.contacts.find(contact => contact.id === id)
      contact.marked = true
    },
    removeContact(id) {
      this.contacts = this.contacts.filter(contact => contact.id !== id)
    }
  }
}).mount('#app')

async function request(url, method = 'GET', data = null) {
  try {
    const headers = {}
    let body = ''
    if (data) {
      headers['Content-Type'] = 'application/json'
      body = JSON.stringify(data)
    }
    const response = await fetch(url, { method, headers, body })
    return response.json()
  } catch (error) {
    console.warn('Warning:', error.message)
  }
}
