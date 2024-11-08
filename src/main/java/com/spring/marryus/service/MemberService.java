package com.spring.marryus.service;

import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.spring.marryus.dao.MemberRepository;
import com.spring.marryus.entity.Member;
import com.spring.marryus.provider.EmailProvider;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class MemberService {

    private final MemberRepository memberRepository; // 멤버 리포지토리 주입
    
    private final EmailProvider emailProvider;
    
    private final SmsService smsService;
    
    private final PasswordEncoder passwordEncoder;
    
    // 인증코드 생성 후 이메일 전송 메소드
    public String sendcertificationEmail(String email) {
    	
    	// 인증 코드 생성 (6자리 랜덤 숫자 예시)
        String certificationNumber = String.format("%06d", (int)(Math.random() * 1000000));

        // 이메일 전송
        boolean isEmailSent = emailProvider.sendCertificationMail(email, certificationNumber);
        
        if (!isEmailSent) {
            throw new RuntimeException("이메일 전송 실패");
        }

        // 인증 코드를 반환하여 React에서 처리할 수 있도록
        return certificationNumber;
    	
    }

    // 회원 저장 메서드
    public Member saveMember(Member member) {
    	String encodedPassword = passwordEncoder.encode(member.getPassword());
    	member.setPassword(encodedPassword);
        return memberRepository.save(member); // 회원 정보를 데이터베이스에 저장
    }

    // 이메일 존재 여부 확인 메서드
    public boolean checkEmailExists(String email) {
        return memberRepository.findByEmail(email).isPresent(); // 이메일이 존재하는지 확인
    }

    // 로그인 인증 메서드
    public Member authenticate(String email, String password) {
    	
        Optional<Member> memberOptional = memberRepository.findByEmail(email); // 이메일로 회원 조회

        if (memberOptional.isPresent()) {
            Member member = memberOptional.get(); // 회원 정보 가져오기
            
            // 비밀번호가 일치하는지 확인
            if (passwordEncoder.matches(password, member.getPassword())) {
                return member; // 로그인 성공
            } else {
                throw new IllegalArgumentException("비밀번호가 일치하지 않습니다."); // 비밀번호 불일치
            }
        } else {
            throw new IllegalArgumentException("입력하신 이메일이 존재하지 않습니다."); // 이메일 미존재
        }
    }

    // 회원 삭제 메서드
    @Transactional // 데이터베이스 트랜잭션 처리
    public void deleteUser(String email) throws IllegalAccessException {
        System.out.println(email); // 삭제할 이메일 출력
        
        // 이메일로 회원 조회, 없으면 예외 발생
        Member member = memberRepository.findByEmail(email)
            .orElseThrow(() -> new IllegalAccessException("해당 이메일이 존재하지 않습니다."));

        memberRepository.delete(member); // 회원 삭제
    }
    
    @Transactional
    public void updateUser(String email, String addr, String emailAgree, String hopeArea, String phone, String weddingDate,String pwd,String name) {
    	
        Member user = memberRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("해당 유저가 없습니다. eamil=" + email));
        
        user.setPassword(pwd);
        user.setAddr(addr);
        user.setEmailAgree(emailAgree);
        user.setHopeArea(hopeArea);
        user.setPhone(phone);
        user.setWeddingDate(weddingDate);
        user.setName(name);
        
    }
    
    public Member readUser(String email) {
    	
    	Member user = new Member();
    	user = memberRepository.findByEmail(email).orElseThrow(() -> new IllegalArgumentException("조회 실패"));;
    	
    	return user;
    	
    }
    
    public boolean findPasswordByEmailAndPhone(String email, String phone) {
    	
        Optional<Member> memberOpt = memberRepository.findByEmailAndPhone(email, phone);
        
        return memberOpt.isPresent();
        
    }
    
    public String findEmailByNameAndPhone(String name, String phone) {
    	
    	Optional<Member> memberOpt = memberRepository.findByNameAndPhone(name, phone);
    	
        if (memberOpt.isPresent()) {
            String email = memberOpt.get().getEmail();
            return maskEmail(email); // 마스킹된 이메일 반환
        }
        
        return null; // 일치하는 회원이 없을 경우
        
    }
    
	private String maskEmail(String email) {
    	
    	int atIndex = email.indexOf('@');
    	
        if (atIndex > 1) {
            String maskedPart = email.substring(0, atIndex - 4) + "****" + email.substring(atIndex);
            return maskedPart;
        }
        
        return email;
        
    }
	
	public boolean resetPassword(String email, String phone, String newPassword) {
		
        Optional<Member> memberOpt = memberRepository.findByEmailAndPhone(email, phone);

        if (memberOpt.isPresent()) {
        	
            Member member = memberOpt.get();
            String encodedPassword = passwordEncoder.encode(newPassword);
            member.setPassword(encodedPassword);
            memberRepository.save(member);
            
            return true;
            
        } else {
        	
            return false;
            
        }
        
    }
	
}
