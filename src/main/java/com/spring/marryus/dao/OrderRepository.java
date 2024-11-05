package com.spring.marryus.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.spring.marryus.entity.Orders;
@Repository
public interface OrderRepository extends JpaRepository<Orders, Long>{

}
