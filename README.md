# Flatirons Coding Test - Product Data Manager

Flatirons Project Development: CSV Upload App Overview - Watch Video

<iframe src="https://www.loom.com/embed/51af0ff0a24a4847905f1aa11ce7139a?sid=2763ac4a-5943-41f1-af7d-9c33eeac1c05" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>

[Watch the video on Loom](https://www.loom.com/embed/51af0ff0a24a4847905f1aa11ce7139a?sid=2763ac4a-5943-41f1-af7d-9c33eeac1c05)

## Description

**Flatirons Coding Test** is a streamlined application designed to help businesses manage product data efficiently. With **Flatirons Coding Test**, users can upload CSV files containing product details, automatically process them, convert prices across various currencies, and retrieve product information through a user-friendly interface.

This project was developed as a comprehensive data management solution to assist businesses in organizing, updating, and viewing product details with ease.

## Features

- **Upload Products CSV**: Users can upload CSV files with product details.
- **Data Validation**: The application sanitizes and validates data for accuracy.
- **Multi-Currency Support**: Converts product prices into multiple currencies using the latest exchange rates.
- **View Products**: Users can view and search for products with filters like name, price, and expiration date.

---

## User Stories

- **Upload CSV**: Users can upload a CSV file containing product information, which the system validates and processes.
- **Search Products**: Users can search for products using filters (e.g., name, price range, expiration date).

---

## Components

- **Dashboard**: Central hub displaying key metrics and product information.

---

## Backend - API Documentation

## Models

### Product Model

```sql
TABLE products (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  currencies JSONB,
  expiration DATE NOT NULL,
);
```

## API Endpoints

| HTTP Method | URL               | Request Body             | Success Status | Error Status | Description                                                  |
| ----------- | ----------------- | ------------------------ | -------------- | ------------ | ------------------------------------------------------------ |
| `POST`      | `/file-processing/upload` | `{file: csv}` | 200 | 400 | Uploads and processes a CSV file containing product data     |
| `POST`      | `/products`       | `{name, price, expiration}` | 201        | 400          | Creates a new product with the provided details              |
| `GET`       | `/products`       | `?name&minPrice&maxPrice&minExpiration&maxExpiration&sortField&sortOrder` | 200 | 404 | Retrieves a list of products with optional filtering and sorting options |

---

## Development

### Setup

1. Clone the repository.
2. Run `npm install` to install dependencies.
3. Create a `.env` file and set up environment variables for database connection, API keys, etc.
4. Run `npx prisma generate` to start get the prisma environment ready.
5. Run `npm run start:dev` to start the development server.

---

## Links

### Technologies

- [Neon](https://console.neon.tech/)
- [Prisma ORM](https://www.prisma.io/)
- [NestJS](https://nestjs.com/)
