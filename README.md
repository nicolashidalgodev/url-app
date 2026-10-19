# url-short

Aplicación Vue 3 + Vite para guardar enlaces con Firebase.

## Configuración de Firebase

Copia `.env.example` a `.env.local` y completa los valores de la configuración
de tu aplicación web de Firebase. `.env.local` está excluido de Git.

La API key web de Firebase se incluye en el bundle del navegador y no es un
secreto. Protege el proyecto con reglas de Firestore, Firebase App Check y
restricciones apropiadas para la API key en Google Cloud Console.

## Desplegar en GitHub Pages

1. Sube el proyecto a un repositorio de GitHub. Si el repositorio se llama
   `url-short`, la dirección predeterminada será
   `https://<tu-usuario-github>.github.io/url-short/`.
2. En el repositorio, abre **Settings > Pages** y selecciona **GitHub Actions**
   como origen del despliegue.
3. Añade estos **Actions secrets** del repositorio en **Settings > Secrets and
   variables > Actions**, usando los valores correspondientes de tu
   `.env.local`:
   - `VITE_FIREBASE_API_KEY`
   - `VITE_FIREBASE_AUTH_DOMAIN`
   - `VITE_FIREBASE_PROJECT_ID`
   - `VITE_FIREBASE_STORAGE_BUCKET`
   - `VITE_FIREBASE_MESSAGING_SENDER_ID`
   - `VITE_FIREBASE_APP_ID`
4. Integra o sube el workflow a la rama `main`. GitHub Actions compilará la app
   y publicará `dist/`. También puedes iniciar un despliegue manual desde la
   pestaña **Actions**.
5. En Firebase Authentication, añade `<tu-usuario-github>.github.io` a los
   dominios autorizados. Si luego usas un dominio propio, añade también ese
   dominio.

El workflow calcula la ruta base de Vite a partir del nombre del repositorio,
para que los recursos y Vue Router funcionen bajo `/url-short/`. Vue Router usa
rutas hash para permitir la navegación y recarga en GitHub Pages.

### Dominio propio

Configura el dominio y sus registros DNS en **Settings > Pages**. Después,
añade una variable de Actions llamada `VITE_BASE_PATH` con el valor `/` para
que Vite sirva los recursos desde la raíz del dominio. Opcionalmente, añade una
variable `CUSTOM_DOMAIN` con el dominio (sin `https://`) para incluir un
archivo `CNAME` en el despliegue.

La API key web de Firebase seguirá visible en el bundle publicado aunque se
configure como Actions secret: los secrets evitan subir valores al código, pero
no los ocultan dentro de una aplicación cliente.

## Recommended IDE Setup

[VS Code](https://code.visualstudio.com/) + [Vue (Official)](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Recommended Browser Setup

- Chromium-based browsers (Chrome, Edge, Brave, etc.):
  - [Vue.js devtools](https://chromewebstore.google.com/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd)
  - [Turn on Custom Object Formatter in Chrome DevTools](http://bit.ly/object-formatters)
- Firefox:
  - [Vue.js devtools](https://addons.mozilla.org/en-US/firefox/addon/vue-js-devtools/)
  - [Turn on Custom Object Formatter in Firefox DevTools](https://fxdx.dev/firefox-devtools-custom-object-formatters/)

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```
