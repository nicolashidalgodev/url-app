<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useDatabaseStore } from '@/stores/database'
import FormField from '@/components/FormField.vue'

const route = useRoute()
const databaseStore = useDatabaseStore()
const url = ref('')

onMounted(async () => {
  url.value = await databaseStore.readUrl(route.params.id)
})

const handleSubmit = () => {
  if (!url.value) return
  databaseStore.updateUrl(route.params.id, url.value)
}
</script>

<template>
  <main class="edit-page">
    <section class="edit-card">
      <router-link class="back-link" to="/">
        <span aria-hidden="true">←</span>
        Volver a mis enlaces
      </router-link>

      <div class="edit-heading">
        <div class="edit-icon" aria-hidden="true">
          <i class="bi bi-pencil-square"></i>
        </div>
        <span class="eyebrow">ACTUALIZA TU COLECCIÓN</span>
        <h1>Editar enlace</h1>
        <p>Modifica la dirección de tu enlace guardado.</p>
      </div>

      <form class="edit-form" @submit.prevent="handleSubmit">
        <FormField
          id="edit-url"
          v-model="url"
          label="Dirección URL"
          type="url"
          placeholder="https://ejemplo.com"
          trim
        />
        <div class="d-flex flex-column-reverse flex-sm-row justify-content-end gap-2 mt-4">
          <router-link class="btn btn-light px-4" to="/">Cancelar</router-link>
          <button class="btn btn-primary px-4" type="submit" :disabled="!url">Guardar cambios</button>
        </div>
      </form>
    </section>
  </main>
</template>
