package com.example.budget.model;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "expenses")
public class Expense {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private LocalDate date;
    
    private String description;
    
    @Enumerated(EnumType.STRING)
    private ExpenseCategory category;
    
    private Double amount;
    
    public Expense() {
    }
    
    public Expense(LocalDate date, String description, ExpenseCategory category, Double amount) {
        this.date = date;
        this.description = description;
        this.category = category;
        this.amount = amount;
    }
    
    public Long getId() {
        return id;
    }
    
    public void setId(Long id) {
        this.id = id;
    }
    
    public LocalDate getDate() {
        return date;
    }
    
    public void setDate(LocalDate date) {
        this.date = date;
    }
    
    public String getDescription() {
        return description;
    }
    
    public void setDescription(String description) {
        this.description = description;
    }
    
    public ExpenseCategory getCategory() {
        return category;
    }
    
    public void setCategory(ExpenseCategory category) {
        this.category = category;
    }
    
    public Double getAmount() {
        return amount;
    }
    
    public void setAmount(Double amount) {
        this.amount = amount;
    }
}
