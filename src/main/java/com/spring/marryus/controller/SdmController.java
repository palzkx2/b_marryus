package com.spring.marryus.controller;

import java.util.ArrayList;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.jaxb.SpringDataJaxb.PageRequestDto;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.spring.marryus.entity.Sdm;
import com.spring.marryus.entity.SdmDTO;

import com.spring.marryus.entity.SdmPageRequestDTO;
import com.spring.marryus.entity.SdmPageResponseDTO;
import com.spring.marryus.service.SdmService;
import com.spring.marryus.service.WeddingHallService;
import com.spring.marryus.status.SdmItemSellStatus;
import com.spring.marryus.status.SortDirection;
import com.spring.marryus.util.CustomFileUtil;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;

@CrossOrigin(origins = "http://localhost:3000") // CORS 설정
@RestController // RESTful 웹 서비스의 컨트롤러임을 나타냄
@RequiredArgsConstructor // final 필드에 대해 생성자 주입
@Log4j2 // Log4j2를 통한 로깅 기능 활성화
@RequestMapping("/api/sdm") // 기본 URL 경로 설정
public class SdmController {

    private final SdmService sdmService; // SdmService 의존성 주입
    private final CustomFileUtil fileUtil; // 파일 유틸리티 의존성 주입

    // 특정 아이템 상세 정보 가져오기
    @GetMapping("/item/{itemNm}") // GET 요청 처리
    public ResponseEntity<SdmDTO> getItemByName(@PathVariable String itemNm) { // 아이템 이름을 PathVariable로 받아옴
       
        log.info("Fetching item with name: " + itemNm); // 로깅
        SdmDTO item = sdmService.getByName(itemNm); // 서비스에서 아이템 이름으로 조회
        return item != null ? new ResponseEntity<>(item, HttpStatus.OK) // 아이템이 존재하면 200 OK 응답
                            : new ResponseEntity<>(HttpStatus.NOT_FOUND); // 존재하지 않으면 404 NOT FOUND 응답
    }
    
