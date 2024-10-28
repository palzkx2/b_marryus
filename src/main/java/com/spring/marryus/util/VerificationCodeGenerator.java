package com.spring.marryus.util;

import java.util.Random;

public class VerificationCodeGenerator {
	
	public static String generateVerificationCode() {
		
        Random random = new Random();
        int code = 100000 + random.nextInt(900000); // 6자리 랜덤 숫자
        return String.valueOf(code);
        
    }

}
