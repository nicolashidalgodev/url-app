<script setup>
import { computed, onUnmounted, ref } from 'vue'
import { useUserStore } from '@/stores/user'
import { useDatabaseStore } from '@/stores/database'
import FormField from '@/components/FormField.vue'

const userStore = useUserStore()
const databaseStore = useDatabaseStore()
const url = ref('')
const snackbarMessage = ref('')
const snackbarError = ref(false)
let snackbarTimeout

databaseStore.getUrls()

const linkCount = computed(() => databaseStore.documents.length)

const handleSubmit = async () => {
  if (!url.value) return
  await databaseStore.addUrl(url.value)
  url.value = ''
}

const showSnackbar = (message, isError = false) => {
  snackbarMessage.value = message
  snackbarError.value = isError
  window.clearTimeout(snackbarTimeout)
  snackbarTimeout = window.setTimeout(() => {
    snackbarMessage.value = ''
  }, 3000)
}

const getSafeExternalUrl = (value) => {
  try {
    const parsedUrl = new URL(value)
    return ['http:', 'https:'].includes(parsedUrl.protocol) ? parsedUrl.href : null
  } catch {
    return null
  }
}

const copyLink = async (value) => {
  const targetUrl = getSafeExternalUrl(value)
  if (!targetUrl) {
    showSnackbar('Este enlace no tiene una dirección web válida.', true)
    return
  }

  window.open(targetUrl, '_blank', 'noopener,noreferrer')

  try {
    await navigator.clipboard.writeText(targetUrl)
    showSnackbar('Enlace copiado y abierto en una pestaña nueva')
  } catch (error) {
    console.error('No se pudo copiar el enlace:', error)
    showSnackbar('El enlace se abrió, pero no se pudo copiar.', true)
  }
}

onUnmounted(() => window.clearTimeout(snackbarTimeout))
</script>

<template>
  <main class="dashboard-page">
    <section class="dashboard-hero">
      <div class="container">
        <div class="hero-copy">
          <span class="eyebrow">TU ESPACIO DIGITAL</span>
          <h1>Hola, {{ userStore.userData?.email?.split('@')[0] || 'bienvenido' }} <span aria-hidden="true">👋</span></h1>
          <p>Organiza tus recursos favoritos y accede a ellos fácilmente cuando los necesites.</p>
        </div>

        <div class="dashboard-summary">
          <div class="summary-icon" aria-hidden="true">
            <i class="bi bi-link-45deg"></i>
          </div>
          <div>
            <span class="summary-label">ENLACES GUARDADOS</span>
            <strong>{{ linkCount }}</strong>
          </div>
        </div>
      </div>
    </section>

    <section class="container dashboard-content"> 

      <form class="add-link-card" @submit.prevent="handleSubmit">
        <div class="add-link-icon" aria-hidden="true">
          <i class="bi bi-plus-lg"></i>
        </div>
        <FormField
          id="new-url"
          v-model="url"
          class="add-link-field"
          label="Agregar un enlace"
          type="url"
          placeholder="https://ejemplo.com/mi-articulo"
          trim
        />
        <button class="btn btn-primary add-link-button" type="submit" :disabled="!url">
          Guardar enlace
          <i class="bi bi-arrow-up-right" aria-hidden="true"></i>
        </button>
      </form>

      <div class="links-heading">
        <div>
          <h2>Mis enlaces</h2>
          <span>{{ linkCount }} {{ linkCount === 1 ? 'enlace guardado' : 'enlaces guardados' }}</span>
        </div>
      </div>

      <div v-if="databaseStore.loadingDoc" class="links-loading">
        <span class="spinner-border spinner-border-sm text-primary" aria-hidden="true"></span>
        <span>Cargando tus enlaces...</span>
      </div>

      <div v-else-if="!linkCount" class="empty-state">
        <div class="empty-state-icon" aria-hidden="true">
          <i class="bi bi-arrow-up-right"></i>
        </div>
        <h3>Tu colección empieza aquí</h3>
        <p>Agrega tu primer enlace usando el formulario de arriba. Lo tendrás siempre a mano.</p>
      </div>

      <div v-else class="link-list">
        <article v-for="item in databaseStore.documents" :key="item.id" class="link-card">
          <div class="link-card-icon" aria-hidden="true">
            <i class="bi bi-box-arrow-up-right"></i>
          </div>
          <div class="link-card-details">
            <h3>
              <a
                v-if="getSafeExternalUrl(item.name)"
                class="link-card-url"
                :href="getSafeExternalUrl(item.name)"
                target="_blank"
                rel="noopener noreferrer"
              >
                {{ item.name }}
              </a>
              <span v-else>{{ item.name }}</span>
            </h3>
            <div class="link-card-short">
              <span>Código · {{ item.short }}</span>
              <button
                class="copy-code-button"
                type="button"
                :aria-label="`Copiar enlace ${item.name} y abrirlo en una pestaña nueva`"
                title="Copiar y abrir enlace"
                @click="copyLink(item.name)"
              >
                <i class="bi bi-clipboard" aria-hidden="true"></i>
              </button>
            </div>
          </div>
          <div class="link-card-actions">
            <router-link class="btn btn-light btn-sm" :to="`/editar/${item.id}`">Editar</router-link>
            <button
              class="btn btn-light btn-sm delete-button"
              type="button"
              :aria-label="`Eliminar ${item.name}`"
              @click="databaseStore.deleteUrl(item.id)"
            >
              Eliminar
            </button>
          </div>
        </article>
      </div>
    </section>

    <Transition name="snackbar">
      <div
        v-if="snackbarMessage"
        class="copy-snackbar"
        :class="{ 'copy-snackbar-error': snackbarError }"
        role="status"
        aria-live="polite"
      >
        <i
          class="bi"
          :class="snackbarError ? 'bi-exclamation-circle' : 'bi-clipboard-check'"
          aria-hidden="true"
        ></i>
        <span>{{ snackbarMessage }}</span>
      </div>
    </Transition>
  </main>
</template>
