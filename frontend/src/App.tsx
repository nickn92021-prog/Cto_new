import { useState, useEffect, useMemo, useCallback } from 'react';
import axios from 'axios';
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import './App.css';

ChartJS.register(ArcElement, Tooltip, Legend);

type ExpenseCategory = 'HOUSING' | 'FOOD' | 'TRANSPORT' | 'HEALTH' | 'PERSONAL' | 'LOAN' | 'ENTERTAINMENT' | 'OTHER';

interface Expense {
  id: number;
  date: string;
  description: string;
  category: ExpenseCategory;
  amount: number;
}

interface Debt {
  id: number;
  name: string;
  amountNeeded: number;
  minimumPayment: number;
}

function App() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [debts, setDebts] = useState<Debt[]>([]);
  const [reflection, setReflection] = useState('');

  const [newExpense, setNewExpense] = useState({
    date: '',
    description: '',
    category: 'FOOD' as ExpenseCategory,
    amount: 0,
  });

  const [newDebt, setNewDebt] = useState({
    name: '',
    amountNeeded: 0,
    minimumPayment: 0,
  });

  const fetchExpenses = useCallback(async () => {
    try {
      const response = await axios.get<Expense[]>('/api/expenses');
      setExpenses(response.data);
    } catch (error) {
      console.error('Error fetching expenses:', error);
    }
  }, []);

  const fetchDebts = useCallback(async () => {
    try {
      const response = await axios.get<Debt[]>('/api/debts');
      setDebts(response.data);
    } catch (error) {
      console.error('Error fetching debts:', error);
    }
  }, []);

  useEffect(() => {
    // Initial data fetch on mount
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchExpenses();
    fetchDebts();
  }, [fetchExpenses, fetchDebts]);

  const addExpense = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post('/api/expenses', newExpense);
      setNewExpense({
        date: '',
        description: '',
        category: 'FOOD',
        amount: 0,
      });
      fetchExpenses();
    } catch (error) {
      console.error('Error adding expense:', error);
    }
  };

  const deleteExpense = async (id: number) => {
    try {
      await axios.delete(`/api/expenses/${id}`);
      fetchExpenses();
    } catch (error) {
      console.error('Error deleting expense:', error);
    }
  };

  const addDebt = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post('/api/debts', newDebt);
      setNewDebt({
        name: '',
        amountNeeded: 0,
        minimumPayment: 0,
      });
      fetchDebts();
    } catch (error) {
      console.error('Error adding debt:', error);
    }
  };

  const deleteDebt = async (id: number) => {
    try {
      await axios.delete(`/api/debts/${id}`);
      fetchDebts();
    } catch (error) {
      console.error('Error deleting debt:', error);
    }
  };

  const categoryTotals = useMemo(() => {
    const totals: Record<ExpenseCategory, number> = {
      HOUSING: 0,
      FOOD: 0,
      TRANSPORT: 0,
      HEALTH: 0,
      PERSONAL: 0,
      LOAN: 0,
      ENTERTAINMENT: 0,
      OTHER: 0,
    };

    expenses.forEach((expense) => {
      totals[expense.category] += expense.amount;
    });

    return totals;
  }, [expenses]);

  const pieChartData = useMemo(() => {
    const labels: string[] = [];
    const data: number[] = [];
    const backgroundColor: string[] = [
      '#FF6384',
      '#36A2EB',
      '#FFCE56',
      '#4BC0C0',
      '#9966FF',
      '#FF9F40',
      '#FF6384',
      '#C9CBCF',
    ];

    Object.entries(categoryTotals).forEach(([category, amount]) => {
      if (amount > 0) {
        labels.push(category);
        data.push(amount);
      }
    });

    return {
      labels,
      datasets: [
        {
          data,
          backgroundColor: backgroundColor.slice(0, labels.length),
          borderWidth: 1,
        },
      ],
    };
  }, [categoryTotals]);

  const totalExpenses = useMemo(() => {
    return expenses.reduce((sum, expense) => sum + expense.amount, 0);
  }, [expenses]);

  return (
    <div className="app">
      <header>
        <h1>Budget Journal</h1>
        <p className="subtitle">Track your expenses and manage your debts</p>
      </header>

      <div className="container">
        <div className="grid">
          <div className="card">
            <h2>Expense Tracker</h2>
            <form onSubmit={addExpense} className="form">
              <input
                type="date"
                value={newExpense.date}
                onChange={(e) => setNewExpense({ ...newExpense, date: e.target.value })}
                required
              />
              <input
                type="text"
                placeholder="Description"
                value={newExpense.description}
                onChange={(e) => setNewExpense({ ...newExpense, description: e.target.value })}
                required
              />
              <select
                value={newExpense.category}
                onChange={(e) => setNewExpense({ ...newExpense, category: e.target.value as ExpenseCategory })}
              >
                <option value="HOUSING">Housing</option>
                <option value="FOOD">Food</option>
                <option value="TRANSPORT">Transport</option>
                <option value="HEALTH">Health</option>
                <option value="PERSONAL">Personal</option>
                <option value="LOAN">Loan</option>
                <option value="ENTERTAINMENT">Entertainment</option>
                <option value="OTHER">Other</option>
              </select>
              <input
                type="number"
                placeholder="Amount"
                value={newExpense.amount || ''}
                onChange={(e) => setNewExpense({ ...newExpense, amount: parseFloat(e.target.value) || 0 })}
                step="0.01"
                required
              />
              <button type="submit">Add Expense</button>
            </form>

            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Description</th>
                    <th>Category</th>
                    <th>Amount</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {expenses.map((expense) => (
                    <tr key={expense.id}>
                      <td>{expense.date}</td>
                      <td>{expense.description}</td>
                      <td>{expense.category}</td>
                      <td>${expense.amount.toFixed(2)}</td>
                      <td>
                        <button className="delete-btn" onClick={() => deleteExpense(expense.id)}>
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {expenses.length === 0 && (
                <p className="empty-message">No expenses yet. Add your first expense above!</p>
              )}
            </div>
          </div>

          <div className="card">
            <h2>Debt Tracker</h2>
            <form onSubmit={addDebt} className="form">
              <input
                type="text"
                placeholder="Name"
                value={newDebt.name}
                onChange={(e) => setNewDebt({ ...newDebt, name: e.target.value })}
                required
              />
              <input
                type="number"
                placeholder="Amount Needed"
                value={newDebt.amountNeeded || ''}
                onChange={(e) => setNewDebt({ ...newDebt, amountNeeded: parseFloat(e.target.value) || 0 })}
                step="0.01"
                required
              />
              <input
                type="number"
                placeholder="Minimum Payment"
                value={newDebt.minimumPayment || ''}
                onChange={(e) => setNewDebt({ ...newDebt, minimumPayment: parseFloat(e.target.value) || 0 })}
                step="0.01"
                required
              />
              <button type="submit">Add Debt</button>
            </form>

            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Amount Needed</th>
                    <th>Min Payment</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {debts.map((debt) => (
                    <tr key={debt.id}>
                      <td>{debt.name}</td>
                      <td>${debt.amountNeeded.toFixed(2)}</td>
                      <td>${debt.minimumPayment.toFixed(2)}</td>
                      <td>
                        <button className="delete-btn" onClick={() => deleteDebt(debt.id)}>
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {debts.length === 0 && (
                <p className="empty-message">No debts tracked. Add your first debt above!</p>
              )}
            </div>
          </div>

          <div className="card">
            <h2>Monthly Budget Review</h2>
            <div className="total-expenses">
              <h3>Total Expenses: ${totalExpenses.toFixed(2)}</h3>
            </div>
            {expenses.length > 0 ? (
              <div className="pie-chart-container">
                <Pie data={pieChartData} options={{ responsive: true, maintainAspectRatio: true }} />
              </div>
            ) : (
              <p className="empty-message">No expense data to display in the chart yet.</p>
            )}
          </div>

          <div className="card">
            <h2>Monthly Reflection</h2>
            <textarea
              className="reflection-textarea"
              placeholder="Write your monthly reflection here..."
              value={reflection}
              onChange={(e) => setReflection(e.target.value)}
              rows={10}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
