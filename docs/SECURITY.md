# Estándar de Seguridad (QSS-1)

## 1. Zero Trust
Ningún Qblet confía en otro por estar en la misma red.

## 2. Q-Token (JWT)
* Algoritmo obligatorio: **RS256**.
* Flujo: OAuth2 Client Credentials.
* Validación: Audiencia (`aud`) y Scopes (`scope`).
* **Nota**: Para interacciones basadas en capacidades, el `scope` DEBERÍA coincidir con la URN de la capacidad (ej: `scope: urn:qblet:capability:inventory-check`).

## 3. Webhooks
* Firma obligatoria HMAC-SHA256 en header `X-Qblet-Signature`.
* Validación contra Payload Crudo (Raw Body).
