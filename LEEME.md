# Publicar Seed en GitHub Pages

Esta carpeta tiene dos archivos:

- `index.html` — la app completa
- `version.json` — el número de versión que la app consulta

## Pasos (una sola vez)

1. Entra a github.com y crea un repositorio nuevo, público, llamado `seed`.
2. Botón **Add file → Upload files**. Arrastra `index.html` y `version.json`. **Commit changes**.
3. En el repo: **Settings → Pages**. En *Source* elige `Deploy from a branch`, rama `main`, carpeta `/ (root)`. **Save**.
4. Espera un minuto. Tu dirección fija queda así:
   `https://TU-USUARIO.github.io/seed/`
5. Abre esa dirección en Chrome del celular → menú ⋮ de Chrome → **Agregar a pantalla de inicio**.

Esa dirección no caduca nunca.

## Cada vez que cambiemos algo

Yo te entrego los dos archivos actualizados (`version.json` con un número nuevo).
Tú los subes al repo con **Add file → Upload files** y confirmas reemplazar.

En tu celular, la app revisa `version.json` al abrirla y cada cinco minutos.
Cuando ve un número distinto, aparece arriba la barra **"Hay una versión nueva de Seed · Actualizar"**.
Le das clic y queda exactamente como la dejamos aquí. Tus datos no se borran.
