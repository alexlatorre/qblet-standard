# Protocolo de Intercambio (QIP-1)

## 1. Headers Estándar
Toda petición entre Qblets debe incluir:
* `X-Qblet-Origin-ID`: ID del llamante.
* `X-Qblet-Trace-ID`: UUID para trazabilidad distribuida.
* `X-Qblet-Span-ID`: UUID del segmento de ejecución actual.

## 2. Formato de Error
Uso estricto de **RFC 7807 (Problem Details)**.

```json
{
  "type": "https://qblet.io/probs/out-of-stock",
  "title": "Stock Insuficiente",
  "status": 409
}
\`\`\`
