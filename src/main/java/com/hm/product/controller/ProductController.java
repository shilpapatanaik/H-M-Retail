package com.hm.product.controller;

import com.hm.product.model.Product;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/products")
public class ProductController {

    private static final List<Product> products = new ArrayList<>(
        List.of(

            new Product(
                101L,
                "Cotton T-Shirt",
                "T-Shirts",
                "H&M",
                799.0,
                "M",
                "Black",
                50,
                "Regular fit cotton T-shirt"
            ),

            new Product(
                102L,
                "Summer Dress",
                "Dresses",
                "H&M",
                1499.0,
                "S",
                "Blue",
                25,
                "Lightweight summer dress"
            ),

            new Product(
                103L,
                "Gold Necklace",
                "Jewelry",
                "H&M",
                999.0,
                "One Size",
                "Gold",
                15,
                "Fashion necklace"
            )
        )
    );

    @GetMapping
    public List<Product> getProducts() {
        return products;
    }

    @GetMapping("/{id}")
    public ResponseEntity<Product> getProductById(@PathVariable Long id) {

        for (Product product : products) {

            if (product.getId().equals(id)) {
                return ResponseEntity.ok(product);
            }
        }

        return ResponseEntity.notFound().build();
    }

    @PostMapping
    public Product addProduct(@RequestBody Product product) {

        products.add(product);

        return product;
    }

    @PutMapping("/{id}")
    public ResponseEntity<Product> updateProduct(
            @PathVariable Long id,
            @RequestBody Product updatedProduct) {

        for (Product product : products) {

            if (product.getId().equals(id)) {

                product.setName(updatedProduct.getName());
                product.setCategory(updatedProduct.getCategory());
                product.setBrand(updatedProduct.getBrand());
                product.setPrice(updatedProduct.getPrice());
                product.setSize(updatedProduct.getSize());
                product.setColor(updatedProduct.getColor());
                product.setStock(updatedProduct.getStock());
                product.setDescription(updatedProduct.getDescription());

                return ResponseEntity.ok(product);
            }
        }

        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProduct(@PathVariable Long id) {

        boolean removed = products.removeIf(
                product -> product.getId().equals(id)
        );

        if (removed) {
            return ResponseEntity.noContent().build();
        }

        return ResponseEntity.notFound().build();
    }
}