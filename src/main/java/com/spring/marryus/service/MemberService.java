package com.spring.marryus.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.spring.marryus.dao.MemberRepository;
import com.spring.marryus.entity.Member;

@Service
public class MemberService {
	
	@Autowired
	private MemberRepository memberRepository;
	
	public Member saveMember(Member member) {
		return memberRepository.save(member);
	}
	
	public boolean checkEmailExists(String email) {
		return memberRepository.findByEmail(email).isPresent();
	}
	
	public Member authenticate(String email,String password) {
		
		Optional<Member> memberOptional = memberRepository.findByEmail(email);

	    if (memberOptional.isPresent()) {
	    	
	        Member member = memberOptional.get();
	        
	        if (member.getPassword().equals(password)) {
	        	
	            return member; // 로그인 성공
	            
	        } else {
	            throw new IllegalArgumentException("비밀번호가 일치하지 않습니다.");
	        }
	    } else {
	        throw new IllegalArgumentException("해당 이메일로 등록된 사용자가 없습니다.");
	    }
	    
	}
	
}
