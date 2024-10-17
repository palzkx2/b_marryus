package com.spring.marryus.oauth;

import java.util.Iterator;
import java.util.List;
import javax.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import lombok.RequiredArgsConstructor;

@Controller
@RequiredArgsConstructor
public class OauthSuccessController {

    private final HttpSession httpSession; // HTTP 세션 객체
     
    @Autowired
    private final BaseAuthUserRepository baseAuthUserRepository; // 사용자 정보를 저장하는 리포지토리
    
    @GetMapping("/OauthSuccess") // OAuth 성공 시 호출되는 메서드
    public String oauthSuccess() {
        
        int flag = 1; // 기본 플래그 값 설정
        
        SessionUser user = (SessionUser) httpSession.getAttribute("oauthUser"); // 세션에서 OAuth 사용자 정보 가져오기
        
        List<BaseAuthUser> lists = baseAuthUserRepository.findAll(); // 모든 사용자 정보를 가져옴
        
        Iterator<BaseAuthUser> iterator = lists.iterator(); // 사용자 목록의 반복자 생성

        while (iterator.hasNext()) {
            BaseAuthUser user1 = iterator.next(); // 다음 사용자 정보
            
            // 사용자의 주소가 null인 경우 플래그 값을 0으로 설정
            if (user1.getAddr() == null) {
                flag = 0; // 주소가 없으면 플래그를 0으로 변경
            }
        }
        
        // 디버깅을 위한 출력
        System.out.println("주소가 존재하는지 확인 중-------");
        System.out.println(flag + "주소가 존재합니까?");

        // 플래그 값에 따라 반환할 페이지 결정
        if (flag == 1) {
            return "OauthSucces"; // 주소가 존재하면 성공 페이지로 이동
        } else {
            return "OauthSingUp"; // 주소가 없으면 가입 페이지로 이동
        }
    }
}
