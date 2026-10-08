package com.hm.product.controller;

import com.hm.product.model.Product;
import com.hm.product.repository.ProductRepository;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import jakarta.validation.Valid;

import java.util.List;

@RestController
@RequestMapping("/products")
@CrossOrigin(origins = "http://localhost:5173")
public class ProductController {

    private final ProductRepository productRepository;

    public ProductController(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    // Get all products
    // Optional filtering:
    // /products?section=WOMEN
    // /products?section=WOMEN&category=Dresses
    @GetMapping
    public List<Product> getProducts(
            @RequestParam(required = false) String section,
            @RequestParam(required = false) String category) {

        if (section != null && category != null) {
            return productRepository
                    .findBySectionIgnoreCaseAndCategoryIgnoreCase(section, category);
        }

        if (section != null) {
            return productRepository.findBySectionIgnoreCase(section);
        }

        return productRepository.findAll();
    }

    // Get product by ID
    @GetMapping("/{id}")
    public ResponseEntity<Product> getProductById(@PathVariable Long id) {

        return productRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Add product
    @PostMapping
    public Product addProduct(@Valid @RequestBody Product product) {

        return productRepository.save(product);
    }

    // Update product
    @PutMapping("/{id}")
    public ResponseEntity<Product> updateProduct(
            @PathVariable Long id,
            @Valid @RequestBody Product updatedProduct) {

        return productRepository.findById(id)
                .map(product -> {

                    product.setName(updatedProduct.getName());
                    product.setCategory(updatedProduct.getCategory());
                    product.setBrand(updatedProduct.getBrand());
                    product.setPrice(updatedProduct.getPrice());
                    product.setSize(updatedProduct.getSize());
                    product.setColor(updatedProduct.getColor());
                    product.setDescription(updatedProduct.getDescription());
                    product.setSection(updatedProduct.getSection());

                    return ResponseEntity.ok(
                            productRepository.save(product)
                    );
                })
                .orElse(ResponseEntity.notFound().build());
    }

    // Delete product
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProduct(@PathVariable Long id) {

        if (!productRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }

        productRepository.deleteById(id);

        return ResponseEntity.noContent().build();
    }
}