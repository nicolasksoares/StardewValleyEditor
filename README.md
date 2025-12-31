# 🐔 Stardew Valley Save Editor

> A full-stack save file editor for Stardew Valley, featuring a modern web interface for inventory management and player stats manipulation.

## 📖 About the Project

This application allows Stardew Valley players to upload their save files (`.xml`), visualize their player data, and edit their inventory in real-time.

Unlike traditional client-side editors, this project implements a **Hybrid Architecture** designed to demonstrate advanced software engineering concepts:

1.  **Client-Side Processing (React):** The parsing and modification of the heavy XML save files happen entirely in the user's browser, ensuring performance and data privacy.
2.  **Server-Side Catalog (Spring Boot):** A robust backend serves as the "Source of Truth" for the thousands of game items, enabling advanced search, categorization, and data persistence via a relational database.

## 🛠️ Tech Stack

Built with a focus on modern web architecture and clean code.

### Frontend (Client)
* **React.js**: Core library for the reactive UI.
* **JavaScript (ES6+)**: XML parsing logic and state management.
* **Tailwind CSS**: Utility-first framework for styling.
* **Vite**: Build tool and development server.

### Backend (Server)
* **Java 17**: Core language.
* **Spring Boot 3**: Framework for the REST API.
* **Spring Data JPA**: Persistence layer.
* **PostgreSQL**: Relational database storing the comprehensive Game Item Catalog (IDs, Names, Categories, Metadata).

---
## ⚙️ Getting Started

### Prerequisites
* Node.js & npm/yarn
* JDK 17 or higher
* PostgreSQL installed and running

### 1. Database Setup
Create a PostgreSQL database named `stardew_db` and configure your credentials in the Backend's `application.properties` file.

### 2. Running the Backend (Spring Boot)
```bash
cd backend
./mvnw spring-boot:run
# The server will start at http://localhost:8080
# Note: On the first run, the application will seed the database with the default item list.
