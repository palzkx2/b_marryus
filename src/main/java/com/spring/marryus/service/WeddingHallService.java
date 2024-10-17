package com.spring.marryus.service;

import java.io.File;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Calendar;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
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
        
        String fileExt = imageFile.getOriginalFilename().substring(imageFile.getOriginalFilename().lastIndexOf("."));
		
		if(fileExt==null || fileExt.equals("")) { //확장자가 없으면
			return null;
		}

        // 파일 저장
        String uniqueFileName = System.currentTimeMillis() + "_" + String.format("%1$tY%1$tm%1$td%1$tH%1$tM%1$tS", Calendar.getInstance());
        
        uniqueFileName += System.nanoTime();
        uniqueFileName += fileExt;
        
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

	public Page<WeddingHall> getImages(Pageable pageable) {
		
		return weddingHallRepository.findAllByOrderByIdDesc(pageable);
	}
	
	public WeddingHall getWeddingHallByName(String name) {
		return weddingHallRepository.findByName(name);
	}

}
