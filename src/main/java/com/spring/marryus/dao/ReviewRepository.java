package com.spring.marryus.dao;

<<<<<<< HEAD
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.spring.marryus.entity.ReviewDTO;

@Repository
public interface ReviewRepository extends JpaRepository<ReviewDTO, Long> {

	// 카테고리와 상품 ID로 필터링
    List<ReviewDTO> findByCategoryAndProductId(String category, Long productId);
	
    //별점
    List<ReviewDTO> findByProductId(Long productId);
    
    //이메일로 리뷰 찾기
    List<ReviewDTO> findByEmail(String email);
    
=======
import org.springframework.data.jpa.repository.JpaRepository;

import com.spring.marryus.entity.Review;

public interface ReviewRepository extends JpaRepository<Review, Long>{

>>>>>>> branch 'master' of https://github.com/palzkx2/b_marryus.git
}