    // 아이템 등록
    @PostMapping(value = "/sdmRegister", consumes = MediaType.MULTIPART_FORM_DATA_VALUE) // POST 요청 처리
    public ResponseEntity<Map<String, String>> register(
            @RequestPart("sdmData") String sdmData, // JSON 형태의 아이템 데이터
            @RequestPart("files") List<MultipartFile> files) { // 업로드할 파일 목록

        try {
            // JSON 데이터를 객체로 변환
            ObjectMapper objectMapper = new ObjectMapper(); // ObjectMapper 인스턴스 생성
            SdmDTO sdmDTO = objectMapper.readValue(sdmData, SdmDTO.class); // JSON을 SdmDTO로 변환

            // 파일 저장
            List<String> uploadFileNames = fileUtil.saveFiles(files); // 파일을 저장하고 파일 이름 목록 반환
            sdmDTO.setUploadFileNames(uploadFileNames); // SdmDTO에 업로드된 파일 이름 설정

            // 서비스에서 sdmDTO 등록
            Long id = sdmService.register(sdmDTO); // 아이템 등록 후 ID 반환

            Map<String, String> result = new HashMap<>(); // 결과를 저장할 Map 생성
            result.put("result", "success"); // 성공 결과 설정
            result.put("id", id.toString()); // 등록된 아이템 ID 설정

            return new ResponseEntity<>(result, HttpStatus.OK); // 200 OK와 함께 결과 반환

        } catch (Exception e) { // 예외 처리
            log.error("파일 업로드 중 오류 발생: ", e); // 오류 로그
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null); // 500 오류 반환
        }
    }

    // 파일 보기
    @GetMapping("/view/{fileName}") // GET 요청 처리
    public ResponseEntity<Resource> viewFileGET(@PathVariable String fileName) { // 파일 이름을 PathVariable로 받아옴
        return fileUtil.getFile(fileName); // 파일 반환
    }
    
    // 아이템 목록 조회
    @GetMapping("/list") // GET 요청 처리
    public SdmPageResponseDTO<SdmDTO> list(
            SdmPageRequestDTO pageRequestDTO, // 페이지 요청 DTO
            @RequestParam(value = "page", defaultValue = "1") int page, // 페이지 번호
            @RequestParam(value = "size", defaultValue = "10") int size, // 페이지당 아이템 수
            @RequestParam(value = "category", required = false, defaultValue = "") String category, // 카테고리 필터
            @RequestParam(value = "sortType", required = false, defaultValue = "price") String sortType, // 정렬 기준
            @RequestParam(value = "direction", required = false, defaultValue = "DESC") String direction // 정렬 방향
    ) {
        log.info("list with category: " + category + ", sortType: " + sortType + ", direction: " + direction); // 로깅
        
        // 정렬 방향 변환 (ASC 또는 DESC)
        SortDirection sortDirection = "ASC".equalsIgnoreCase(direction) ? SortDirection.ASC : SortDirection.DESC; // 정렬 방향 결정
        
        // category 파라미터가 있는 경우 해당 카테고리의 데이터를 조회
        if (category != null && !category.isEmpty()) {
            return sdmService.getListByCategoryAndSorting(category, sortType, sortDirection, pageRequestDTO); // 카테고리별 조회
        }
        
        // category 파라미터가 없으면 전체 데이터를 조회
        return sdmService.getListWithSorting(sortType, sortDirection, pageRequestDTO); // 전체 조회
    }
    
    // 수정 데이터 가져오기
    @GetMapping("/modify/{id}") // GET 요청 처리
    public ResponseEntity<SdmDTO> read(@PathVariable(name = "id") Long id) { // ID를 PathVariable로 받아옴
        SdmDTO sdmDTO = sdmService.get(id); // 서비스에서 아이템 조회
        return new ResponseEntity<>(sdmDTO, HttpStatus.OK); // 200 OK와 함께 아이템 반환
    }

    // 상품 수정
    @PutMapping("/modify/{id}") // PUT 요청 처리
    public ResponseEntity<Map<String, String>> modify(
            @PathVariable(name = "id") Long id, // ID를 PathVariable로 받아옴
            @RequestPart("sdm") SdmDTO sdmDTO, // 수정할 SdmDTO
            @RequestPart(value = "files", required = false) List<MultipartFile> files) { // 수정할 파일 목록

        sdmDTO.setId(id); // ID 설정

        // 기존 파일 처리
        SdmDTO oldProductDTO = sdmService.get(id); // 기존 상품 정보 조회
        List<String> oldFileNames = oldProductDTO.getUploadFileNames(); // 기존 파일 이름 목록

        // 새 파일 업로드
        List<String> currentUploadFileNames = fileUtil.saveFiles(files); // 새 파일 저장
        List<String> uploadedFileNames = sdmDTO.getUploadFileNames(); // 현재 업로드된 파일 이름 목록

        if (currentUploadFileNames != null && currentUploadFileNames.size() > 0) {
            uploadedFileNames.addAll(currentUploadFileNames); // 새 파일 이름 목록에 추가
        }

        // 상품 수정
        sdmService.modify(sdmDTO); // 상품 수정

        // 삭제할 파일 처리
        if (oldFileNames != null && !oldFileNames.isEmpty()) {
            List<String> removeFiles = oldFileNames.stream() // 기존 파일 목록에서 삭제할 파일 목록 결정
                    .filter(fileName -> !uploadedFileNames.contains(fileName)) // 현재 업로드된 파일 목록에 없는 파일
                    .collect(Collectors.toList()); // 리스트로 변환

            fileUtil.deleteFiles(removeFiles); // 삭제할 파일 삭제
        }

        Map<String, String> result = new HashMap<>(); // 결과를 저장할 Map 생성
        result.put("RESULT", "SUCCESS"); // 성공 결과 설정
        return new ResponseEntity<>(result, HttpStatus.OK); // 200 OK와 함께 결과 반환
    }

    // 상품 삭제
    @DeleteMapping("/delete/{id}") // DELETE 요청 처리
    public ResponseEntity<Map<String, String>> remove(@PathVariable("id") Long id) { // ID를 PathVariable로 받아옴
        List<String> oldFileNames = sdmService.get(id).getUploadFileNames(); // 기존 파일 이름 목록 조회
        sdmService.remove(id); // 아이템 삭제
        fileUtil.deleteFiles(oldFileNames); // 파일 삭제

        Map<String, String> result = new HashMap<>(); // 결과를 저장할 Map 생성
        result.put("RESULT", "SUCCESS"); // 성공 결과 설정
        return new ResponseEntity<>(result, HttpStatus.OK); // 200 OK와 함께 결과 반환
    }

    // 가격으로 정렬
    @GetMapping("/sort/price") // GET 요청 처리
    public SdmPageResponseDTO<SdmDTO> sortByPrice(
            @RequestParam SortDirection direction, // 정렬 방향을 RequestParam으로 받음
            SdmPageRequestDTO pageRequestDTO) { // 페이지 요청 DTO
        return sdmService.getSortedByPrice(direction, pageRequestDTO); // 가격으로 정렬된 목록 반환
    }

    // 평점으로 정렬
    @GetMapping("/sort/rating") // GET 요청 처리
    public SdmPageResponseDTO<SdmDTO> sortByRating(
            @RequestParam SortDirection direction, // 정렬 방향을 RequestParam으로 받음
            SdmPageRequestDTO pageRequestDTO) { // 페이지 요청 DTO
        return sdmService.getSortedByRating(direction, pageRequestDTO); // 평점으로 정렬된 목록 반환
    }

    // 아이템 이름으로 검색
    @GetMapping("/search/itemNm") // GET 요청 처리
    public SdmPageResponseDTO<SdmDTO> searchByItemNm(@RequestParam String itemNm, SdmPageRequestDTO pageRequestDTO) { // 아이템 이름을 RequestParam으로 받음
     
        itemNm = itemNm.trim().replaceAll("[\\s]", ""); // 공백 제거
        log.info("Received itemNm: " + itemNm); // 로깅
        
        log.info("Actual itemNm length: " + itemNm.length()); // 문자열 길이 확인
        log.info("Original itemNm: [" + itemNm + "]"); // 공백 또는 특수문자 확인
        log.info("Received itemNm: {}", itemNm); // 로깅
        
        log.info("Original itemNm: [{}]", itemNm); // 로깅
        return sdmService.searchByItemNm(itemNm, pageRequestDTO); // 아이템 이름으로 검색 결과 반환
    }

    // 태그로 검색
    @GetMapping("/search/tag") // GET 요청 처리
    public SdmPageResponseDTO<SdmDTO> searchByTag(@RequestParam String tag, SdmPageRequestDTO pageRequestDTO) { // 태그를 RequestParam으로 받음
        return sdmService.searchByTag(tag, pageRequestDTO); // 태그로 검색 결과 반환
    }
}

