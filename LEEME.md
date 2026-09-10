# Publicar Seed en GitHub Pages

## Archivos de esta carpeta

Sube **todos** al repositorio:

- `index.html` — la app
- `version.json` — el número de versión que dispara el aviso de actualizar
- `sw.js` — hace que la app funcione sin internet y se pueda instalar de verdad
- `manifest.json` — nombre e íconos de la app instalada
- `icon.png`, `icon-192.png`, `icon-maskable.png` — los íconos

## Cada vez que haya una versión nueva

1. Entra a tu repositorio en github.com
2. **Add file → Upload files**
3. Arrastra todos los archivos de esta carpeta
4. **Commit changes** (reemplaza los que ya existen)

En el celular aparece la barra "Hay una versión nueva de Seed · Actualizar".

## Que no se borre del celular

Con `sw.js` en el repositorio, Chrome ofrece **Instalar app** en vez de "Agregar a
pantalla de inicio". Instalada, Seed queda en el cajón de aplicaciones como
cualquier otra app y Android no la borra sola.

Si Chrome no ofrece instalar, el menú ⋮ dentro de la app muestra un botón
**Instalar Seed** cuando el celular lo permite.

## Que no se pierdan los datos

Menú ⋮ dentro de la app → **Respaldo → Guardar copia**. Descarga un archivo
`.json` con todo. Para volver a cargarlo: **Restaurar** y eliges ese archivo.

Recomiéndale a quien le compartas la app que haga una copia de vez en cuando.
