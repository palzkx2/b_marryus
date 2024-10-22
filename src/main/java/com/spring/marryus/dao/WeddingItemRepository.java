package com.spring.marryus.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.spring.marryus.entity.WeddingItemDTO;

@Repository
public interface WeddingItemRepository extends JpaRepository<WeddingItemDTO, Long> {
    List<WeddingItemDTO> findByCategory(String category);
}
