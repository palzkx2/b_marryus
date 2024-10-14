package com.spring.marryus.service;

import java.io.File;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.spring.marryus.dao.WeddingHallRepository;
import com.spring.marryus.entity.WeddingHall;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class WeddingHallService {
	
	private final WeddingHallRepository weddingHallRepository;
	
	private final String upload = "C:\\marryus\\weddingHall"; // 이미지 파일 저장 경로
	
	public WeddingHall insert(String imageName,MultipartFile imageFile,String name,String addr,Integer price, String buffet,String tag) throws Exception {
		
		// 저장할 디렉토리 경로 확인 및 생성
        File uploadPath = new File(upload);
        
        if (!uploadPath.exists()) {
            uploadPath.mkdirs(); // 디렉토리 없으면 생성
        }

        // 파일 저장
        String uniqueFileName = System.currentTimeMillis() + "_" + imageFile.getOriginalFilename();
        
        Path filePath = Paths.get(upload + File.separator + uniqueFileName);
        
        Files.write(filePath, imageFile.getBytes());
		
		WeddingHall wdh = new WeddingHall();
		
		wdh.setImageName(imageName);
		wdh.setName(name);
		wdh.setAddr(addr);
		wdh.setPrice(price);
		wdh.setBuffet(buffet);
		wdh.setTag(tag);
		wdh.setImgPath(filePath.toString());
		
		weddingHallRepository.save(wdh);
		
		return wdh;
		
	}

}
