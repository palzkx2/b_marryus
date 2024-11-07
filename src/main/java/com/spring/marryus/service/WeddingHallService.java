package com.spring.marryus.service;

import java.io.File;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.util.Calendar;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import javax.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import com.spring.marryus.dao.WeddingHallRepository;
import com.spring.marryus.entity.WeddingHall;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class WeddingHallService {
    
    private final WeddingHallRepository weddingHallRepository;
    
    private final String upload = "C:\\marryus\\weddingHall"; // 이미지 업로드 경로
    
    // 웨딩홀 정보 삽입 메서드
    public WeddingHall insert(String imageName, MultipartFile imageFile, String name, String addr, Integer price, String buffet, String tag,String wido,String gyungdo,String imgType,LocalDateTime created) throws Exception {
        
        // 이미지 업로드 경로 확인 및 생성
        File uploadPath = new File(upload);
        if (!uploadPath.exists()) {
            uploadPath.mkdirs(); // 경로가 없으면 생성
        }
        
        // 파일 확장자 추출
        String fileExt = imageFile.getOriginalFilename().substring(imageFile.getOriginalFilename().lastIndexOf("."));
        
        if (fileExt == null || fileExt.equals("")) { // 확장자가 없는 경우
            return null;
        }

        // 고유 파일 이름 생성
        String uniqueFileName = System.currentTimeMillis() + "_" + String.format("%1$tY%1$tm%1$td%1$tH%1$tM%1$tS", Calendar.getInstance());
        uniqueFileName += System.nanoTime();
        uniqueFileName += fileExt;

        // 파일 경로 설정
        Path filePath = Paths.get(upload + File.separator + uniqueFileName);
        
        // 파일 저장
        Files.write(filePath, imageFile.getBytes());
        
        // 웨딩홀 객체 생성 및 데이터 설정
        WeddingHall wdh = new WeddingHall();
        wdh.setImageName(imageName);
        wdh.setName(name);
        wdh.setAddr(addr);
        wdh.setPrice(price);
        wdh.setBuffet(buffet);
        wdh.setTag(tag);
        wdh.setImgPath(filePath.toString());
        wdh.setWido(wido);
        wdh.setGyungdo(gyungdo);
        wdh.setImgType(imgType);
        wdh.setCreated(created);
        
        weddingHallRepository.save(wdh); // 웨딩홀 정보 저장
        
        return wdh; // 저장된 웨딩홀 정보 반환
    }

    // 이미지 목록 가져오기
    public List<WeddingHall> getImages() {
    	
    	return weddingHallRepository.findAll();
        
    }

    
    // 이름으로 웨딩홀 찾기
    public WeddingHall getWeddingHallByName(String name) {
        return weddingHallRepository.findByName(name); // 이름으로 웨딩홀 조회
    }
    
    // 이름으로 웨딩홀 검색
    public List<WeddingHall> searchWeddingHall(String name) {
        return weddingHallRepository.findByNameContainingIgnoreCase(name); // 이름 포함하여 검색
    }
    
    // 웨딩홀 삭제 메서드
    public boolean deleteWeddingHall(String imgPath) {
        
        Optional<WeddingHall> optionalWeddingHall = weddingHallRepository.findByImgPath(imgPath);
        
        if (optionalWeddingHall.isPresent()) {
            WeddingHall weddingHall = optionalWeddingHall.get();
            File file = new File(weddingHall.getImgPath());
            
            if (file.exists()) {
                if (!file.delete()) {
                    System.out.println("파일 삭제 실패: " + weddingHall.getImgPath());
                    return false; // 파일 삭제 실패
                }
            }
            
            weddingHallRepository.delete(weddingHall); // 웨딩홀 정보 삭제
            return true;
        } else {
            System.out.println("해당 이미지 경로의 웨딩홀이 존재하지 않습니다: " + imgPath);
            return false; // 웨딩홀 미존재
        }
    }
    
    // ID로 웨딩홀 찾기
    public WeddingHall findById(Long id) {
        return weddingHallRepository.findById(id)
            .orElseThrow(() -> new EntityNotFoundException("해당 ID의 웨딩홀이 존재하지 않습니다: " + id)); // ID로 웨딩홀 조회, 없으면 예외 발생
    }
}
