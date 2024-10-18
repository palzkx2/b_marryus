package com.spring.marryus.service;

import javax.transaction.Transactional;

import org.apache.catalina.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.spring.marryus.entity.Member;
import com.spring.marryus.oauth.BaseAuthUser;
import com.spring.marryus.oauth.BaseAuthUserRepository;

@Service
public class Oauth2Service {
	
	   @Autowired
	    private BaseAuthUserRepository baseAuthUserRepository;

	    @Transactional
	    public void updateUser(String email, String addr, String emailAgree, String hopeArea, String phone, String weddingDate) {
	    	
	    	
	        // 1. 엔티티 조회
	        BaseAuthUser user = baseAuthUserRepository.findByEmail(email)
	                .orElseThrow(() -> new IllegalArgumentException("해당 유저가 없습니다. eamil=" + email));
	        
	        // 2. 엔티티 값 수정
	        user.setAddr(addr);
	        user.setEmailAgree(emailAgree);
	        user.setHopeArea(hopeArea);
	        user.setPhone(phone);
	        user.setWeddingDate(weddingDate);

	        // 3. 변경 감지
	        // @Transactional 안에서 자동으로 변경된 부분을 감지하여 업데이트가 수행됨
	    }
	    
	    
	    // 회원 삭제 메서드
	    @Transactional // 데이터베이스 트랜잭션 처리
	    public void deleteUser(String email) throws IllegalAccessException {
	        System.out.println(email); // 삭제할 이메일 출력
	        
	        // 이메일로 회원 조회, 없으면 예외 발생
	        BaseAuthUser member = baseAuthUserRepository.findByEmail(email)
	            .orElseThrow(() -> new IllegalAccessException("해당 이메일이 존재하지 않습니다."));

	        baseAuthUserRepository.delete(member); // 회원 삭제
	    }
	    
	    
	    
	    public BaseAuthUser readUser(String email) {
	    	BaseAuthUser user = new BaseAuthUser();
	    	user = baseAuthUserRepository.findByEmail(email).orElseThrow(() -> new IllegalArgumentException("조회 실패"));;
	    	
	    	return user;
	    }
	    

}
