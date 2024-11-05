package com.spring.marryus.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.spring.marryus.entity.PaymentHistory;
@Repository
public interface PaymentHistoryRepository extends JpaRepository<PaymentHistory, Long>{

}
