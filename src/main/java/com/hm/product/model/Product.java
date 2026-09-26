package com.hm.product.model;

public class Product {

    // =========================
    // 1. PRODUCT DATA / FIELDS
    // =========================

    private Long id;
    private String name;
    private String category;
    private String brand;

    // WRITE PRICE HERE
    private double price;

    private String size;
    private String color;
    private int stock;
    private String description;


    // =========================
    // 2. DEFAULT CONSTRUCTOR
    // =========================

    public Product() {
    }


    // =========================
    // 3. CONSTRUCTOR
    // =========================

    public Product(Long id, String name, String category, String brand,
                   double price, String size, String color,
                   int stock, String description) {

        this.id = id;
        this.name = name;
        this.category = category;
        this.brand = brand;
        this.price = price;
        this.size = size;
        this.color = color;
        this.stock = stock;
        this.description = description;
    }


    // =========================
    // 4. GETTERS AND SETTERS
    // =========================

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

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getBrand() {
        return brand;
    }

    public void setBrand(String brand) {
        this.brand = brand;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public String getSize() {
        return size;
    }

    public void setSize(String size) {
        this.size = size;
    }

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }

    public int getStock() {
        return stock;
    }

    public void setStock(int stock) {
        this.stock = stock;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}


