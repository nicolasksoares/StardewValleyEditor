# 🐔 Stardew Valley Save Editor

> Um editor de save files fullstack para Stardew Valley, permitindo manipulação de inventário e recursos do jogador através de uma interface web moderna.

## 📖 Sobre o Projeto

Este projeto é uma aplicação web que permite aos jogadores de Stardew Valley fazer upload de seus arquivos de save (`.xml`), visualizar seus dados e editar seu inventário em tempo real.

Diferente de editores tradicionais puramente client-side, este projeto utiliza uma **Arquitetura Híbrida**:
1.  **Processamento Local:** A leitura e modificação do arquivo XML pesado é feita inteiramente no navegador do cliente (React) para garantir performance e privacidade.
2.  **Catálogo Centralizado:** Uma API robusta (Spring Boot) serve como fonte de verdade para os milhares de itens do jogo, permitindo pesquisa avançada, categorização e dados atualizados via banco de dados relacional.

## 🛠️ Tech Stack

Este projeto foi desenvolvido com foco em Engenharia de Software e arquitetura web moderna.

### Frontend (Client)
* **React.js**: Biblioteca principal para a interface reativa.
* **Javascript (ES6+)**: Lógica de parser XML e manipulação de estado.
* **Tailwind CSS** (Sugestão): Para estilização rápida e responsiva.
* **Vite**: Build tool.

### Backend (Server)
* **Java 17+**: Linguagem base.
* **Spring Boot 3**: Framework para criação da API REST.
* **Spring Data JPA**: Camada de persistência.
* **PostgreSQL**: Banco de dados relacional para armazenar o catálogo de itens do jogo (IDs, Nomes, Descrições, Categorias).

---

## ⚙️ Como Rodar o Projeto

### Pré-requisitos
* Node.js e npm/yarn
* JDK 17 ou superior
* PostgreSQL instalado e rodando

### 1. Configurando o Banco de Dados
Crie um banco de dados no Postgres chamado `stardew_db` e configure as credenciais no arquivo `application.properties` do Backend.

### 2. Rodando o Backend (Spring Boot)
```bash
cd backend
./mvnw spring-boot:run
# O servidor iniciará em http://localhost:8080
