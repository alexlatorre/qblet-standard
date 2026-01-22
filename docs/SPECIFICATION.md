# Especificación del Estándar Qblet (v3.1)

## 1. Definiciones
Un **Qblet** es un sistema de software desplegable independientemente que encapsula un subdominio de negocio.

## 2. Requisitos de Arquitectura

### 2.0 Resiliencia Estructural
* **REQ-ARC-01:** El sistema DEBE soportar "Discovery by Capability" para permitir refactorizaciones dinámicas sin afectar a los consumidores.

### 2.1 Soberanía de Datos
* **REQ-DAT-01:** Un Qblet NUNCA comparte su esquema de base de datos.
* **REQ-DAT-02:** El acceso a datos es exclusivamente vía API.

### 2.2 Dualidad de Interfaz (Dual Head)
* **Human Head:** UI para operación humana.
* **Machine Head:** API REST/gRPC para operación robótica.

### 2.3 Comunicación
* Síncrona: REST con JWT.
* Asíncrona: Webhooks P2P con CloudEvents.
