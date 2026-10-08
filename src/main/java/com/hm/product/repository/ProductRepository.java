package com.hm.product.repository;

import com.hm.product.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Long> {

    // Find products by section: WOMEN, MEN, KIDS
    List<Product> findBySectionIgnoreCase(String section);

    // Find products by section and category
    List<Product> findBySectionIgnoreCaseAndCategoryIgnoreCase(
            String section,
            String category
    );
}