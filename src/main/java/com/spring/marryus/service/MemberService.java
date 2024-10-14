package com.spring.marryus.service;

import org.springframework.beans.factory.annotation.Autowired;

import com.spring.marryus.dao.MemberRepository;
import com.spring.marryus.entity.Member;

public class MemberService {
	
	@Autowired
	private MemberRepository memberRepository;
	
	public Member saveMember(Member member) {
		return memberRepository.save(member);
	}
	
}
