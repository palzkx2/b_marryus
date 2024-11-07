package com.spring.marryus.service;

import java.time.LocalDateTime;
// 필요한 클래스들을 임포트합니다.
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.spring.marryus.dao.SdmRepository;
import com.spring.marryus.entity.Sdm;
import com.spring.marryus.entity.SdmDTO;
import com.spring.marryus.entity.SdmImg;
import com.spring.marryus.entity.SdmPageRequestDTO;
import com.spring.marryus.entity.SdmPageResponseDTO;
import com.spring.marryus.entity.Sukso;
import com.spring.marryus.status.SortDirection;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;

//이 클래스가 서비스 계층임을 나타냅니다.
@Service
//로깅을 위한 어노테이션입니다.
@Log4j2
//필요한 의존성을 자동으로 주입받기 위한 어노테이션입니다.
@RequiredArgsConstructor
//모든 public 메소드에 트랜잭션을 적용합니다.
@Transactional
public class SdmServiceImpl implements SdmService {

 // SdmRepository를 주입받습니다.
 private final SdmRepository sdmRepository;

//Sdm의 totalLikes를 업데이트하는 메소드입니다.
@Override
public void updateTotalLikes(Long id, int totalLikes) {
  // Sdm 엔티티를 ID로 조회
  Sdm sdm = sdmRepository.findById(id)
          .orElseThrow(() -> new IllegalArgumentException("SDM not found with ID: " + id));

  // totalLikes 값 업데이트
  sdm.setTotalLikes(totalLikes);
  
  // 변경된 엔티티 저장
  sdmRepository.save(sdm);
}
 
 
 
 // 페이지네이션된 Sdm 목록을 가져오는 메소드입니다.
 @Override
 public SdmPageResponseDTO<SdmDTO> getList(SdmPageRequestDTO pageRequestDTO) {
     log.info("getList..............");
     
     // 페이지네이션과 정렬 설정
     int page = (pageRequestDTO.getPage() <= 0) ? 0 : pageRequestDTO.getPage() - 1;
     Pageable pageable = PageRequest.of(page, pageRequestDTO.getSize(), Sort.by("id").descending());
     
     // Sdm 목록을 가져옵니다.
     Page<Object[]> result = sdmRepository.selectList(pageable);
     
     // 결과를 DTO로 매핑합니다.
     List<SdmDTO> dtoList = result.get().map(arr -> {
         Sdm sdm = (Sdm) arr[0]; // 배열에서 첫 번째 요소를 Sdm으로 캐스팅
         SdmDTO sdmDTO = SdmDTO.builder()
                 .id(sdm.getId())
                 .itemNm(sdm.getItemNm())
                 .addr(sdm.getAddr())
                 .totalLikes(sdm.getTotalLikes())
                 .itemDetail(sdm.getItemDetail())
                 .stockNumber(sdm.getStockNumber())
                 .price(sdm.getPrice())
                 .rating(sdm.getRating())
                 .tag(sdm.getTag())
                 .category(sdm.getCategory())
                 .itemsellstatus(sdm.getItemsellstatus())
                 .build();
         
         // 이미지 목록 추가
         sdmDTO.setImageList(sdm.getImageList());
         return sdmDTO;
     }).collect(Collectors.toList());

     long totalCount = result.getTotalElements();

     // 응답 DTO를 생성하여 반환합니다.
     return SdmPageResponseDTO.<SdmDTO>withAll()
         .dtoList(dtoList)
         .totalCount(totalCount)
         .pageRequestDTO(pageRequestDTO)
         .build();
 }

 // 새로운 Sdm을 등록하는 메소드입니다.
 @Override
 public Long register(SdmDTO sdmDTO) {
     Sdm sdm = dtoToEntity(sdmDTO); // DTO를 엔티티로 변환
     sdm.setRegTime(LocalDateTime.now()); // 등록 시간 설정
     sdm.setUpdateTime(LocalDateTime.now()); // 업데이트 시간 설정
     Sdm result = sdmRepository.save(sdm); // 엔티티 저장
     return result.getId(); // 저장된 엔티티의 ID 반환
 }

