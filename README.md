# ✦ Ocho meses, nuestro infinito

Una sorpresa romántica interactiva construida con **HTML, CSS y JavaScript**, sin frameworks, sin instalaciones y sin servidor. Se puede abrir en computadora o celular.

## Cómo verla

1. Abre `index.html` en Chrome, Edge, Firefox o Safari.
2. Desplázate por la página y toca las ocho estrellas.

Si quieres compartirla por WhatsApp y que tu novia la abra desde un enlace, súbela a **GitHub Pages**, **Netlify** o **Vercel**. Debes subir todos los archivos respetando sus carpetas.

## Cómo personalizarla

Abre `config.js` con VS Code o cualquier editor de texto y cambia:

- `destinataria`: nombre de tu novia.
- `de`: tu nombre o firma al terminar la carta.
- `aniversario`: fecha del aniversario.
- `descripcionInicial`: mensaje de bienvenida.
- `capitulos`: ocho títulos, textos y frases que representen sus meses.
- `album`: recuerdos o fotografías.
- `razones`: ocho mensajes que aparecen al voltear las tarjetas.
- `carta`: los párrafos de tu carta final.

**Para añadir fotografías:** guarda tus imágenes en `assets/fotos/` y escribe en la propiedad `foto` el nombre exacto del archivo, por ejemplo:

```js
{ titulo: "Nuestra primera salida", descripcion: "Ese día fue especial...", simbolo: "♡", foto: "assets/fotos/primera-salida.jpg" }
```

Las imágenes no son obligatorias; si no las añades, se muestran ilustraciones de colores. Es recomendable comprimir las fotos para que carguen rápido en celular.

## Detalles incluidos

- Diseño responsive y cielo estrellado animado.
- Mapa interactivo con ocho capítulos únicos.
- Progreso guardado localmente en el dispositivo.
- Galería con botones, fotos opcionales y textos editables.
- Carta dentro de un sobre animado y lluvia de confeti.
- Accesibilidad de teclado, enlaces para saltar al contenido y soporte para movimiento reducido.
- Sin librerías JavaScript ni recopilación de datos.

**Nota:** el guardado del progreso depende de `localStorage`. Si la página se abre en otro navegador/dispositivo, comienza desde cero (ideal para que ella lo descubra).

## Estructura del proyecto

```text
Ocho_meses_un_universo/
├── index.html
├── styles.css
├── app.js
├── config.js               ← Edita aquí nombres, textos y fotos
├── README.md
└── assets/
    └── fotos/
        └── LEEME.txt
```

**Tip:** antes de enviársela, personaliza por lo menos la carta y dos de los recuerdos con anécdotas que solo ustedes conozcan. Es lo que hará que el regalo sea realmente suyo.
