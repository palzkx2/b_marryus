package com.spring.marryus.service;

import java.util.Collections;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.spring.marryus.dao.WeddingItemRepository;
import com.spring.marryus.entity.WeddingItemDTO;

@Service
public class WeddingItemService {
    
    @Autowired
    private WeddingItemRepository weddingItemRepository;

    public List<WeddingItemDTO> getAllItems() {
        return weddingItemRepository.findAll();
    }

    public List<WeddingItemDTO> getItemsByCategory(String category) {
        return weddingItemRepository.findByCategory(category);
    }
    
    public WeddingItemDTO findById(Long id) {
        return weddingItemRepository.findById(id).orElse(null);
    }
    
    public String getCategoryById(Long id) {
        WeddingItemDTO item = findById(id);
        return item != null ? item.getCategory() : null;
    }

    public List<WeddingItemDTO> getCategoryDetails(String category) {
        // 카테고리별 상세 데이터 가져오는 로직
        return Collections.emptyList();
    }
}
