package com.spring.marryus.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.spring.marryus.entity.RecommedDTO;
import com.spring.marryus.service.RecommendService;

@RestController
@RequestMapping("/api/recommend")
public class RecommendController {

    @Autowired
    private RecommendService recommendService;

    // 추천 저장
    @PostMapping
    public ResponseEntity<RecommedDTO> createRecommendation(@RequestBody RecommedDTO recommendation) {
    	RecommedDTO savedRecommendation = recommendService.saveRecommendation(recommendation);
        return ResponseEntity.ok(savedRecommendation);
    }

    // 추천 여부 확인
    @GetMapping
    public ResponseEntity<Boolean> checkRecommendation(@RequestParam Long userId, @RequestParam Long reviewId) {
        boolean hasRecommended = recommendService.hasRecommended(userId, reviewId);
        return ResponseEntity.ok(hasRecommended);
    }
}
