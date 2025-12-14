# Software Requirement (IntelliJ IDEA Setup)

This document explains how to set up and run this **Spring Boot (backend)** + **React/Vite (frontend)** web application inside **IntelliJ IDEA**.

## 1) Software you must install

1. **Git** (to clone the repository)
2. **IntelliJ IDEA**
   - Recommended: **IntelliJ IDEA Ultimate** (best support for Spring + React)
   - IntelliJ IDEA Community will work for the backend; you can still run the frontend from the built-in terminal
3. **Java JDK 17** (Temurin/Adoptium recommended)
4. **Maven 3.8+** (required because this repo does not include the Maven Wrapper `mvnw`)
5. **Node.js 18+** (includes **npm**)

Optional but recommended:
- **nvm** (Node Version Manager) to manage Node versions
- A modern browser (Chrome/Edge/Firefox)

## 2) Clone the project

1. Open a terminal.
2. Clone the repository:
   ```bash
   git clone <REPO_URL>
   ```
3. Open the folder:
   ```bash
   cd <PROJECT_FOLDER>
   ```

## 3) Open the project in IntelliJ IDEA

1. Start IntelliJ IDEA.
2. Click **File → Open...**
3. Select the project root folder (the folder that contains `backend/` and `frontend/`).
4. If prompted, click **Trust Project**.

## 4) Configure Java (JDK 17) in IntelliJ

1. Open **File → Project Structure...**
2. Under **Project**:
   - Set **Project SDK** to **Java 17**
   - Set **Language level** to **17**
3. Click **Apply** then **OK**.

## 5) Import the backend (Spring Boot / Maven)

1. In the Project tool window, open `backend/pom.xml`.
2. If IntelliJ does not auto-import it, right-click `pom.xml` and select:
   - **Add as Maven Project**
3. Wait for IntelliJ to finish downloading dependencies and indexing.

## 6) Run the backend from IntelliJ

1. In IntelliJ, open:
   `backend/src/main/java/com/example/budget/BudgetApplication.java`
2. Click the green **Run** arrow next to the `main` method (or in the top-right toolbar).
3. Confirm the backend is running:
   - API base URL: `http://localhost:8080`

Useful URLs:
- H2 console: `http://localhost:8080/h2-console`
  - JDBC URL: `jdbc:h2:mem:budgetdb`
  - Username: `sa`
  - Password: (empty)

## 7) Configure and run the frontend (React + Vite) in IntelliJ

1. (Ultimate recommended) Ensure the **Node.js** plugin is enabled:
   - **Settings/Preferences → Plugins → Node.js**
2. Configure Node:
   - **Settings/Preferences → Languages & Frameworks → Node.js**
   - Select your Node interpreter (Node 18+)
3. Open IntelliJ **Terminal** (bottom panel) and run:
   ```bash
   cd frontend
   npm install
   npm run dev
   ```
4. Confirm the frontend is running:
   - UI URL: `http://localhost:5173`

Note:
- The frontend uses a Vite proxy so calls to `/api/*` are forwarded to the backend at `http://localhost:8080`.

## 8) (Optional) Create Run Configurations in IntelliJ

Backend:
1. **Run → Edit Configurations... → + → Spring Boot** (or **Application**)
2. Main class: `com.example.budget.BudgetApplication`
3. Use **JDK 17**

Frontend:
1. **Run → Edit Configurations... → + → npm**
2. package.json: `frontend/package.json`
3. Command: `run`
4. Scripts: `dev`

## 9) Common issues

1. **Port already in use**
   - Backend: 8080
   - Frontend: 5173
   Stop the conflicting process or change ports.

2. **Frontend cannot connect to backend**
   - Make sure the backend is running on `http://localhost:8080`
   - Verify `frontend/vite.config.ts` contains the proxy for `/api`
