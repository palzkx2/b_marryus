package com.spring.marryus.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.spring.marryus.entity.Member;

public interface MemberRepository extends JpaRepository<Member, String>{

}
