package com.spring.marryus.service;

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
	
}
