package com.spring.marryus.sdmtest;

import java.util.Arrays;
import java.util.UUID;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.spring.marryus.dao.SdmRepository;
import com.spring.marryus.entity.SdmDTO;
import com.spring.marryus.service.SdmService;
import com.spring.marryus.status.SdmItemSellStatus;

import lombok.extern.log4j.Log4j2;

@SpringBootTest
@Log4j2
public class SdmTest {

	   @Autowired
	    SdmRepository sdmRepository;

	    @Autowired // SdmService를 주입
	    SdmService sdmService;

		
	@Test
	  public void testRegister() {

	   SdmDTO sdmDTO = SdmDTO.builder()
	  
	   .itemNm("다니메이크업")
     .addr("서울 강남구 도산대로49길 36 3층, 4층, 5층 ")
     .totalLikes(50)
     .itemDetail(
  		   "지니메이크업은 가장 아름다운 날을 그립니다.\r\n" 
  		   )
     .stockNumber(200)
     .price(3000)
     .rating(5)
     .tag("인물위주")
     .category("메이크업")
     .itemsellstatus(SdmItemSellStatus.SELL)
     .build();

	    //uuid가 있어야 함
	   sdmDTO.setUploadFileNames(
		        Arrays.asList(
		            UUID.randomUUID() + "_" + "Test1.jpg",
		            UUID.randomUUID() + "_" + "Test2.jpg"
		        )
		    );

		    sdmService.register(sdmDTO);
	}   
}

	
	

