
package com.hm.order.client;

import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

@Service
public class ProductServiceClient {

    private final RestClient productServiceRestClient;

    public ProductServiceClient(RestClient productServiceRestClient) {
        this.productServiceRestClient = productServiceRestClient;
    }

    public ProductResponse getProductById(Long productId) {
        return productServiceRestClient.get()
                .uri("/products/{id}", productId)
                .retrieve()
                .body(ProductResponse.class);
    }
}