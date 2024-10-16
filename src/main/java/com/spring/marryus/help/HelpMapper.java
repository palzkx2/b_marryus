package com.spring.marryus.help;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface HelpMapper extends JpaRepository<HelpDTO, Long>{
	
	// 최신순 정렬
    @Query("SELECT h FROM HelpDTO h ORDER BY h.created DESC")
    List<HelpDTO> findAllOrderByCreatedDesc();

    // 조회수순 정렬
    @Query("SELECT h FROM HelpDTO h ORDER BY h.hitCount DESC")
    List<HelpDTO> findAllOrderByHitDesc();

}
