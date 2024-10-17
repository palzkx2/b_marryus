package com.spring.marryus.oauth;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

public interface BaseAuthUserRepository extends JpaRepository<BaseAuthUser, Long> {
	
	// 이메일로 사용자 검색
	Optional<BaseAuthUser> findByEmail(String email);
	
}
