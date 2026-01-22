# La Arquitectura Qblet: Estándar de Dominio Soberano para Sistemas Distribuidos

Versión: 3.1 (Extended Omnibus Specification)

Tipo: Whitepaper Técnico / Norma Industrial

Estado: Normativo

Fecha: Enero 2026

## Tabla de Contenidos

1.  [Resumen Ejecutivo](https://www.google.com/search?q=%231-resumen-ejecutivo)
    
2.  [Introducción y Alcance](https://www.google.com/search?q=%232-introducci%C3%B3n-y-alcance)
    
3.  [Convenciones y Normativa](https://www.google.com/search?q=%233-convenciones-y-normativa)
    
4.  [Arquitectura Conceptual (El Zen de Qblet)](https://www.google.com/search?q=%234-arquitectura-conceptual-el-zen-de-qblet)
    
5.  [Especificación de Identidad y Metadatos](https://www.google.com/search?q=%235-especificaci%C3%B3n-de-identidad-y-metadatos)
    
6.  [Protocolos de Comunicación Síncrona (REST)](https://www.google.com/search?q=%236-protocolos-de-comunicaci%C3%B3n-s%C3%ADncrona-rest)
    
7.  [Protocolos de Comunicación Asíncrona (Eventos)](https://www.google.com/search?q=%237-protocolos-de-comunicaci%C3%B3n-as%C3%ADncrona-eventos)
    
8.  [Modelo de Seguridad Zero Trust](https://www.google.com/search?q=%238-modelo-de-seguridad-zero-trust)
    
9.  [Descubrimiento y Topología de Red](https://www.google.com/search?q=%239-descubrimiento-y-topolog%C3%ADa-de-red)
    
10.  [Resiliencia y Tolerancia a Fallos](https://www.google.com/search?q=%2310-resiliencia-y-tolerancia-a-fallos)
    
11.  [Observabilidad y Telemetría](https://www.google.com/search?q=%2311-observabilidad-y-telemetr%C3%ADa)
    
12.  [Gestión de Datos y Consistencia](https://www.google.com/search?q=%2312-gesti%C3%B3n-de-datos-y-consistencia)
    
13.  [Ciclo de Vida y Despliegue](https://www.google.com/search?q=%2313-ciclo-de-vida-y-despliegue)
    
14.  [Estrategia de Aseguramiento de Calidad (QA)](https://www.google.com/search?q=%2314-estrategia-de-aseguramiento-de-calidad-qa)
    
15.  [Gobernanza, Versionado y Evolución](https://www.google.com/search?q=%2315-gobernanza-versionado-y-evoluci%C3%B3n)
    
16.  [Contrato Operacional (DevOps)](https://www.google.com/search?q=%2316-contrato-operacional-devops)
    
17.  [Anexo A: Glosario](https://www.google.com/search?q=%2317-anexo-a-glosario)
    

## 1\. Resumen Ejecutivo

La ingeniería de software moderna se enfrenta a una crisis de complejidad estructural y operativa. Los sistemas monolíticos tradicionales se han vuelto rígidos, impidiendo la velocidad de entrega y la innovación independiente de los equipos. Por otro lado, la adopción prematura de microservicios granulares ha introducido una sobrecarga operativa inasumible para la mayoría de las organizaciones, caracterizada por la "fatiga de red", la dificultad de depuración distribuida y la gestión de infraestructura compleja.

Qblet se establece como un estándar abierto de arquitectura que define y formaliza la unidad de Dominio Soberano. Un Qblet no es simplemente un servicio técnico; es una entidad de software autocontenida que encapsula verticalmente la totalidad de un dominio de negocio: desde la lógica de negocio y la persistencia de datos exclusiva, hasta la interfaz operativa necesaria para su gestión.

Este estándar proporciona un marco normativo exhaustivo para construir sistemas distribuidos bajo un modelo Peer-to-Peer (P2P). Su objetivo es eliminar la dependencia crítica de Service Meshes complejos o Message Brokers centralizados en las etapas iniciales de madurez, garantizando al mismo tiempo la interoperabilidad futura mediante contratos estrictos de API, Seguridad y Telemetría. Qblet propone un equilibrio pragmático: modularidad sin fragmentación excesiva.

## 2\. Introducción y Alcance

### 2.1 Motivación

El objetivo primordial de Qblet es maximizar la autonomía de los equipos de desarrollo sin sacrificar la coherencia y gobernabilidad del sistema global.

*   Problema Identificado: Los microservicios técnicos (ej: "Servicio de Email", "Servicio de PDF", "Servicio de Log") generan un acoplamiento temporal excesivo, conocido como "Infierno de Dependencias" o Dependency Hell. Cuando una operación de negocio requiere la coordinación síncrona de 15 servicios diminutos, la disponibilidad del sistema se degrada exponencialmente (Disponibilidad Total = D1 \* D2 \* ... \* Dn).
    
*   Solución Propuesta: Elevar el nivel de abstracción arquitectónica. Un Qblet no es una función auxiliar; es un producto digital completo. Debe ser lo suficientemente grande para aportar valor significativo de forma aislada, pero lo suficientemente pequeño para ser cognitivamente manejable por un equipo de "dos pizzas" (3-5 personas).
    

### 2.2 Alcance

Este documento regula la totalidad del ciclo de vida y estructura de un Qblet, incluyendo:

*   El formato de empaquetado, estructura de directorios y autodescripción mediante manifiestos.
    
*   Los protocolos de red exactos para interacciones síncronas (REST) y asíncronas (Webhooks P2P).
    
*   Los mecanismos de seguridad criptográfica obligatorios para entornos Zero Trust.
    
*   Los requisitos operacionales para contenedores, orquestadores y plataformas de observabilidad.
    
*   Este estándar es agnóstico al lenguaje de programación, pero prescriptivo en cuanto a las interfaces de comunicación.
    

## 3\. Convenciones y Normativa

Las palabras clave "DEBE", "NO DEBE", "REQUERIDO", "DEBERÍA", "NO DEBERÍA", "RECOMENDADO", "PUEDE" y "OPCIONAL" en este documento se interpretan estrictamente según lo descrito en RFC 2119.

*   Normativo (DEBE/REQUERIDO): El incumplimiento de una cláusula marcada de esta manera implica la no-conformidad automática con el estándar Qblet. Estos requisitos son necesarios para garantizar la interoperabilidad y seguridad del ecosistema.
    
*   Informativo (PUEDE/RECOMENDADO): Las cláusulas marcadas así representan sugerencias de mejores prácticas basadas en la experiencia industrial, pero su omisión no rompe la compatibilidad del protocolo.
    

## 4\. Arquitectura Conceptual (El Zen de Qblet)

### 4.1 Principio de Soberanía

Un Qblet debe ser concebido como una "Nación Digital" dentro de la federación del sistema empresarial.

*   Autonomía Legislativa: Tiene sus propias leyes internas (Lógica de Negocio) que no pueden ser violadas por actores externos.
    
*   Territorialidad de Datos: Tiene su propio territorio (Base de Datos aislada). La persistencia es políglota por naturaleza; un Qblet puede usar PostgreSQL mientras su vecino usa MongoDB.
    
*   Fronteras Definidas: Tiene sus propias aduanas (API Pública). Todo tráfico de entrada y salida está regulado.
    
*   Violación Crítica: Permitir conexiones SQL/JDBC directas desde un servicio externo hacia la base de datos de un Qblet anula la certificación. Esto reintroduce el acoplamiento fuerte que la arquitectura busca eliminar.
    

### 4.2 Principio de Dualidad (The Dual Head)

Para evitar la creación de "Cajas Negras" inoperables, todo Qblet DEBE exponer dos interfaces primarias diferenciadas:

1.  Human Head (UI): Una interfaz gráfica ligera para operadores humanos, accesible en la raíz (/). Esta UI debe permitir la visualización del estado interno, la configuración en caliente y operaciones de emergencia (ej: reintentar transacciones fallidas). No se requiere una UI de consumidor final, sino una consola de administración operativa.
    
2.  Machine Head (API): Una interfaz programática estricta para agentes de software y otros Qblets, accesible bajo un espacio de nombres versionado (ej: /api/v1).
    

### 4.3 Principio de Socialidad

Un Qblet nace conectado. Se asume que operará en un entorno hostil y dinámico.

*   Extroversión: Debe implementar protocolos activos de descubrimiento (/announce) para informar de su existencia al Registry.
    
*   Empatía: Debe ser capaz de emitir eventos de dominio significativos y, recíprocamente, poseer un endpoint estándar (/webhook-listener) para escuchar y reaccionar ante los cambios de sus vecinos.
    

## 5\. Especificación de Identidad y Metadatos

### 5.1 El Manifiesto (qblet.yaml)

Todo Qblet DEBE servir su manifiesto de identidad en el endpoint estándar GET /.well-known/qblet. Este archivo actúa como el contrato de nivel de servicio (SLA) y documentación viva del componente.

Esquema Extendido y Detallado:

qbletVersion: "1.0"  
info:  
  id: "com.corp.logistics.inventory" # Reverse Domain Notation para garantizar unicidad global  
  name: "Inventory Manager"  
  description: "Core logistics domain handling stock levels, warehouses, and inventory adjustments."  
  version: "2.1.0" # Adherencia estricta a Semantic Versioning (SemVer)  
  tags: \["logistics", "core", "critical", "pci-scope"\]  
  maintainer:  
    name: "Logistics Squad"  
    email: "team-logistics@corp.com"  
    slack: "#ops-logistics"  
    doc_url: "https://wiki.corp.com/logistics"  
interfaces:  
  human_ui:  
    url: "https://inventory.intranet"  
    type: "SPA"  
    auth_method: "OIDC"  
  machine_api:  
    base_url: "https://inventory.intranet/api/v1"  
    spec: "/api/v1/openapi.json"  
    protocol: "REST"  
    content_types: \["application/json"\]  
capabilities:  
  data_exposed:  
    - entity: "StockItem"  
      description: "Current stock levels per SKU across all warehouses"  
      access: "read-only"  
      endpoints: \["GET /stock/{sku}", "GET /stock/batch"\]  
      scope\_required: "inventory:read"  
      sla: "99.9%"  
  events\_emitted:  
    - topic: "inventory.stock.depleted"  
      schema: "/schemas/events/stock-depleted.v1.json"  
      description: "Emitted immediately when available stock reaches zero."  
  provided:  
    - urn: "urn:qblet:capability:inventory-check"  
    - urn: "urn:qblet:capability:stock-reservation"  
dependencies:
  required_capabilities:
    - urn: "urn:qblet:capability:auth:user-validation"
      reason: "To validate user identity before stock reservation."  
  required\_services:  
    - id: "com.corp.sales.orders"  
      version: "^1.0.0"  
      reason: "To validate pending orders against stock reservations."  
      failure\_mode: "circuit-breaker" # Define comportamiento si la dependencia falla  
  

## 6\. Protocolos de Comunicación Síncrona (REST)

Se utiliza exclusivamente para comandos transaccionales inmediatos (donde el cliente necesita confirmación de éxito/fallo) y consultas de datos en tiempo real.

### 6.1 Diseño de API (API Guidelines)

Las APIs expuestas DEBEN adherirse, como mínimo, al Nivel 2 del Modelo de Madurez de Richardson (Uso correcto de Verbos HTTP y Recursos).

*   Formatos: JSON (application/json) es obligatorio como formato de intercambio primario.
    
*   Paginación: Obligatoria para cualquier recurso de colección que pueda retornar más de 50 elementos.
    

*   Estrategia: Se prefieren parámetros limit y offset (ej: ?limit=20&offset=0) o paginación basada en cursor para grandes volúmenes de datos.
    
*   Meta-información: Las respuestas deben incluir headers como X-Total-Count o enlaces de navegación (Link header) para HATEOAS básico.
    

*   Filtrado: Uso de query params estándar: ?status=active&created\_at\[gte\]=2023-01-01.
    
*   Ordenación: Parámetro sort con soporte para múltiples campos: ?sort=-created\_at,name.
    

### 6.2 Cabeceras de Trazabilidad (Obligatorias)

Para garantizar la observabilidad en un entorno distribuido, el emisor DEBE inyectar y el receptor DEBE propagar el contexto de la traza:

1.  X-Qblet-Trace-ID: UUIDv4 que identifica la transacción de negocio global de principio a fin.
    
2.  X-Qblet-Span-ID: UUIDv4 que identifica el segmento de ejecución actual.
    
3.  X-Qblet-Origin-ID: Identificador canónico del Qblet que realiza la invocación (ej: com.corp.sales).
    

### 6.3 Manejo de Errores

Uso estricto del estándar RFC 7807 (Problem Details for HTTP APIs) para homogeneizar las respuestas de error.

*   400 Bad Request: Error de cliente, validación de entrada fallida.
    
*   401 Unauthorized: Ausencia de credenciales o firma criptográfica inválida.
    
*   403 Forbidden: Credenciales válidas, pero alcance (scope) insuficiente para la operación.
    
*   404 Not Found: El recurso solicitado no existe.
    
*   409 Conflict: Violación de reglas de negocio (ej: modificación concurrente, stock insuficiente).
    
*   429 Too Many Requests: Activación de mecanismos de Rate Limiting.
    
*   500 Internal Server Error: Error no controlado en el servidor (Bug).
    

## 7\. Protocolos de Comunicación Asíncrona (Eventos)

Se utiliza para garantizar la consistencia eventual entre dominios y para el desacoplamiento temporal de procesos.

### 7.1 Transporte P2P (Webhooks)

En la versión 1.x del estándar, se favorece la simplicidad operativa eliminando el Middleware (Kafka/RabbitMQ).

*   Verbo: HTTP POST.
    
*   Endpoint Receptor: /_qblet/hooks (Estándar) o una URL específica negociada durante la suscripción.
    

### 7.2 Formato del Payload (CloudEvents 1.0)

Todos los eventos DEBEN conformarse a la especificación CNCF CloudEvents 1.0.

  

{  
  "specversion" : "1.0",  
  "type" : "com.corp.inventory.stock.depleted", // Reverse Domain Name para evitar colisiones  
  "source" : "urn:qblet:com.corp.logistics.inventory",  
  "id" : "evt\_1234567890", // ID único del evento para deduplicación (Idempotencia)  
  "time" : "2023-10-27T10:00:00Z",  
  "datacontenttype" : "application/json",  
  "data" : {  
    "sku": "SKU-999",  
    "warehouse\_id": "WH-01",  
    "reason": "sales\_order\_fulfillment"  
  }  
}  
  

### 7.3 Mecanismo de Reintento (Retry Policy)

Dado que la red no es fiable, el emisor DEBE implementar un mecanismo de reintento robusto ante fallos transitorios (429, 5xx, Timeout).

*   Algoritmo: Exponential Backoff con Jitter (Aleatoriedad) para prevenir el problema del Thundering Herd.
    
*   Fórmula: Delay = min(Cap, Base \* 2^Attempt) + Random(0, Jitter).
    
*   Persistencia: Los eventos que fallan definitivamente tras N intentos (ej: 10 intentos) DEBEN ser derivados a una Dead Letter Queue (DLQ) interna en la base de datos del emisor para su posterior análisis manual o reintento administrativo.
    

## 

* * *

8\. Modelo de Seguridad Zero Trust

El perímetro de red ha desaparecido. Cada Qblet debe defenderse como si estuviera expuesto a Internet público.

### 8.1 Autenticación (M2M)

*   Estándar: OAuth2 Client Credentials Flow.
    
*   Token: JWT (JSON Web Token).
    
*   Algoritmo: RS256 (Firma Asimétrica) es obligatorio. Se prohíbe el uso de HS256 (Simétrico) para comunicación inter-Qblet para evitar compartir secretos privados.
    
*   Rotación de Claves: Los Qblets DEBEN exponer sus claves públicas en un endpoint estándar /.well-known/jwks.json. Esto permite a los receptores cachear y rotar claves sin tiempo de inactividad, mejorando la postura de seguridad.
    

### 8.2 Integridad de Webhooks (Anti-Tampering & Anti-Replay)

Para prevenir ataques de intermediario (Man-in-the-Middle) y ataques de repetición:

1.  Firma HMAC: Header X-Qblet-Signature = HMAC-SHA256(Secret, RawBody).
    

*   IMPORTANTE: La verificación DEBE realizarse contra el buffer crudo (RawBody) de la petición HTTP, nunca contra el objeto JSON parseado, debido a que la serialización JSON no es determinista (el orden de las claves puede cambiar).
    

2.  Timestamp: Header X-Qblet-Timestamp (Unix Epoch).
    

*   El receptor DEBE validar que la marca de tiempo del mensaje esté dentro de una ventana de tolerancia razonable (ej: 5 minutos) respecto a su reloj local para mitigar ataques de repetición.
    

## 

* * *

9\. Descubrimiento y Topología de Red

### 9.1 El Registry

El Qblet Registry actúa como la "Guía Telefónica" dinámica del ecosistema.

*   Es un componente de plano de control, no de plano de datos.
    
*   No enruta tráfico (no es un Proxy ni un Gateway).
    
*   Solo almacena metadatos de ubicación (ID -> URL Base) y estado de salud.
    
*   Seguridad: Todas las operaciones de escritura (Start/Pulse/Stop) DEBEN estar autenticadas mediante Q-Token para evitar el "Service Spoofing".
    
### 9.2 Descubrimiento por Capacidades (Capability-Based Discovery)

Para permitir refactorizaciones transparentes (ej: separar `security` en `users` y `auth`), los consumidores NO DEBEN acoplarse al ID del Qblet (`com.corp.security`), sino a la capacidad que necesitan.

*   **URN de Capacidad**: Identificador agnóstico de la implementación. Ej: `urn:qblet:capability:user-validation`.
*   **Resolución**: El cliente pregunta al Registry "¿Quién provee `urn:qblet:capability:user-validation`?" y recibe una lista de endpoints candidatos.
*   **Beneficio**: Permite mover lógica de negocio entre Qblets sin reconfigurar a los clientes.

### 9.3 Protocolo de Anuncio


1.  Start (Registro): Al arrancar, el Qblet envía POST /v1/announce con estado UP y un ttl (Time To Live), por ejemplo, 30 segundos.
    
2.  Pulse (Heartbeat): El Qblet DEBE renovar su anuncio periódicamente (ej: cada ttl / 2 segundos) para confirmar su disponibilidad.
    
3.  Stop (Deregistro): Al apagarse limpiamente, envía POST /v1/announce con estado DOWN.
    

### 9.3 Modo Fallo del Registry (Resiliencia)

Si el Registry no está disponible o cae:

*   El sistema no debe detenerse. Los Qblets DEBEN seguir funcionando utilizando su caché local de direcciones obtenidas previamente.
    
*   Los Qblets DEBEN entrar en "Modo Supervivencia", intentando reconectar con el Registry en segundo plano mediante backoff exponencial, sin bloquear el flujo de peticiones entrantes.
    

## 

* * *

10\. Resiliencia y Tolerancia a Fallos

### 10.1 Idempotencia

En sistemas distribuidos, la entrega "exactamente una vez" es imposible; solo existe "al menos una vez". Por tanto, la duplicidad es inevitable.

*   Todos los receptores de eventos y endpoints API no seguros (POST, PUT, PATCH) DEBEN ser diseñados para ser idempotentes.
    
*   Estrategia: Almacenar los IDs de eventos procesados (X-Qblet-Event-ID) en una tabla de deduplicación con un TTL (ej: 24h). Si llega un ID ya procesado, se retorna 200 OK inmediatamente sin ejecutar la lógica de negocio.
    

### 10.2 Circuit Breaker

Para evitar fallos en cascada:

*   Configuración: Si un Qblet destino falla más del 50% de las veces en una ventana móvil de 30 segundos.
    
*   Estado Abierto: El emisor debe dejar de enviar peticiones y fallar inmediatamente ("Fail Fast") con un error 503 Service Unavailable interno.
    
*   Recuperación: Tras un periodo de enfriamiento (ej: 10s), el circuito pasa a estado "Semi-Abierto" permitiendo una petición de prueba para verificar si el servicio remoto se ha recuperado.
    

### 10.3 Bulkheads (Compartimentos Estancos)

*   El Qblet NO DEBE utilizar el mismo pool de hilos o conexiones de base de datos para servir la API Síncrona (crítica para el usuario) y para procesar Webhooks Asíncronos (background). Una saturación en la cola de eventos no debe tumbar la capacidad del Qblet de responder a consultas de UI.
    

## 

* * *

11\. Observabilidad y Telemetría

La soberanía no implica oscuridad. Un Qblet debe ser transparente.

### 11.1 Logging Estructurado

La salida estándar (STDOUT) es el único destino de logs permitido.

*   Formato: JSON de una sola línea por entrada.
    
*   Niveles: DEBUG, INFO, WARN, ERROR, FATAL.
    
*   Contexto Obligatorio: ts (timestamp ISO8601), level, msg, qblet\_id, trace\_id.
    

### 11.2 Métricas (Golden Signals)

El Qblet debe exponer un endpoint /metrics compatible con Prometheus.

1.  Latencia: Histograma de tiempos de respuesta (http\_request\_duration\_seconds\_bucket).
    
2.  Tráfico: Contadores de peticiones totales (http\_requests\_total).
    
3.  Errores: Contadores de respuestas fallidas (http\_requests\_total{status=~"5.."}).
    
4.  Saturación: Uso de recursos del sistema (process\_cpu\_seconds\_total, process\_resident\_memory\_bytes).
    

### 11.3 Health Checks

*   Liveness (/healthz/live): Responde 200 OK si el proceso está vivo. Si falla, el orquestador (K8s) reiniciará el contenedor.
    
*   Readiness (/healthz/ready): Responde 200 OK si el Qblet está listo para aceptar tráfico (DB conectada, caché caliente). Si falla, el orquestador dejará de enviarle tráfico.
    

## 

* * *

12\. Gestión de Datos y Consistencia

### 12.1 Patrón Transactional Outbox

Para resolver el problema de la dualidad de escritura (escribir en DB y enviar a la red atómicamente):

1.  Iniciar Transacción de Base de Datos.
    
2.  Insertar/Actualizar Entidad de Negocio (ej: INSERT INTO orders).
    
3.  Insertar Evento en tabla local outbox (ej: INSERT INTO outbox).
    
4.  Commit Transacción (Ambos ocurren o ninguno ocurre).
    
5.  Un Relay Process asíncrono lee la tabla outbox, envía el Webhook, y borra el registro de outbox solo tras recibir confirmación 200 OK del destino.
    

### 12.2 Sagas (Coreografía)

Para transacciones distribuidas que abarcan múltiples Qblets, se PROHÍBE el uso de transacciones distribuidas (2PC/XA). Se DEBE utilizar el patrón Saga basado en Coreografía.

*   Compensación: Si un paso de la saga falla, el Qblet responsable emite un evento de fallo (ej: OrderFailed). Los participantes anteriores escuchan este evento y ejecutan transacciones compensatorias (ej: RefundPayment, ReleaseStock) para devolver el sistema a un estado consistente, aunque sea eventualmente.
    

## 

* * *

13\. Ciclo de Vida y Despliegue

### 13.1 Graceful Shutdown

La terminación limpia es vital para evitar errores 502 Bad Gateway durante los despliegues. Al recibir SIGTERM:

1.  Poner el endpoint de Readiness a false (503) para salir del balanceador de carga.
    
2.  Notificar al Registry el estado DOWN.
    
3.  Esperar un tiempo prudencial (ej: 10s) para drenar las peticiones en vuelo.
    
4.  Cerrar servidor HTTP y conexiones a Base de Datos.
    
5.  Salir con código 0.
    

### 13.2 Estrategias de Despliegue

La arquitectura Qblet soporta nativamente estrategias avanzadas:

*   Blue/Green: Desplegar la versión V2 en paralelo. Una vez saludable, actualizar el Registry para apuntar a la V2.
    
*   Canary: Desplegar V2. Configurar el Registry para que devuelva la URL de la V2 solo a un subconjunto de llamadas lookup (ej: 5%), permitiendo validar la nueva versión con tráfico real limitado.
    

## 

* * *

14\. Estrategia de Aseguramiento de Calidad (QA)

### 14.1 Pirámide de Pruebas

1.  Unitarias: Pruebas aisladas de la lógica de dominio pura.
    
2.  Integración: Pruebas de la API y la persistencia dentro del contenedor (Dockerizado).
    
3.  Contrato (Pact): Pruebas Consumer-Driven Contract (CDC). Permiten verificar que los cambios en un Qblet proveedor no rompen a sus consumidores sin necesidad de un entorno integrado. Obligatorio en CI/CD.
    
4.  End-to-End: Flujos completos críticos. Deben ser limitados debido a su fragilidad y coste de mantenimiento.
    

### 14.2 Pruebas de Caos (Chaos Engineering)

Se recomienda realizar pruebas de caos en entornos de staging:

*   Simular la caída del Registry o de la Base de Datos.
    
*   Introducir latencia artificial en la red.
    
*   Verificar que el Qblet se degrada elegantemente (Circuit Breakers activos, UI funcional en modo lectura).
    

## 

* * *

15\. Gobernanza, Versionado y Evolución

### 15.1 Versionado Semántico (SemVer 2.0.0)

El versionado aplica tanto a la API REST como a la estructura de los Eventos.

*   Major (X.y.z): Cambios incompatibles (Breaking Changes). Requiere desplegar una nueva ruta /api/v2.
    
*   Minor (x.Y.z): Nuevas funcionalidades compatibles hacia atrás (ej: nuevos campos en JSON).
    
*   Patch (x.y.Z): Correcciones de errores internos invisibles para el consumidor.
    

### 15.2 Política de Deprecación

Los elementos no pueden eliminarse abruptamente.

1.  Marcar el campo o endpoint como @deprecated en la documentación (OpenAPI).
    
2.  Añadir el header estándar Warning: 299 - "Deprecated API" en las respuestas HTTP afectadas.
    
3.  Mantener el soporte durante un periodo de gracia definido (mínimo 2 sprints o 1 mes) antes de la eliminación efectiva.
    

## 

* * *

16\. Contrato Operacional (DevOps)

Para cumplir con la metodología 12-Factor App, toda configuración dependiente del entorno DEBE ser inyectada vía Variables de Entorno.

Tabla Maestra de Configuración:

| Variable | Requerido | Descripción | Valor por Defecto |
| --- | --- | --- | --- |
| PORT | Sí | Puerto de escucha HTTP. | 8080 |
| QBLET_ID | No | Identidad del Servicio (Override). | (del yaml) |
| QBLET_ENV | Sí | Entorno de ejecución (prod, dev, test). | dev |
| QBLET_BASE_URL | Sí | URL Pública alcanzable (sin localhost). | http://localhost:8080 |
| QBLET_REGISTRY_URL | Sí | URL del servicio de descubrimiento. | null |
| QBLET_LOG_LEVEL | No | Nivel de verbosidad del log. | info |
| DB_CONNECTION_STRING | Sí | Credenciales completas de la BD. | - |
| QBLET_PRIVATE_KEY | Sí (Prod) | Clave Privada (RSA) para firmar tokens y webhooks. | - |
| QBLET_PUBLIC_KEY | Opcional | Clave Pública propia para exponer en JWKS (si no se deriva). | - |
| WEBHOOK_SECRET | Sí (Prod) | Secreto compartido para firmar eventos (HMAC). | - |

## 

* * *

17\. Anexo A: Glosario

*   Qblet: Unidad de despliegue de dominio soberano.
    
*   Registry: Servicio de descubrimiento dinámico de Qblets.
    
*   Dual Head: Requisito arquitectónico de exponer simultáneamente una UI y una API.
    
*   Machine Head: Interfaz API del Qblet para automatización.
    
*   Human Head: Interfaz visual del Qblet para operación humana.
    
*   Q-Token: Token JWT estandarizado para autenticación M2M entre Qblets.
    
*   Transactional Outbox: Patrón de diseño para garantizar la atomicidad en el envío de eventos.
    
*   Circuit Breaker: Patrón de estabilidad para prevenir fallos en cascada.
    
*   Dead Letter Queue (DLQ): Cola de destino para mensajes que no pudieron ser procesados tras múltiples intentos.