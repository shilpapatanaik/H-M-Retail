
package com.hm.product.controller;

import com.hm.product.model.ProductSizeStock;
import com.hm.product.repository.ProductSizeStockRepository;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping("/products")
@CrossOrigin(origins = "http://localhost:5173")
public class ProductSizeStockController {

    private final ProductSizeStockRepository stockRepository;

    public ProductSizeStockController(
            ProductSizeStockRepository stockRepository) {
        this.stockRepository = stockRepository;
    }

    @GetMapping("/{productId}/sizes")
    public ResponseEntity<List<ProductSizeStock>> getProductSizes(
            @PathVariable Long productId) {

        List<ProductSizeStock> sizes =
                stockRepository.findByProductIdOrderByIdAsc(productId);

        return ResponseEntity.ok(sizes);
    }

    @PostMapping("/{productId}/sizes/{size}/deduct")
    @Transactional
    public ResponseEntity<String> deductStock(
            @PathVariable Long productId,
            @PathVariable String size,
            @RequestParam int quantity) {

        if (quantity < 1) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Quantity must be at least 1");
        }

        int updatedRows = stockRepository.deductStock(
                productId, size, quantity);

        if (updatedRows == 0) {
            throw new ResponseStatusException(
                    HttpStatus.CONFLICT,
                    "Size is unavailable or there is insufficient stock");
        }

        return ResponseEntity.ok("Stock deducted successfully");
    }
}
