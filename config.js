/*
  ✦ PERSONALIZA AQUÍ TU REGALO ✦
  Puedes cambiar nombres, fechas, textos y fotos sin tocar el resto del código.
  IMPORTANTE: conserva las comillas, comas y corchetes.
  Para añadir una foto, guarda el archivo en assets/fotos/ y escribe su ruta
  en el campo "foto" correspondiente (ejemplo: "assets/fotos/juntos.jpg").
*/

window.GIFT_CONFIG = {
  destinataria: "Sofia",                 // Nombre que aparece en el regalo
  de: "Christian",                       // Tu firma al final de la carta
  aniversario: "11 de noviembre de 2026", // Texto de la fecha especial
  descripcionInicial: "Hay personas que llegan a nuestra vida y la convierten en un lugar más bonito. Esta pequeña galaxia existe para celebrar todo lo que hemos vivido y lo bonito que todavía nos espera.",

  // Ocho capítulos de su historia. Personaliza las frases con momentos reales.
  capitulos: [
    {
      mes: "Abril", icono: "☾", titulo: "Donde empezó la magia",
      texto: "Nuestro primer mes fue el comienzo de una historia que no podía imaginar completa. Poco a poco, cada conversación y cada detalle empezaron a ocupar un lugar muy especial en mi vida.",
      frase: "A veces, lo más bonito comienza sin hacer ruido."
    },
    {
      mes: "Mayo", icono: "✿", titulo: "Conocerte un poquito más",
      texto: "Me gustó descubrir nuevas partes de ti: las cosas que te hacen reír, tus gustos, tus historias y todas esas pequeñas cosas que te vuelven única. Conocerte ha sido uno de mis regalos favoritos.",
      frase: "Cada detalle tuyo es un nuevo motivo para sonreír."
    },
    {
      mes: "Junio", icono: "✧", titulo: "Nuestros pequeños momentos",
      texto: "Empecé a entender que no hacen falta planes enormes para vivir algo especial. Hay momentos sencillos, conversaciones y risas que se quedan conmigo mucho más de lo que imaginas.",
      frase: "Lo cotidiano puede ser extraordinario cuando es compartido."
    },
    {
      mes: "Julio", icono: "♡", titulo: "La suerte de coincidir",
      texto: "Entre tantos caminos posibles, el nuestro se cruzó. Y desde entonces he encontrado razones para agradecer que podamos compartir experiencias, aprender uno del otro y construir recuerdos nuevos.",
      frase: "Qué bonita coincidencia fue encontrarnos."
    },
    {
      mes: "Agosto", icono: "☼", titulo: "Todo lo que hemos aprendido",
      texto: "Nuestra historia también tiene días de aprendizaje. Lo valioso para mí es escucharnos, cuidarnos y recordar que una relación bonita se construye con acciones, comprensión y respeto.",
      frase: "Querer bien también es aprender a hacerlo mejor."
    },
    {
      mes: "Septiembre", icono: "❋", titulo: "Tus sonrisas favoritas",
      texto: "Si pudiera guardar algo en una cajita, serían esos momentos en los que una risa llega de la nada y transforma el día. Ojalá nunca nos falten razones para reír juntos.",
      frase: "Hay alegrías que se vuelven inolvidables."
    },
    {
      mes: "Octubre", icono: "✦", titulo: "Siete meses de nosotros",
      texto: "Siete meses fueron una oportunidad para mirar atrás y reconocer cuántas cosas habíamos vivido. Los días pasan rápido, pero los detalles que importan merecen quedarse con nosotros.",
      frase: "No cuento solo los meses, también todo lo que significan."
    },
    {
      mes: "Noviembre", icono: "∞", titulo: "Ocho meses y un nuevo capítulo",
      texto: "Hoy llegamos a ocho meses. No sé cuántas aventuras nos esperan, pero sí sé que quiero seguir creando recuerdos bonitos contigo, con paciencia, cariño, respeto y muchas ganas de hacerlo bien.",
      frase: "Nuestra historia todavía tiene páginas por escribir."
    }
  ],

  // Las fotos son opcionales: si el valor "foto" queda vacío, aparecerá un
  // diseño artístico. Escribe la ruta y extensión exactas de cada archivo.
  album: [
    { titulo: "Date cuenta, mi niña", descripcion: "Eres preciosa, pero lo que más me enamora es todo lo que eres. Ojalá pudieras verte un ratito con mis ojos y entender lo increíble que eres para mí.", simbolo: "☾", foto: "assets/fotos/foto1.jpeg" },
    { titulo: "La mujer de mi vida", descripcion: "Amo tus ojos, tus labios, tu sonrisa y cada detalle de ti. Pero, sobre todo, amo tu forma de ser y la suerte que tengo de compartir mi vida contigo.", simbolo: "✿", foto: "assets/fotos/foto2.jpeg" },
    { titulo: "Mi sueño hecho realidad", descripcion: "A veces te miro y todavía me cuesta creer que alguien tan especial esté a mi lado. Gracias por hacer tan bonito este pedacito de vida que compartimos.", simbolo: "✧", foto: "assets/fotos/foto3.jpeg" },
    { titulo: "Amo todo de ti", descripcion: "Tus ojos, tus labios, tu cabello, tus ocurrencias y hasta esas pequeñas cosas que quizá tú no notas. Me encantas completa, tal y como eres.", simbolo: "♡", foto: "assets/fotos/foto4.jpeg" },
    { titulo: "Te amo, mi niña", descripcion: "No solo amo cómo te ves en esta foto: amo tu corazón, tu esencia y cada momento a tu lado. Eres mi persona favorita y quiero seguir eligiéndote cada día.", simbolo: "✦", foto: "assets/fotos/foto5.jpeg" }
  ],

// Esta es la sorpresa final. Hazla más personal si quieres:
  carta: [
    "Hoy cumplimos ocho meses. Ocho meses desde que comenzó algo que se ha convertido en una parte muy importante de mi vida. Y aunque podría intentar resumirlos en fechas, fotos o palabras, hay cosas que se sienten mucho más grandes que cualquier pantalla.",
    "Me gusta pensar en todos los momentos que hemos compartido: los que nos hicieron reír, los que nos dejaron historias que contar y también los que nos enseñaron a conocernos mejor. Porque lo nuestro no tiene que ser perfecto para ser valioso. Quiero que esté lleno de respeto, comunicación, cuidado y detalles sinceros.",
    "Gracias por tu forma de ser, por lo que hemos construido y por cada recuerdo que llevamos con nosotros. Me alegra que nuestros caminos se hayan encontrado y que hoy pueda celebrarte de esta manera, con una pequeña galaxia hecha especialmente para ti.",
    "Si pudiera pedirle algo a las estrellas, sería que nunca nos falten la paciencia para escucharnos, la alegría de descubrir cosas nuevas y las ganas de seguir construyendo momentos bonitos. No necesito saber cómo será cada página del futuro; me ilusiona mucho pensar en las que todavía podemos escribir juntos.",
    "Felices ocho meses. Gracias por existir en esta historia y por hacerla tan especial. Te amo muchísimo. ♡"
  ]
};
