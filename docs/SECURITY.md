# Estándar de Seguridad (QSS-1)

## 1. Zero Trust
Ningún Qblet confía en otro por estar en la misma red.

## 2. Q-Token (JWT)
* Algoritmo obligatorio: **RS256**.
* Flujo: OAuth2 Client Credentials.
* Validación: Audiencia (`aud`) y Scopes (`scope`).

## 3. Webhooks
* Firma obligatoria HMAC-SHA256 en header `X-Qblet-Signature`.
* Validación contra Payload Crudo (Raw Body).
