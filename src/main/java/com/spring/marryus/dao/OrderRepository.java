package com.spring.marryus.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.spring.marryus.entity.Orders;

public interface OrderRepository extends JpaRepository<Orders, Long>{

}
