<script setup>
defineProps({
  title: { type: String, required: true },
  subtitle: { type: String, required: true },
  footerText: { type: String, required: true },
  linkText: { type: String, required: true },
  linkTo: { type: String, required: true }
})
</script>

<template>
  <main class="auth-page">
    <section class="auth-card">
      <div class="auth-illustration">
        <span class="auth-illustration-orbit orbit-one"></span>
        <span class="auth-illustration-orbit orbit-two"></span>
        <div class="auth-illustration-mark" aria-hidden="true">
          <i class="bi bi-link-45deg"></i>
        </div>
      </div>
      <div class="auth-content">
        <h1>{{ title }}</h1>
        <hr>
        <slot />

        <p class="auth-switch">
          {{ footerText }}
          <router-link :to="linkTo">{{ linkText }}</router-link>
        </p>
      </div>
    </section>
  </main>
</template>
