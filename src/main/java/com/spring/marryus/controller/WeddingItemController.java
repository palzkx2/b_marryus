package com.spring.marryus.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.spring.marryus.entity.WeddingItemDTO;
import com.spring.marryus.service.WeddingItemService;

@RestController
@RequestMapping("/api")
public class WeddingItemController {
    
    @Autowired
    private WeddingItemService weddingItemService;
    
    @GetMapping("/weddingItem")
    public List<WeddingItemDTO> getWeddingItems(@RequestParam(required = false) String category) {
        if (category != null) {
            return weddingItemService.getItemsByCategory(category);
        } else {
            return weddingItemService.getAllItems();
        }
    }
    
    @GetMapping("/weddingItem/{id}")
    public ResponseEntity<WeddingItemDTO> getWeddingItemById(@PathVariable Long id) {
        WeddingItemDTO item = weddingItemService.findById(id);
        if (item != null) {
            return ResponseEntity.ok(item);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    
    @GetMapping("/weddingItem/{id}/details")
    public ResponseEntity<List<WeddingItemDTO>> getItemCategoryDetails(@PathVariable Long id) {
        String category = weddingItemService.getCategoryById(id);
        List<WeddingItemDTO> details = weddingItemService.getCategoryDetails(category);
        return ResponseEntity.ok(details);
    }
}
