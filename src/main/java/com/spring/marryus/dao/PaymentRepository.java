package com.spring.marryus.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


import com.spring.marryus.entity.Payments;

@Repository
public interface PaymentRepository extends JpaRepository<Payments, Long> {

	long countByImpUidContainsIgnoreCase(String impUid);

}