 // DTO를 엔티티로 변환하는 메소드입니다.
 private Sdm dtoToEntity(SdmDTO sdmDTO) {
     Sdm sdm = Sdm.builder()
             .id(sdmDTO.getId())
             .itemNm(sdmDTO.getItemNm())
             .addr(sdmDTO.getAddr())
             .totalLikes(sdmDTO.getTotalLikes())
             .itemDetail(sdmDTO.getItemDetail())
             .stockNumber(sdmDTO.getStockNumber())
             .price(sdmDTO.getPrice())
             .rating(sdmDTO.getRating())
             .tag(sdmDTO.getTag())
             .category(sdmDTO.getCategory())
             .itemsellstatus(sdmDTO.getItemsellstatus())
             .delFlag(sdmDTO.isDelFlag())
             .build();
     
     List<String> uploadFileNames = sdmDTO.getUploadFileNames(); // 업로드 파일 이름 가져오기
     if (uploadFileNames != null) {
    	 uploadFileNames.forEach(fileName -> {
             if (!sdm.getImageList().stream().anyMatch(img -> img.getImgName().equals(fileName))) {
                 sdm.addImageString(fileName,false); // 이미지 추가
             }
         });
     }
     return sdm; // 변환된 엔티티 반환
 }

 // ID로 Sdm을 조회하는 메소드입니다.
 @Override
 public SdmDTO get(Long id) {
     Sdm sdm = sdmRepository.findById(id)
             .orElseThrow(() -> new IllegalArgumentException("SDM not found with ID: " + id)); // ID로 Sdm 찾기
     return entityToDTO(sdm); // Sdm을 DTO로 변환하여 반환
 }

 // 엔티티를 DTO로 변환하는 메소드입니다.
 private SdmDTO entityToDTO(Sdm sdm) {
	 log.debug("Converting entity to DTO for Sdm ID: {} 왜안나와2", sdm.getId());
     SdmDTO sdmDTO = SdmDTO.builder()
             .id(sdm.getId())
             .itemNm(sdm.getItemNm())
             .addr(sdm.getAddr())
             .totalLikes(sdm.getTotalLikes())
             .itemDetail(sdm.getItemDetail())
             .stockNumber(sdm.getStockNumber())
             .price(sdm.getPrice())
             .rating(sdm.getRating())
             .tag(sdm.getTag())
             .category(sdm.getCategory())
             .itemsellstatus(sdm.getItemsellstatus())
             .delFlag(sdm.isDelFlag())
             .build();
     
     // 이미지 목록을 DTO에 추가
     List<SdmImg> imageList = sdm.getImageList();
     if (imageList != null && !imageList.isEmpty()) {
         List<String> fileNameList = imageList.stream()
                 .map(SdmImg::getImgName) // 이미지 이름 가져오기
                 .collect(Collectors.toList());
         sdmDTO.setUploadFileNames(fileNameList); // DTO에 설정
     }
     return sdmDTO; // 변환된 DTO 반환
     
   
 }

 // Sdm을 수정하는 메소드입니다.
 @Override
 public void modify(SdmDTO sdmDTO) {
     Optional<Sdm> result = sdmRepository.findById(sdmDTO.getId());
     Sdm sdm = result.orElseThrow(() -> new IllegalArgumentException("SDM not found with ID: " + sdmDTO.getId()));
     
     // 필드 업데이트
     sdm.changeItemNm(sdmDTO.getItemNm());
     sdm.changeItemDetail(sdmDTO.getItemDetail());
     sdm.changePrice(sdmDTO.getPrice());

     // 기존 이미지를 지우고 새 이미지를 추가합니다.
     sdm.clearList();
     List<String> uploadFileNames = sdmDTO.getUploadFileNames();
     if (uploadFileNames != null && !uploadFileNames.isEmpty()) {
         uploadFileNames.forEach(fileName->sdm.addImageString(fileName, false)); // 새 이미지 추가
     }
     sdmRepository.save(sdm); // 수정된 엔티티 저장
 }

 // Sdm을 삭제하는 메소드입니다.
 @Override
 public void remove(Long id) {
     // 물리적 삭제 대신 상태를 변경합니다.
     sdmRepository.updateToDelete(id, true); // 삭제 플래그 업데이트
 }

