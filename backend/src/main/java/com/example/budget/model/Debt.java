package com.example.budget.model;

import jakarta.persistence.*;

@Entity
@Table(name = "debts")
public class Debt {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String name;
    
    private Double amountNeeded;
    
    private Double minimumPayment;
    
    public Debt() {
    }
    
    public Debt(String name, Double amountNeeded, Double minimumPayment) {
        this.name = name;
        this.amountNeeded = amountNeeded;
        this.minimumPayment = minimumPayment;
    }
    
    public Long getId() {
        return id;
    }
    
    public void setId(Long id) {
        this.id = id;
    }
    
    public String getName() {
        return name;
    }
    
    public void setName(String name) {
        this.name = name;
    }
    
    public Double getAmountNeeded() {
        return amountNeeded;
    }
    
    public void setAmountNeeded(Double amountNeeded) {
        this.amountNeeded = amountNeeded;
    }
    
    public Double getMinimumPayment() {
        return minimumPayment;
    }
    
    public void setMinimumPayment(Double minimumPayment) {
        this.minimumPayment = minimumPayment;
    }
}
