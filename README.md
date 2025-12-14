# Budget Journal MVP

A complete Budget Journal web application with Spring Boot backend and React frontend.

## Features

- **Expense Tracker**: Add, view, and delete expenses with categories
- **Debt Tracker**: Manage debts with amount needed and minimum payments
- **Monthly Budget Review**: Visualize spending with a pie chart by category
- **Monthly Reflection**: Text area for monthly notes and reflections

## Tech Stack

### Backend
- Spring Boot 3.2.0
- Spring Data JPA
- H2 Database (in-memory)
- Java 17

### Frontend
- React 18
- TypeScript
- Vite
- Axios
- Chart.js
- React-Chartjs-2

## Getting Started

### Prerequisites
- Java 17 or higher
- Maven
- Node.js 18 or higher
- npm

### Running the Backend

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Run the Spring Boot application:
   ```bash
   ./mvnw spring-boot:run
   ```
   Or if Maven is installed globally:
   ```bash
   mvn spring-boot:run
   ```

The backend API will be available at `http://localhost:8080`

### Running the Frontend

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies (first time only):
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

The frontend will be available at `http://localhost:5173`

## API Endpoints

- `GET /api/expenses` - Get all expenses
- `POST /api/expenses` - Create a new expense
- `DELETE /api/expenses/{id}` - Delete an expense
- `GET /api/debts` - Get all debts
- `POST /api/debts` - Create a new debt
- `DELETE /api/debts/{id}` - Delete a debt
- `GET /api/summary` - Get expense summary with category breakdown

## Expense Categories

- HOUSING
- FOOD
- TRANSPORT
- HEALTH
- PERSONAL
- LOAN
- ENTERTAINMENT
- OTHER

## Database

The application uses an in-memory H2 database. Data persists during the session but is lost when the application stops.

To access the H2 console:
1. Navigate to `http://localhost:8080/h2-console`
2. Use JDBC URL: `jdbc:h2:mem:budgetdb`
3. Username: `sa`
4. Password: (leave empty)
