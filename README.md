# Qblet Architecture Standard
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Status: Stable](https://img.shields.io/badge/Status-Stable-green.svg)](./docs/SPECIFICATION.md)

> **"Ni tan pequeño que sea irrelevante, ni tan grande que sea inmanejable. Un Qblet es del tamaño de un Dominio de Negocio."**

**Qblet** es un estándar de arquitectura que resuelve la fatiga de los microservicios. Propone unidades de software **soberanas**, **autocontenidas** y **sociales**.

## 🚀 Inicio Rápido

### Usando Docker (Recomendado)
Levanta un ecosistema completo con Inventario y Tienda:

\`\`\`bash
cd examples
docker-compose up --build
\`\`\`

### Usando Node.js
\`\`\`bash
cd boilerplate-node
npm install
npm start
\`\`\`

## 🏗 Los 4 Pilares
1.  **Granularidad de Dominio:** Gestión de conceptos completos, no funciones.
2.  **Dual Head:** Todo Qblet tiene UI (Humana) y API (Máquina).
3.  **Soberanía de Datos:** Bases de datos aisladas por defecto.
4.  **Social por Defecto:** Comunicación P2P mediante Webhooks firmados.

Consulta la [Especificación Completa](./docs/SPECIFICATION.md).
Consulta la [Whitepaper Técnico](./docs/WHITEPAPER.md).