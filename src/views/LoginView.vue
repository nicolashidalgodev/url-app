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
  userStore.loginUser(email.value, password.value)
}
</script>

<template>
  <AuthLayout
    eyebrow="QUÉ BUENO VERTE"
    title="Inicia sesión"
    subtitle="Accede a tus enlaces guardados."
    footer-text="¿Aún no tienes cuenta?"
    link-text="Regístrate gratis"
    link-to="/register"
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
        placeholder="Ingresa tu contraseña"
        autocomplete="current-password"
      />
      <button class="btn btn-primary w-100 auth-submit" type="submit" :disabled="!validForm">
        Iniciar sesión
        <i class="bi bi-arrow-right" aria-hidden="true"></i>
      </button>
    </form>
  </AuthLayout>
</template>
