# MMC Command Center — Roadmap de producto

**Para:** Referencia interna de Ismael
**Propósito:** Mapear la visión completa del command center en 4 fases, desde CMS básico hasta reemplazo total de herramientas externas. Sirve como guía estratégica y como munición para conversaciones con Sean sobre el futuro long-term.

---

## Visión general

El command center evoluciona en cuatro fases que cuentan una narrativa coherente:

| Fase | Qué resuelve | Cuándo se vende |
|---|---|---|
| **1 · CMS Nativo** | MMC edita el sitio web completo sin depender de un developer | Phase 1 del contrato inicial |
| **2 · Operaciones** | El dashboard se vuelve el cerebro del estudio — equipo, pipeline, tasks | Phase 2 del contrato inicial |
| **3 · Integration Hub** | Conecta las herramientas que MMC ya usa sin pedirles cambiar hábitos | Expansión del contrato |
| **4 · Reemplazo Nativo** | Sustituye las herramientas externas con funcionalidad propia | Relación full-time long-term |

**La regla de oro:** cada fase debe aportar valor real por sí sola. Nadie compra Phase 4 primero. Se vende fase por fase, probando confianza y retorno a lo largo del camino.

---

## Phase 1 — CMS Nativo

**Promesa:** MMC nunca más tiene que llamar a un developer para cambiar contenido del sitio.

**Para qué sirve:** todo el contenido público del sitio se maneja desde un solo lugar, por gente que no sabe programar. El equipo puede publicar, editar, agendar, despublicar, y trackear historia.

### Qué se vuelve editable

| Área | Qué permite manejar |
|---|---|
| Blog | Posts, categorías, autores, SEO, preview mode |
| Weddings | Pareja, fecha, venue, galería, story, editor asignado |
| Portfolio / Featured Work | Qué bodas destacar en homepage y portfolio grid |
| Team | Bios, fotos, roles, orden de aparición, departamento |
| Press | Features de prensa, logos, links externos |
| Testimonials | Citas de clientes con fotos de la pareja |
| Venues database | Fotos, descripciones, tips, bodas shootadas ahí |
| Looks / estilos de edición | Los 5 estilos visuales con ejemplos |
| Albums catalog | Productos físicos, precios, specs |
| Services pages | Photography, Videography, Super8, etc. — copy y pricing |
| Academy courses | Contenido educativo si MMC lo monetiza |
| FAQ | Preguntas, respuestas, categorías |
| Homepage hero slots | Qué showcase en la landing esta semana/mes |
| Navigation | Menús del header y footer |
| SEO por página | Meta tags, Open Graph images, descripciones |
| Redirects | 301s para URLs antiguas sin tocar código |

### Capacidades transversales del CMS

- **Media Library central**: todas las fotos, videos, Lotties y PDFs en un lugar, con tags y búsqueda
- **Draft → Publish workflow**: con preview antes de publicar en vivo
- **Scheduling**: agendar posts para salir en fecha futura
- **Revision history**: quién cambió qué y cuándo, con rollback a versiones anteriores
- **Approval workflow**: editor hace cambios → Sean revisa → aprueba o rechaza
- **Bulk operations**: editar múltiples items a la vez

### Narrativa para Sean

> *"Cada píxel del sitio público se maneja desde un solo lugar. Tu equipo nunca más tiene que mandarme un email diciendo 'oye, ¿puedes cambiar esta foto del equipo?' — ellos lo hacen, lo publican, y ya."*

---

## Phase 2 — Operaciones Internas del Estudio

**Promesa:** el dashboard deja de ser solo un CMS y se vuelve el cerebro operacional del estudio.

**Para qué sirve:** gestionar el equipo freelance, el pipeline de bodas, las deadlines y la comunicación interna sin saltar entre 5 herramientas.

### Gestión del equipo

- **Perfiles de editores freelance**: specialties, tarifas, portafolio, disponibilidad
- **Onboarding workflow**: NDAs, contratos, W-9s, payment info — todo antes del primer proyecto
- **Load balancing**: vista de quién está libre esta semana, quién está sobrecargado
- **Performance tracking**: proyectos completados, tiempo promedio de entrega, ratings

### Pipeline de bodas tipo Kanban

- **Columnas del pipeline**: Inquiry → Booked → Shot → Editing → Review → Delivered
- **Drag & drop** para mover bodas entre estados
- **Deadlines automáticas**: basadas en la fecha del shoot (ej: gallery entregada 6 semanas después)
- **Assignment rules**: lógica para asignar editores automáticamente según tipo de boda
- **Color-coded urgency**: rojo para lo que está retrasado

### Colaboración interna

- **Task management por proyecto**: checklists, asignaciones, recordatorios
- **Comentarios y @mentions** en cada boda
- **Notifications center**: "Elena subió v3 de Bennett & Marie"
- **Activity feed global** del estudio
- **Shared calendar**: shoots, meetings, deadlines, entregas

### Client portal (separado del dashboard interno)

- Los clientes ven su progreso de gallery
- Aprueban edits con un click
- Hacen comentarios en fotos específicas
- Descargan entregables finales
- Todo con su propio login y branding de MMC

