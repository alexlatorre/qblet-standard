# Qblet Registry Spec

## 1. Responsabilidad
Directorio dinámico de servicios (Service Discovery).

## 2. API
* `POST /v1/announce`: Registrarse al iniciar (Incluye lista de `capabilities` activas).
* `GET /v1/lookup`: Encontrar Qblets.
  * Por ID: `?id=com.corp.security` (Retorna 1 o 0).
  * Por Capacidad: `?capability=urn:qblet:auth:user-validation` (Retorna lista [] de proveedores).

