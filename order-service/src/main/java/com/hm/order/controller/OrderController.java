
package com.hm.order.controller;

import com.hm.order.client.ProductResponse;
import com.hm.order.client.ProductServiceClient;
import com.hm.order.model.Order;
import com.hm.order.repository.OrderRepository;

import jakarta.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping("/orders")
@CrossOrigin(origins = "http://localhost:5173")
public class OrderController {

    private final OrderRepository orderRepository;
    private final ProductServiceClient productServiceClient;

    public OrderController(
            OrderRepository orderRepository,
            ProductServiceClient productServiceClient) {
        this.orderRepository = orderRepository;
        this.productServiceClient = productServiceClient;
    }

    @GetMapping
    public List<Order> getOrders() {
        return orderRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Order> getOrderById(@PathVariable Long id) {
        return orderRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Order createOrder(@Valid @RequestBody Order order) {

        ProductResponse product = fetchProduct(order.getProductId());

        order.setPrice(product.getPrice());
        order.setTotalAmount(
                product.getPrice() * order.getQuantity()
        );

        if (order.getStatus() == null || order.getStatus().isBlank()) {
            order.setStatus("CREATED");
        }

        return orderRepository.save(order);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Order> updateOrder(
            @PathVariable Long id,
            @Valid @RequestBody Order updatedOrder) {

        Order order = orderRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Order not found: " + id
                ));

        ProductResponse product = fetchProduct(updatedOrder.getProductId());

        order.setCustomerName(updatedOrder.getCustomerName());
        order.setProductId(updatedOrder.getProductId());
        order.setQuantity(updatedOrder.getQuantity());
        order.setPrice(product.getPrice());
        order.setTotalAmount(
                product.getPrice() * updatedOrder.getQuantity()
        );
        order.setStatus(updatedOrder.getStatus());
        order.setOrderDate(updatedOrder.getOrderDate());

        return ResponseEntity.ok(orderRepository.save(order));
    }

    private ProductResponse fetchProduct(Long productId) {

        ProductResponse product;

        try {
            product = productServiceClient.getProductById(productId);
        } catch (org.springframework.web.client.HttpClientErrorException.NotFound ex) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND,
                    "Product not found: " + productId
            );
        } catch (org.springframework.web.client.RestClientException ex) {
            throw new ResponseStatusException(
                    HttpStatus.SERVICE_UNAVAILABLE,
                    "Product Service is unavailable"
            );
        }

        if (product == null || product.getPrice() == null) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_GATEWAY,
                    "Product Service returned invalid product details"
            );
        }

        return product;
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteOrder(@PathVariable Long id) {

        if (!orderRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }

        orderRepository.deleteById(id);

        return ResponseEntity.noContent().build();
    }
}