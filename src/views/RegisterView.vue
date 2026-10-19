<script setup>
import { computed, ref } from 'vue'
import { useUserStore } from '@/stores/user'
import AuthLayout from '@/components/AuthLayout.vue'
import FormField from '@/components/FormField.vue'

const userStore = useUserStore()
const email = ref('')
const password = ref('')
const validForm = computed(() => email.value !== '' && password.value !== '')

const handleSubmit = () => {
  if (!validForm.value) return
  userStore.registerUser(email.value, password.value)
}
</script>

<template>
  <AuthLayout
    eyebrow="EMPIEZA GRATIS"
    title="Crea tu cuenta"
    subtitle="Guarda tus enlaces favoritos en un solo lugar."
    footer-text="¿Ya tienes cuenta?"
    link-text="Inicia sesión"
    link-to="/login"
  >
    <form class="auth-form" @submit.prevent="handleSubmit">
      <FormField
        id="email"
        v-model="email"
        label="Correo electrónico"
        type="email"
        placeholder="nombre@ejemplo.com"
        autocomplete="email"
        trim
      />
      <FormField
        id="password"
        v-model="password"
        label="Contraseña"
        type="password"
        placeholder="Crea una contraseña"
        autocomplete="new-password"
        minlength="6"
      >
        <div class="form-text">Usa al menos 6 caracteres.</div>
      </FormField>
      <button class="btn btn-primary w-100 auth-submit" type="submit" :disabled="!validForm">
        Crear cuenta
        <i class="bi bi-arrow-right" aria-hidden="true"></i>
      </button>
    </form>
  </AuthLayout>
</template>
