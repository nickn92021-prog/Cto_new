# Getting Started with Budget Journal MVP

## Quick Start Guide

This guide will help you get the Budget Journal application up and running on your local machine.

## Prerequisites

Make sure you have the following installed:
- **Java 17 or higher** - [Download](https://adoptium.net/)
- **Maven 3.8+** - [Download](https://maven.apache.org/download.cgi)
- **Node.js 18+** - [Download](https://nodejs.org/)
- **npm** (comes with Node.js)

## Project Structure

```
budget-journal-mvp/
├── backend/          # Spring Boot backend
├── frontend/         # React + TypeScript frontend
├── README.md         # Project documentation
├── ARCHITECTURE.md   # Technical architecture details
└── .gitignore        # Git ignore file
```

## Step 1: Start the Backend

Open a terminal and navigate to the backend directory:

```bash
cd backend
```

### Option A: Using Maven Wrapper (if available)
```bash
./mvnw spring-boot:run
```

### Option B: Using System Maven
```bash
mvn spring-boot:run
```

The backend will start on **http://localhost:8080**

You should see output like:
```
Started BudgetApplication in X.XXX seconds
```

## Step 2: Start the Frontend

Open a **NEW terminal window** (keep the backend running) and navigate to the frontend directory:

```bash
cd frontend
```

### First Time Setup
Install dependencies:
```bash
npm install
```

### Start Development Server
```bash
npm run dev
```

The frontend will start on **http://localhost:5173**

You should see output like:
```
  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

## Step 3: Open the Application

Open your web browser and navigate to:
```
http://localhost:5173
```

You should see the Budget Journal application with:
- Expense Tracker section
- Debt Tracker section
- Monthly Budget Review with pie chart
- Monthly Reflection text area

## Testing the Application

### Add an Expense
1. In the "Expense Tracker" section, fill in:
   - Date: Select today's date
   - Description: e.g., "Grocery shopping"
   - Category: Select "FOOD"
   - Amount: e.g., 50.00
2. Click "Add Expense"
3. The expense should appear in the table below
4. The pie chart should update to show the category

### Add a Debt
1. In the "Debt Tracker" section, fill in:
   - Name: e.g., "Credit Card"
   - Amount Needed: e.g., 5000.00
   - Minimum Payment: e.g., 150.00
2. Click "Add Debt"
3. The debt should appear in the table below

### Delete Items
- Click the "Delete" button next to any expense or debt to remove it

### View Budget Summary
- The "Monthly Budget Review" section shows:
  - Total expenses
  - Pie chart breakdown by category (only shows categories with expenses)

### Write Reflection
- Use the "Monthly Reflection" text area to write notes
- Note: This is stored in browser memory only and will be lost on page refresh

## Troubleshooting

### Backend won't start
**Error: Port 8080 already in use**
- Another application is using port 8080
- Solution: Stop the other application or change the port in `backend/src/main/resources/application.yml`

**Error: JAVA_HOME not set**
- Java is not properly installed or configured
- Solution: Install Java 17+ and set JAVA_HOME environment variable

### Frontend won't start
**Error: Port 5173 already in use**
- Another application is using port 5173
- Solution: Stop the other application or the dev server will use the next available port

**Error: Cannot connect to backend**
- Make sure the backend is running on port 8080
- Check the browser console for error messages
- Verify the proxy configuration in `frontend/vite.config.ts`

### Data not persisting
- The H2 database is in-memory, so all data is lost when the backend stops
- This is expected behavior for the MVP
- To persist data, you would need to configure a persistent database (not included in MVP)

## Development Commands

### Backend
```bash
# Compile only
mvn clean compile

# Run tests
mvn test

# Package as JAR
mvn clean package

# Run the application
mvn spring-boot:run
```

### Frontend
```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Run linter
npm run lint

# Preview production build
npm run preview
```

## API Endpoints

Once the backend is running, you can test the API endpoints:

### Expenses
- GET http://localhost:8080/api/expenses - List all expenses
- POST http://localhost:8080/api/expenses - Create expense
- DELETE http://localhost:8080/api/expenses/{id} - Delete expense

### Debts
- GET http://localhost:8080/api/debts - List all debts
- POST http://localhost:8080/api/debts - Create debt
- DELETE http://localhost:8080/api/debts/{id} - Delete debt

### Summary
- GET http://localhost:8080/api/summary - Get expense summary

### H2 Database Console
- URL: http://localhost:8080/h2-console
- JDBC URL: `jdbc:h2:mem:budgetdb`
- Username: `sa`
- Password: (leave empty)

## Next Steps

Now that you have the application running:
1. Try adding various expenses in different categories
2. Watch the pie chart update dynamically
3. Add some debts to track
4. Write some reflection notes

Refer to `ARCHITECTURE.md` for technical details about the implementation.
