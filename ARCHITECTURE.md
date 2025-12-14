# Budget Journal MVP - Architecture Documentation

## Project Overview

This is a full-stack Budget Journal application built with Spring Boot (backend) and React with TypeScript (frontend). The application allows users to track expenses, manage debts, visualize spending patterns, and write monthly reflections.

## Technology Stack

### Backend
- **Framework**: Spring Boot 3.2.0
- **Language**: Java 17
- **Build Tool**: Maven
- **Database**: H2 (in-memory)
- **Dependencies**:
  - Spring Web
  - Spring Data JPA
  - H2 Database

### Frontend
- **Framework**: React 18
- **Language**: TypeScript
- **Build Tool**: Vite
- **Dependencies**:
  - axios (HTTP client)
  - chart.js + react-chartjs-2 (data visualization)

## Architecture

### Backend Structure

```
backend/
├── src/main/java/com/example/budget/
│   ├── BudgetApplication.java          # Main Spring Boot application
│   ├── model/
│   │   ├── Expense.java                # Expense entity
│   │   ├── Debt.java                   # Debt entity
│   │   └── ExpenseCategory.java        # Enum for expense categories
│   ├── repository/
│   │   ├── ExpenseRepository.java      # JPA repository for Expense
│   │   └── DebtRepository.java         # JPA repository for Debt
│   ├── controller/
│   │   └── BudgetController.java       # REST API controller
│   └── dto/
│       └── SummaryResponse.java        # DTO for summary endpoint
└── src/main/resources/
    └── application.yml                 # Application configuration
```

### Frontend Structure

```
frontend/
├── src/
│   ├── App.tsx                         # Main React component
│   ├── App.css                         # Styling with blue theme
│   ├── main.tsx                        # Application entry point
│   └── index.css                       # Global styles
├── vite.config.ts                      # Vite configuration with proxy
└── package.json                        # Node dependencies
```

## API Endpoints

### Expenses
- `GET /api/expenses` - Retrieve all expenses
- `POST /api/expenses` - Create a new expense
- `DELETE /api/expenses/{id}` - Delete an expense by ID

### Debts
- `GET /api/debts` - Retrieve all debts
- `POST /api/debts` - Create a new debt
- `DELETE /api/debts/{id}` - Delete a debt by ID

### Summary
- `GET /api/summary` - Get expense summary with category breakdown

## Data Models

### Expense
```java
{
  id: Long,
  date: LocalDate,
  description: String,
  category: ExpenseCategory,
  amount: Double
}
```

### Debt
```java
{
  id: Long,
  name: String,
  amountNeeded: Double,
  minimumPayment: Double
}
```

### ExpenseCategory Enum
- HOUSING
- FOOD
- TRANSPORT
- HEALTH
- PERSONAL
- LOAN
- ENTERTAINMENT
- OTHER

## Key Features

### 1. Expense Tracker
- Add expenses with date, description, category, and amount
- View all expenses in a table
- Delete individual expenses
- Automatic category-based organization

### 2. Debt Tracker
- Add debts with name, amount needed, and minimum payment
- View all debts in a table
- Delete individual debts

### 3. Monthly Budget Review
- Display total expenses
- Pie chart visualization of spending by category
- Dynamic updates as expenses are added/removed

### 4. Monthly Reflection
- Text area for writing monthly notes and reflections
- Local state management (not persisted to backend)

## Design Decisions

### Frontend
- **State Management**: React hooks (useState, useEffect, useMemo)
- **Data Fetching**: Axios for HTTP requests
- **Memoization**: useMemo for expensive calculations (category totals, chart data)
- **Styling**: CSS with custom properties for theming

### Backend
- **Database**: H2 in-memory for simplicity (data resets on restart)
- **CORS**: Enabled for localhost:5173 to allow frontend communication
- **Architecture**: Standard Spring Boot layered architecture (Controller → Repository → Entity)

### Communication
- **Proxy**: Vite proxy forwards `/api/*` requests to backend on port 8080
- **CORS**: Backend explicitly allows requests from localhost:5173

## Color Theme

The application uses a blue color scheme:
- Primary Blue: `#2F80ED`
- Dark Blue: `#1a5fc4`
- Background: `#f6f9ff`
- Card Background: `#ffffff`
- Border: `#e2e8f0`

## Running the Application

### Backend
```bash
cd backend
mvn spring-boot:run
```
Runs on: http://localhost:8080

### Frontend
```bash
cd frontend
npm install  # First time only
npm run dev
```
Runs on: http://localhost:5173

## Development Notes

- The H2 database is in-memory, so all data is lost when the backend stops
- The frontend proxy configuration eliminates CORS issues during development
- Both servers must be running for the application to work properly
- No authentication/authorization is implemented in this MVP

## Future Enhancements (Not in MVP)

- Persistent database (PostgreSQL, MySQL)
- User authentication and authorization
- Monthly reflection persistence
- Export data to CSV/PDF
- Budget goals and alerts
- Date range filtering
- Edit functionality for expenses and debts
- Charts for historical data
