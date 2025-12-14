package com.example.budget.controller;

import com.example.budget.dto.SummaryResponse;
import com.example.budget.model.Debt;
import com.example.budget.model.Expense;
import com.example.budget.model.ExpenseCategory;
import com.example.budget.repository.DebtRepository;
import com.example.budget.repository.ExpenseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.EnumMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:5173")
public class BudgetController {
    
    @Autowired
    private ExpenseRepository expenseRepository;
    
    @Autowired
    private DebtRepository debtRepository;
    
    @GetMapping("/expenses")
    public List<Expense> getAllExpenses() {
        return expenseRepository.findAll();
    }
    
    @PostMapping("/expenses")
    public Expense createExpense(@RequestBody Expense expense) {
        return expenseRepository.save(expense);
    }
    
    @DeleteMapping("/expenses/{id}")
    public ResponseEntity<Void> deleteExpense(@PathVariable Long id) {
        expenseRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
    
    @GetMapping("/debts")
    public List<Debt> getAllDebts() {
        return debtRepository.findAll();
    }
    
    @PostMapping("/debts")
    public Debt createDebt(@RequestBody Debt debt) {
        return debtRepository.save(debt);
    }
    
    @DeleteMapping("/debts/{id}")
    public ResponseEntity<Void> deleteDebt(@PathVariable Long id) {
        debtRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
    
    @GetMapping("/summary")
    public SummaryResponse getSummary() {
        List<Expense> expenses = expenseRepository.findAll();
        
        double totalExpenses = expenses.stream()
                .mapToDouble(Expense::getAmount)
                .sum();
        
        Map<ExpenseCategory, Double> byCategory = new EnumMap<>(ExpenseCategory.class);
        
        for (ExpenseCategory category : ExpenseCategory.values()) {
            double categoryTotal = expenses.stream()
                    .filter(e -> e.getCategory() == category)
                    .mapToDouble(Expense::getAmount)
                    .sum();
            byCategory.put(category, categoryTotal);
        }
        
        return new SummaryResponse(totalExpenses, byCategory);
    }
}
