package com.spring.marryus.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.spring.marryus.entity.HelpDTO;



@Repository
public interface HelpMapper extends JpaRepository<HelpDTO, Long>{
	
	// 최신순 정렬
    @Query("SELECT h FROM HelpDTO h ORDER BY h.created DESC")
    List<HelpDTO> findAllOrderByCreatedDesc();

    // 조회수순 정렬
    @Query("SELECT h FROM HelpDTO h ORDER BY h.hitCount DESC")
    List<HelpDTO> findAllOrderByHitDesc();

}
