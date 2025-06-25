# 📚 Library Management API

A RESTful API for managing books and borrowing records in a library system using **Express**, **TypeScript**, and **MongoDB (Mongoose)**.

---

## 🚀 Live Demo

🔗 **Live URL**: [https://l2-b5-a3-uthso.vercel.app/](https://l2-b5-a3-uthso.vercel.app/)

🔗 **GitHub Repo**: [https://github.com/uthso297/mongoose_library_server](https://github.com/uthso297/mongoose_library_server)

---

## 🎯 Objective

This project implements a Library Management System with the following key features:

- Book creation, retrieval, update, and deletion
- Borrowing logic with availability control
- Summary reports using aggregation
- Validation and schema enforcement
- Use of Mongoose static/instance methods & middleware
- Filtering, sorting, and pagination support with limit

---

## 🔧 Technologies Used

- **Express.js** for routing and middleware
- **TypeScript** for type safety
- **MongoDB** with **Mongoose** for data persistence and modeling
- Mongoose features:
  - Schema validation
  - Middleware (`pre`, `post`)
  - Static and instance methods
  - Aggregation pipeline

---

## 📦 Installation & Setup

```bash
# Clone the repository
git clone https://github.com/uthso297/mongoose_library_server.git

# Navigate into the directory
cd mongoose_library_server

# Install dependencies
npm install

# Create a .env file 
cp .env.example .env
# Edit .env to include your DB_USER & DB_PASS credentials

# Run the development server
npm run dev
