# qr-alias-quality

Reemplaza el cartel físico con el alias de **Quality impresiones** por un QR.
El cliente escanea, toca **“Copiar alias”** y transfiere desde su banco o billetera.

- **Landing:** `index.html` — muestra el alias y el botón para copiarlo.
- **Cartel:** `cartel.html` — hoja A4 vertical con el QR, lista para imprimir.

Sin backend, sin base de datos, sin build. HTML + CSS + JS puro.

## Archivos

| Archivo | Qué hace |
|---|---|
| `config.js` | **Nombre, alias y URL del QR.** Lo único que se toca normalmente |
| `index.html` / `estilos.css` / `copiar.js` | Landing con el botón de copiar |
| `cartel.html` / `cartel.css` / `cartel.js` | Cartel imprimible con el QR |
| `vendor/qrcode.js` | Librería del QR ([qrcode-generator](https://github.com/kazuhikoarase/qrcode-generator) 1.4.4, MIT). Va copiada en el repo: no depende de ningún servidor externo |

## Correrlo en local

Desde la carpeta del proyecto:

```bash
python3 -m http.server 8080
```

Abrí <http://localhost:8080> (landing) y <http://localhost:8080/cartel.html> (cartel).

> Abrir el `index.html` con doble clic también anda, pero el botón usa el método viejo de copiado
> porque el navegador solo habilita el portapapeles moderno en `https` o `localhost`.

## Cambiar el alias o el nombre del negocio

1. Editá `config.js` → `negocio` y `alias`.
2. Editá también las etiquetas `og:` y `description` en el `<head>` de `index.html`.
   WhatsApp y los buscadores leen el HTML sin ejecutar JavaScript, así que ahí el texto va fijo.
3. Volvé a publicar y **reimprimí el cartel** (el alias está escrito en la hoja).

## Cambiar la URL del QR

1. Editá `config.js` → `urlLanding` (con `https://` y la barra final).
2. Editá `og:url` en `index.html`.
3. Publicá, abrí `cartel.html` y verificá debajo del botón de imprimir a qué URL apunta el QR.
4. Escanealo con el celular antes de imprimir.

⚠️ El QR impreso apunta a una URL fija. Si la URL cambia, el cartel viejo deja de servir: hay que reimprimir.

## Imprimir el cartel

Abrí `cartel.html` → **Imprimir cartel (A4)**. En el diálogo: papel A4, vertical, márgenes “Ninguno”, escala 100 %.

## Publicar

### GitHub Pages (lo que está usando ahora)

Publicado en <https://lucianogukre.github.io/qr-alias-quality/>.
Cada `git push` a `main` actualiza el sitio solo (tarda ~1 minuto).

Para crearlo de cero en otra cuenta:

```bash
gh repo create qr-alias-quality --public --source=. --push
gh api -X POST repos/<usuario>/qr-alias-quality/pages -f "source[branch]=main" -f "source[path]=/"
```

### Vercel (alternativa)

```bash
vercel deploy --prod
```

Ojo: en Vercel los proyectos nuevos pueden quedar con “Deployment Protection” (piden login).
Desactivalo en Settings → Deployment Protection, si no el cliente no puede abrir la página.
