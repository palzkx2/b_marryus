package com.spring.marryus.oauth;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

public interface BaseAuthUserRepository extends JpaRepository<BaseAuthUser, Long> {
	
	Optional<BaseAuthUser> findByEmail(String email);//email�� �˻��ϴ� �޼ҵ�
}
