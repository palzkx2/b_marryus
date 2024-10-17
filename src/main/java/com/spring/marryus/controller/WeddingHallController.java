package com.spring.marryus.controller;

import java.io.File;
import java.util.List;

import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.spring.marryus.entity.WeddingHall;
import com.spring.marryus.service.WeddingHallService;
import lombok.RequiredArgsConstructor;

@CrossOrigin(origins = "http://localhost:3000") // React ���ø����̼��� URL�� ����
@RequiredArgsConstructor
@RestController
public class WeddingHallController {
	
	private String imagePath = "C:/marryus/weddingHall";
	
	private final WeddingHallService weddingHallService;
	
	@PostMapping("/api/insertWeddingHall")
	public String insertWeddingHall(@RequestParam("imageName") String imageName,
            @RequestPart("imageFile") MultipartFile imageFile,
            @RequestParam("name") String name,
            @RequestParam("addr") String addr,
            @RequestParam("price") Integer price,
            @RequestParam("buffet") String buffet,
            @RequestParam("tag") String tag) throws Exception {

		// ���� �޼��带 ȣ���Ͽ� ����Ȧ ������ �߰�
		weddingHallService.insert(imageName, imageFile, name, addr, price, buffet, tag);
		return "����Ȧ �Է��� �Ϸ�Ǿ����ϴ�.";
	}
	
	//����¡ó���� ����Ȧ ����Ʈ ��ȯ
	@GetMapping("/api/images")
	public ResponseEntity<Page<WeddingHall>> getImages(@RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "9") int size){
		Pageable pageable = PageRequest.of(page, size);
		Page<WeddingHall> imagePage = weddingHallService.getImages(pageable);
		return ResponseEntity.ok(imagePage);
	}
	
	//�̹��� ���� ���� ��Ʈ�ѷ�
	@GetMapping("/api/images/{filename:.+}")
	public ResponseEntity<Resource> getImage(@PathVariable String filename){
		
		File file = new File(imagePath, filename); // ��û�� ���� ���
		
        if (file.exists()) {
            Resource resource = new FileSystemResource(file);
            MediaType mediaType = MediaType.IMAGE_JPEG; // �̹����� MIME Ÿ�� ���� (��: JPEG)

            // ���� Ȯ���ڿ� ���� MIME Ÿ���� ����
            if (filename.endsWith(".png")) {
                mediaType = MediaType.IMAGE_PNG;
            } else if (filename.endsWith(".gif")) {
                mediaType = MediaType.IMAGE_GIF;
            } else if (filename.endsWith(".jpg") || filename.endsWith(".jpeg")) {
                mediaType = MediaType.IMAGE_JPEG;
            }

            return ResponseEntity.ok()
                    .contentType(mediaType)
                    .body(resource);
        } else {
            return ResponseEntity.notFound().build(); // ������ ������ 404 ��ȯ
        }
		
	}
	
	//name���� �ϳ��� ������ ã��
	@GetMapping("/api/weddingHall/{name}")
	public ResponseEntity<WeddingHall> getWeddingHallByName(@PathVariable String name) {
		WeddingHall weddingHall = weddingHallService.getWeddingHallByName(name);
		return weddingHall != null ? ResponseEntity.ok(weddingHall) : ResponseEntity.notFound().build();
	}
	
	//name���� �˻� ���
	@GetMapping("/api/searchWeddingHall")
	public ResponseEntity<Page<WeddingHall>> searchWeddingHall(@RequestParam String name,Pageable pageable){
		
		Page<WeddingHall> results = weddingHallService.searchWeddingHall(name, pageable);
		
		if(results.isEmpty()) {
			return ResponseEntity.noContent().build();
		}
		
		return ResponseEntity.ok(results);
		
	}
	
	@DeleteMapping("/api/deleteWeddingHall")
	public ResponseEntity<String> deleteWeddingHall(@RequestParam String imgPath){
		
		boolean isDeleted = weddingHallService.deleteWeddingHall(imgPath);
		System.out.println("imgPath����� �Ѿ����------------------" + imgPath);
		
		if(isDeleted) {
			return ResponseEntity.ok("����Ȧ�� ���������� �����Ǿ����ϴ�.");
		}else {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("�ش� �̹��� ��ο� ���� ����Ȧ�� ã�� �� �����ϴ�.");
		}
		
	}

}