 // 가격순으로 정렬된 Sdm 목록을 가져오는 메소드입니다.
 @Override
 public SdmPageResponseDTO<SdmDTO> getSortedByPrice(SortDirection direction, SdmPageRequestDTO pageRequestDTO) {
     Pageable pageable = PageRequest.of(pageRequestDTO.getPage() - 1, pageRequestDTO.getSize(),
             direction == SortDirection.ASC ? Sort.by("price").ascending() : Sort.by("price").descending());

     Page<Sdm> result = sdmRepository.findAll(pageable);
     List<SdmDTO> dtoList = result.getContent().stream()
             .map(this::entityToDTO) // 엔티티를 DTO로 변환
             .collect(Collectors.toList());

     long totalCount = result.getTotalElements();
     return SdmPageResponseDTO.<SdmDTO>withAll()
             .dtoList(dtoList)
             .totalCount(totalCount)
             .pageRequestDTO(pageRequestDTO)
             .build();
 }

 // 평점순으로 정렬된 Sdm 목록을 가져오는 메소드입니다.
 @Override
 public SdmPageResponseDTO<SdmDTO> getSortedByRating(SortDirection direction, SdmPageRequestDTO pageRequestDTO) {
     log.info("getSortedByRating..............");
     
     Pageable pageable = PageRequest.of(pageRequestDTO.getPage() - 1, pageRequestDTO.getSize(),
             direction == SortDirection.ASC ? Sort.by("rating").ascending() : Sort.by("rating").descending());

     Page<Sdm> result = sdmRepository.findAll(pageable);
     List<SdmDTO> dtoList = result.getContent().stream()
             .map(this::entityToDTO) // 엔티티를 DTO로 변환
             .collect(Collectors.toList());

     long totalCount = result.getTotalElements();
     return SdmPageResponseDTO.<SdmDTO>withAll()
             .dtoList(dtoList)
             .totalCount(totalCount)
             .pageRequestDTO(pageRequestDTO)
             .build();
 }

 // 상품명으로 Sdm을 검색하는 메소드입니다. //대소문자 구별안하고 사용하게하는 코드
 @Override
 public SdmPageResponseDTO<SdmDTO> searchByItemNm(String itemNm, SdmPageRequestDTO pageRequestDTO) {
	
//	 log.info("검색어: {}", itemNm);
//     log.info("페이지 요청: {}", pageRequestDTO);
//     Pageable pageable = PageRequest.of(pageRequestDTO.getPage()-1, pageRequestDTO.getSize());
//     
//     itemNm = itemNm.trim().replaceAll("[\\s]", "");
//
//     log.info("Processed itemNm: " + itemNm);
//     
	 // 1 기반 페이지 번호를 0 기반으로 조정
	    Pageable pageable = PageRequest.of(pageRequestDTO.getPage() - 1, pageRequestDTO.getSize(), Sort.by("id").descending());
	    
	    itemNm = itemNm.trim().replaceAll("[\\s]", "");
	    log.info("Processed itemNm: {}", itemNm);
     
     
//     Page<Sdm> result = sdmRepository.findByItemNmContainingIgnoreCase(itemNm, pageable); // 상품명으로 검색
//     // 결과 로그 출력 (결과가 빈 배열이어도 출력됨)
//    
//     log.info("Search result: " + result.getContent()); // 결과 목록 출력
//     log.info("가게이름 나오나시험: " + itemNm);
//     
//     log.info("Search result count: {}", result.getTotalElements());
//     
//     if(result.hasContent()) {
//         log.info("First result itemNm: {}", result.getContent().get(0).getItemNm());
//     } else {
//         log.warn("No results found for itemNm: {}", itemNm);
//     }
//     
//     return convertToResponseDTO(result); // 결과 DTO 변환하여 반환
	    
	    
	    Page<Sdm> result = sdmRepository.searchByItemNm(itemNm, pageable);
	    log.info("Search result count: {}", result.getTotalElements());
	    
	    if(result.hasContent()) {
	        log.info("First result itemNm: {}", result.getContent().get(0).getItemNm());
	    } else {
	        log.warn("No results found for itemNm: {}", itemNm);
	    }
	    
	    return convertToResponseDTO(result);
	    
 }
 

 // 태그로 Sdm을 검색하는 메소드입니다.
 @Override
 public SdmPageResponseDTO<SdmDTO> searchByTag(String tag, SdmPageRequestDTO pageRequestDTO) {
     Pageable pageable = PageRequest.of(pageRequestDTO.getPage(), pageRequestDTO.getSize());
     Page<Sdm> result = sdmRepository.findByTag(tag, pageable); // 태그로 검색
     return convertToResponseDTO(result); // 결과 DTO 변환하여 반환
 }

