package com.example.budget.dto;

import com.example.budget.model.ExpenseCategory;
import java.util.Map;

public class SummaryResponse {
    
    private Double totalExpenses;
    private Map<ExpenseCategory, Double> byCategory;
    
    public SummaryResponse() {
    }
    
    public SummaryResponse(Double totalExpenses, Map<ExpenseCategory, Double> byCategory) {
        this.totalExpenses = totalExpenses;
        this.byCategory = byCategory;
    }
    
    public Double getTotalExpenses() {
        return totalExpenses;
    }
    
    public void setTotalExpenses(Double totalExpenses) {
        this.totalExpenses = totalExpenses;
    }
    
    public Map<ExpenseCategory, Double> getByCategory() {
        return byCategory;
    }
    
    public void setByCategory(Map<ExpenseCategory, Double> byCategory) {
        this.byCategory = byCategory;
    }
}
