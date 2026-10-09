
package com.hm.order.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.RestClient;

@Configuration
public class ProductServiceConfig {

    @Bean
    public RestClient productServiceRestClient(
            @Value("${product.service.url}") String productServiceUrl) {

        return RestClient.builder()
                .baseUrl(productServiceUrl)
                .build();
    }
}