<script setup>
import { useUserStore } from './stores/user'

const userStore = useUserStore()
</script>

<template>
  <div class="app-shell">
    <div v-if="userStore.loader" class="loading-screen" role="status" aria-live="polite">
      <span class="spinner-border text-primary" aria-hidden="true"></span>
      <span class="visually-hidden">Cargando...</span>
    </div>

    <template v-else>
      <nav class="navbar navbar-expand-lg app-navbar">
        <div class="container">
          <router-link class="navbar-brand d-flex align-items-center gap-2" to="/">
            <span class="brand-mark" aria-hidden="true">u</span>
            <span>url<span class="brand-accent">short</span></span>
          </router-link>

          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#mainNavigation"
            aria-controls="mainNavigation"
            aria-expanded="false"
            aria-label="Abrir menú"
          >
            <i class="bi bi-list navbar-toggler-icon" aria-hidden="true"></i>
          </button>

          <div id="mainNavigation" class="collapse navbar-collapse">
            <div class="navbar-nav ms-auto align-items-lg-center gap-lg-2">
              <template v-if="userStore.userData">
                <router-link class="nav-link" to="/">Mis enlaces</router-link>
                <div class="nav-user d-flex align-items-center gap-2">
                  <span class="user-avatar" aria-hidden="true">
                    {{ userStore.userData.email?.charAt(0).toUpperCase() || 'U' }}
                  </span>
                  <span class="user-email">{{ userStore.userData.email }}</span>
                </div>
                <button class="btn btn-outline-secondary btn-sm ms-lg-2" @click="userStore.logoutUser">
                  Cerrar sesión
                </button>
              </template>
              <template v-else>
                <router-link class="nav-link" to="/login">Iniciar sesión</router-link>
                <router-link class="btn btn-primary btn-sm px-3" to="/register">
                  Crear cuenta
                </router-link>
              </template>
            </div>
          </div>
        </div>
      </nav>

      <RouterView />

      <footer class="app-footer">
        <div class="container d-flex flex-column flex-sm-row justify-content-between gap-2">
          <!-- <span>Organiza y comparte tus enlaces en un solo lugar.</span>
          <span>Hecho para simplificar.</span> -->
          2026
        </div>
      </footer>
    </template>
  </div>
</template>