 // Page<Sdm>을 SdmPageResponseDTO<SdmDTO>로 변환하는 메소드입니다.
 @Override
 public SdmPageResponseDTO<SdmDTO> convertToResponseDTO(Page<Sdm> result) {
     List<SdmDTO> dtoList = result.getContent().stream()
             .map(this::entityToDTO) // 엔티티를 DTO로 변환
             .collect(Collectors.toList());

     return SdmPageResponseDTO.<SdmDTO>withAll()
             .dtoList(dtoList)
             .totalCount(result.getTotalElements()) // 총 요소 수 설정
             .pageRequestDTO(new SdmPageRequestDTO(result.getNumber() + 1, result.getSize())) // 페이지 요청 DTO 설정
             .build();
 }

 // 카테고리로 Sdm을 조회하는 메소드입니다.
 @Override
 public SdmPageResponseDTO<SdmDTO> getListByCategory(String category, SdmPageRequestDTO pageRequestDTO) {
     // 카테고리가 null이거나 빈 문자열일 경우 전체 데이터를 조회
     Page<Sdm> result;
     if (category == null || category.isEmpty()) {
         result = sdmRepository.findAll(pageRequestDTO.getPageable()); // 전체 데이터 조회
     } else {
         result = sdmRepository.findByCategory(category, pageRequestDTO.getPageable()); // 카테고리로 조회
     }

     // Page<Sdm> 데이터를 SdmPageResponseDTO<SdmDTO>로 변환
     List<SdmDTO> dtoList = result.getContent().stream()
             .map(this::entityToDTO) // 엔티티를 DTO로 변환
             .collect(Collectors.toList());

     return SdmPageResponseDTO.<SdmDTO>withAll()
             .dtoList(dtoList)
             .totalCount(result.getTotalElements()) // 총 요소 수 설정
             .pageRequestDTO(pageRequestDTO) // 페이지 요청 DTO 설정
             .build();
 }

 // 상품명을 이용해 Sdm을 조회하는 메소드입니다.

	 @Override
	 public SdmDTO getByName(String itemNm) {
	     Sdm sdm = sdmRepository.findSingleByItemNm(itemNm)
	             .orElseThrow(() -> new IllegalArgumentException("Item not found with name: " + itemNm)); // 없으면 예외 발생
	    
	     return entityToDTO(sdm); // Sdm을 DTO로 변환하여 반환
	 }

	@Override
	public SdmPageResponseDTO<SdmDTO> getListByCategoryAndSorting(String category, String sortType,
			SortDirection direction, SdmPageRequestDTO pageRequestDTO) {
		 Pageable pageable = PageRequest.of(pageRequestDTO.getPage() - 1, pageRequestDTO.getSize(),
		            direction == SortDirection.ASC ? Sort.by(sortType).ascending() : Sort.by(sortType).descending());

		    // 카테고리와 정렬을 함께 적용
		    Page<Sdm> result = sdmRepository.findByCategory(category, pageable);

		    List<SdmDTO> dtoList = result.getContent().stream()
		            .map(this::entityToDTO) // 엔티티를 DTO로 변환
		            .collect(Collectors.toList());

		    long totalCount = result.getTotalElements();
		    return SdmPageResponseDTO.<SdmDTO>withAll()
		            .dtoList(dtoList)
		            .totalCount(totalCount)
		            .pageRequestDTO(pageRequestDTO)
		            .build();
	}

	@Override
	public SdmPageResponseDTO<SdmDTO> getListWithSorting(String sortType, SortDirection direction,
			SdmPageRequestDTO pageRequestDTO) {
		  Pageable pageable = PageRequest.of(pageRequestDTO.getPage() - 1, pageRequestDTO.getSize(),
		            direction == SortDirection.ASC ? Sort.by(sortType).ascending() : Sort.by(sortType).descending());

		    Page<Sdm> result = sdmRepository.findAll(pageable);
		    List<SdmDTO> dtoList = result.getContent().stream()
		            .map(this::entityToDTO)
		            .collect(Collectors.toList());

		    long totalCount = result.getTotalElements();
		    return SdmPageResponseDTO.<SdmDTO>withAll()
		            .dtoList(dtoList)
		            .totalCount(totalCount)
		            .pageRequestDTO(pageRequestDTO)
		            .build();
	}
// 지울까 말까
	@Override
	public List<Sdm> findByNameAndUserrId() {
		// TODO Auto-generated method stub
		return null;
	}
	// 모든 숙소 조회
    public List<Sdm> getAllSDMList() {
        return sdmRepository.findAll();
    }
 }
