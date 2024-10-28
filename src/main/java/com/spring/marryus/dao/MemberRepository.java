package com.spring.marryus.dao;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.spring.marryus.entity.Member;

public interface MemberRepository extends JpaRepository<Member, Long>{
	Optional<Member> findByEmail(String email);
	Optional<Member> findByNameAndPhone(String name, String phone);
}