### Analytics del estudio

- Revenue YTD, por mes, por tipo de paquete
- Pipeline value proyectado
- Average package size
- Editor utilization rate
- Client LTV
- Conversion rate de inquiries a bookings

### Reporting

- Exports para contabilidad
- Reportes de fin de año
- Tax exports
- Estado financiero del estudio

### Narrativa para Sean

> *"Ya no tienes que abrir Dubsado, Wipster, Slack y Google Calendar para saber en qué estado está una boda. Todo el pipeline vive aquí — desde el primer inquiry hasta la entrega final."*

---

## Phase 3 — Integration Hub

**Promesa:** MMC sigue usando las herramientas que ya domina, pero las ve unificadas en el dashboard.

**Por qué importa:** es el camino de menor resistencia. Nadie en el equipo tiene que cambiar hábitos. Solo agregan visibilidad y conectividad. La fricción del cambio es casi cero.

### Integraciones principales

| Herramienta | Qué hace la integración |
|---|---|
| **Dubsado** | Pull de leads, contratos e invoices. Estados sincronizados bidireccionalmente. Push de nuevos proyectos desde el dashboard. |
| **Wipster** | Embed del review tool dentro de la vista de cada boda. Status de aprobación en tiempo real. |
| **Dropbox** | Browse de carpetas desde el dashboard. Upload directo. Auto-sync de galleries entregadas. |
| **Google Calendar** | Sync de shoots, meetings y deadlines en ambas direcciones. |
| **Gmail** | Ver threads de clientes sin salir del dashboard. Responder directamente. |
| **Google Drive** | Embed de docs compartidos por proyecto. |
| **Slack** | Notificaciones del dashboard → canales específicos. Slash commands para crear tasks. |
| **Stripe** | Estado de pagos, invoices, webhooks de cobros. |
| **Instagram** | Schedule de posts. Pull de recientes para el feed de la homepage. |
| **Pic-Time / Pixieset** | Link de galerías entregadas a la wedding entry correspondiente. |
| **Vimeo / YouTube** | Embed de videos entregados en las wedding pages. |

### Principios de la Integration Hub

- **Read first, write second**: empezar con lectura (ver datos en el dashboard) antes de escritura (crear/editar desde el dashboard)
- **No rompe lo que ya funciona**: las herramientas siguen operando igual. El dashboard es una capa adicional.
- **Graceful degradation**: si una integración falla, las demás siguen funcionando
- **Audit trail**: cada acción sync queda registrada

### Narrativa para Sean

> *"Tu equipo sigue usando las herramientas que ya dominan. Dubsado, Wipster, Dropbox, Slack — todo intacto. Lo que cambia es que ahora tienes un lugar único donde todo se ve conectado. Nada que migrar, nada que aprender de cero."*

---

## Phase 4 — Reemplazo Nativo (el "all-in-one")

**Promesa:** el command center reemplaza las herramientas externas con funcionalidad propia. MMC deja de pagar suscripciones múltiples y tiene control total sobre sus operaciones.

**Cuándo se vende:** solo cuando hay relación full-time establecida y confianza comprobada. Esta fase no se vende en la primera conversación — se gana después de demostrar valor real.

### Reemplazos

| Herramienta reemplazada | Feature nativa |
|---|---|
| **Dubsado** | CRM completo: leads, workflows de email, contratos con e-sign, invoices, questionnaires pre-boda, scheduling de consultas |
| **Wipster** | Video review tool nativo con comentarios time-stamped, versioning, client approval workflow |
| **Pic-Time / Pixieset** | Client gallery portal nativo, proofing (cliente elige favoritas), download delivery, print ordering |
| **Dropbox** (parcial) | Storage nativo organizado por proyecto, permisos por rol, expiring share links para clientes |
| **Calendly** | Booking nativo para consultas, con sync a Google Calendar |
| **DocuSign** | E-signatures para contratos, integrado al CRM nativo |
| **Later / Buffer** | Scheduler nativo de Instagram con preview |
| **Parte de Slack** | Messaging interno por proyecto, con history y search |

### El caso económico para Sean

MMC probablemente paga actualmente entre **$120–$280 al mes** en suscripciones a herramientas externas, sumando Dubsado, Wipster, Pic-Time, Dropbox, Calendly, DocuSign, y un scheduler de social. En un año eso son **$1,440–$3,360**.

Phase 4 reemplaza todo eso por infraestructura propia. El ahorro anual directo es uno de los argumentos — pero el argumento más fuerte es **ownership**: MMC deja de depender de vendors externos que pueden subir precios, cerrar features, o ser comprados por otra compañía.

### Narrativa para Sean

> *"En Phase 4, MMC tiene su propio command center completo. Deja de pagar $200+ mensuales a herramientas separadas, deja de depender de vendors que cambian precios o desaparecen, y tiene un sistema hecho específicamente para cómo trabaja MMC — no uno genérico diseñado para miles de estudios distintos."*

---

## Features transversales (aplican a cualquier fase)

Estas capacidades no son una fase específica — son infraestructura que cruza todo el producto.

### Auth y roles

