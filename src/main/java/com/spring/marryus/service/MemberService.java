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
    private MemberRepository memberRepository; // 멤버 리포지토리 주입

    // 회원 저장 메서드
    public Member saveMember(Member member) {
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
            if (member.getPassword().equals(password)) {
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
}
