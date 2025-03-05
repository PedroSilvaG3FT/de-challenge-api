# Backend Application Documentation

![Logo](https://de-challenge-ui.vercel.app/logo.svg)

## Overview

This is the backend application built with Node.js and the Fastify framework. The application is designed to provide an API for managing flight search queries and integrates with the Amadeus API to perform flight searches. Additionally, it uses Supabase for user management and PostgreSQL database interactions. The application automatically utilizes Pino for logging purposes.

## Project Structure

The application follows a layered architecture to promote separation of concerns and maintainability. The main directories are:

- **controllers**: Contains the route handlers that process incoming requests and return responses.
- **services**: Contains the business logic and interacts with the repository layer.
- **repository**: Contains the data access layer, responsible for interacting with the database or external APIs.
- **helpers**: Contains utility functions and helpers used throughout the application.
- **hooks**: Contains custom hooks for managing application logic and middleware.
- **cache**: Implements caching to optimize query performance and reduce the number of API requests.

## Getting Started

- **npm install**
- **npm run dev**

## Prerequisites

Ensure you have the following versions of Node.js and npm installed:

- **Node.js**: v23.5
- **npm**: v10.2.3

You can check your installed versions by running:

```bash
node -v
npm -v
```