- **Owner** (Sean): acceso total, configuración, facturación
- **Admin**: gestión del estudio, sin config de facturación
- **Editor interno**: acceso a contenido y proyectos asignados
- **Freelancer**: solo ve sus propios proyectos, no tiene acceso al resto del estudio
- **Client**: solo ve su propia gallery y comunicación

### Audit log

Quién hizo qué, cuándo, desde qué IP. Crítico para un negocio con múltiples freelancers y entregables a clientes.

### Automations engine

Lógica "cuando X pasa, hacer Y":
- Cuando una boda se marca "delivered" → mandar email al cliente con link a gallery + actualizar Instagram + notificar Slack
- Cuando un editor acepta un proyecto → notificar al PM
- Cuando un pago se recibe → marcar invoice como pagada + mandar recibo
- Cuando una boda tiene deadline en menos de 3 días → alertar al editor asignado

### AI helpers (el futuro)

- **Auto-tagging de fotos** por contenido (ceremonia, first look, detalles, reception)
- **Auto-culling**: descartar automáticamente fotos borrosas o duplicadas
- **Writing assistant** para blog posts y captions
- **Caption generation** para Instagram basado en el contenido de la foto
- **Auto-crop** a múltiples aspect ratios (cuadrado, vertical, horizontal) respetando el sujeto
- **Style matching**: aplicar el look de una boda de referencia a una nueva

### Mobile-first responsive

Editores en el field actualizando status desde el celular. Sean revisando el pipeline desde un Uber. El dashboard funciona en cualquier pantalla.

### Multi-studio ready

Si MMC algún día expande a otra ciudad o abre un second brand, la arquitectura ya lo soporta sin rehacer nada.

---

## Cómo usar este roadmap en conversaciones con Sean

**La reunión del lunes:** no le vendas las 4 fases de golpe. Vende **Phase 1 ahora**, menciona **Phase 2 como lo siguiente**, y usa **Phase 3 y 4 como visión futura** para posicionarte como el socio long-term, no como el freelance que hace un proyecto y se va.

### Lenguaje concreto para plantear el roadmap

> *"Lo que construí para el showcase de hoy es la base — el CMS completo del sitio. Pero tengo el roadmap pensado para tres fases más: operaciones internas del estudio, integración con las herramientas que ya usan, y eventualmente — si la relación crece — reemplazar esas herramientas con funcionalidad nativa. El objetivo final es que MMC tenga su propio command center, sin pagar suscripciones a 8 plataformas distintas."*

### Cómo responder si Sean pregunta "¿y esto cuánto cuesta?"

No lo cotices en la reunión. Redirige:

> *"El alcance y pricing de Phase 1 está en la propuesta que te voy a compartir. Las fases siguientes son conversaciones que tenemos después, cuando ya hayamos trabajado juntos y sepas cómo opero. No te voy a pedir que compres hoy un compromiso de dos años — eso se gana con resultados, no con palabras."*

Esa respuesta posiciona tres cosas a la vez: seguridad en el pricing inicial, humildad sobre el futuro, y confianza en que los resultados hablarán por sí solos.

### Por qué este roadmap te fortalece en la reunión

1. **Muestra que piensas en el largo plazo**, no solo en el proyecto inicial. Eso te diferencia de un freelance que viene a facturar y se va.
2. **Justifica el pricing de Phase 1**. Si Sean ve que hay un camino de valor creciente, el ticket inicial se siente como un primer paso de muchos, no como un gasto aislado.
3. **Te da opciones de upsell naturales**. Sean puede decir "me gusta Phase 2 también" en la primera llamada, y ya tienes respuesta.
4. **Posiciona a MMC como co-creador**, no como cliente pasivo. El roadmap les muestra que tú ya pensaste en su futuro antes de que ellos lo pidieran.

---

## Lo que NO hay que hacer con este roadmap

- ❌ **No mostrar las 4 fases completas en la primera reunión.** Es demasiado. Menciona Phase 1 a fondo, Phase 2 brevemente, y Phase 3-4 como "visión futura" en una sola frase.
- ❌ **No cotizar Phase 2, 3 o 4 hoy.** Esos pricing se trabajan cuando haya confianza ganada.
- ❌ **No prometer timelines** de fases futuras. No sabes cuándo van a pasar.
- ❌ **No tratar este doc como un compromiso.** Es una visión dirección, no un contrato.
- ❌ **No enseñar este documento a Sean en la reunión.** Es tu material interno. Para Sean, hay una versión visual más corta en la página /vision.

---

## Próximo paso sugerido

Considerar agregar una sección resumida de este roadmap a la página `/vision` (la propuesta privada), para que Sean vea la dirección post-launch sin tener que leer este documento completo. Una tarjeta por fase, con una línea de promesa y un bullet de lo que incluye, es suficiente.

Opcionalmente, agregar tarjetas visuales al Integration Hub del dashboard mock actual con algunas de las herramientas de Phase 3 marcadas como "Coming Soon" — así durante la reunión, cuando llegues al punto de *"hay más en el roadmap"*, puedes apuntar a algo visual en lugar de describirlo con palabras.
