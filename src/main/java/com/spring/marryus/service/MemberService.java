package com.spring.marryus.service;

import java.util.Optional;

import javax.transaction.Transactional;

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
	
	// �α��� �޼ҵ�
	public Member authenticate(String email,String password) {
		
		Optional<Member> memberOptional = memberRepository.findByEmail(email);

	    if (memberOptional.isPresent()) {
	    	
	        Member member = memberOptional.get();
	        
	        if (member.getPassword().equals(password)) {
	        	
	            return member; // �α��� ����
	            
	        } else {
	            throw new IllegalArgumentException("��й�ȣ�� ��ġ���� �ʽ��ϴ�.");
	        }
	    } else {
	        throw new IllegalArgumentException("�ش� �̸��Ϸ� ��ϵ� ����ڰ� �����ϴ�.");
	    }
	    
	}
	
	
	//ȸ��Ż�� �޼ҵ�
	@Transactional
	public void deleteUser(String email) throws IllegalAccessException {
		System.out.println(email);
		
		Member member = memberRepository.findByEmail(email).orElseThrow(() -> new IllegalAccessException("�������� �ʴ� ȸ���Դϴ�."));
		
		memberRepository.delete(member);
		
	}
	
}
