package com.hm.product.repository;

import com.hm.product.model.ProductSizeStock;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ProductSizeStockRepository
        extends JpaRepository<ProductSizeStock, Long> {

    List<ProductSizeStock> findByProductIdOrderByIdAsc(Long productId);

    List<ProductSizeStock> findByProductIdInOrderByIdAsc(
            List<Long> productIds);

    @Modifying
    @Query("""
        UPDATE ProductSizeStock s
        SET s.stock = s.stock - :quantity
        WHERE s.productId = :productId
          AND s.size = :size
          AND s.stock >= :quantity
        """)
    int deductStock(
            @Param("productId") Long productId,
            @Param("size") String size,
            @Param("quantity") int quantity);
}