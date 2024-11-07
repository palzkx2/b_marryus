package com.spring.marryus.dao;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.spring.marryus.entity.Sdm;
import com.spring.marryus.entity.WeddingHall;
import com.spring.marryus.status.SdmItemSellStatus;
@Repository
public interface SdmRepository extends JpaRepository<Sdm, Long>{
	
	Page<Sdm> findAll(Pageable pageable);
	
	Optional<Sdm> findSingleByItemNm(String itemNm);
	
	@Query("SELECT s FROM Sdm s WHERE LOWER(s.itemNm) LIKE LOWER(CONCAT('%', :itemNm, '%')) AND s.delFlag = false")
	Page<Sdm> searchByItemNm(@Param("itemNm") String itemNm, Pageable pageable);
	
	
	
	
	Page<Sdm> findByTag(String tag, Pageable pageable);
	
	Page<Sdm> findByCategory(String category,Pageable pageable);
	
	 // Sorting by price
    Page<Sdm> findByOrderByPriceAsc(Pageable pageable);
    Page<Sdm> findByOrderByPriceDesc(Pageable pageable);
    
    // Sorting by rating
    Page<Sdm> findByOrderByRatingAsc(Pageable pageable);
    Page<Sdm> findByOrderByRatingDesc(Pageable pageable);
	
	
	@EntityGraph(attributePaths="imageList")
	@Query("select p from Sdm p where p.id=:id")
	Optional<Sdm> selectOne(@Param("id") Long id);
	
	@Modifying
    @Query("update Sdm p set p.delFlag = :flag where p.id = :id")
    void updateToDelete(@Param("id") Long id, @Param("flag") boolean flag);

	
	@Query("select p,pi from Sdm p left join p.imageList pi")
	Page<Object[]> selectList(Pageable pageable);
	
	  // 물리적 삭제 대신 del_flag 업데이트
    @Modifying
    @Transactional
    @Query("UPDATE Sdm s SET s.delFlag = :delFlag WHERE s.id = :id")
    void updateToDelete(@Param("id") Long id, @Param("delFlag") Boolean delFlag);
	
    @Modifying
    @Transactional
    @Query("UPDATE Sdm s SET s.totalLikes = :totalLikes WHERE s.id = :id")
    void updateTotalLikes(@Param("id") Long id, @Param("totalLikes") int totalLikes); // totalLikes 업데이트 메소드
}
    
