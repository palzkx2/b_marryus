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
	
	private final String upload = "C:\\marryus\\weddingHall"; // �̹��� ���� ���� ���
	
	public WeddingHall insert(String imageName,MultipartFile imageFile,String name,String addr,Integer price, String buffet,String tag) throws Exception {
		
		// ������ ���丮 ��� Ȯ�� �� ����
        File uploadPath = new File(upload);
        
        if (!uploadPath.exists()) {
            uploadPath.mkdirs(); // ���丮 ������ ����
        }

        // ���� ����
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
