package com.spring.marryus.service;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.transaction.annotation.Transactional;

import com.spring.marryus.entity.Sdm;
import com.spring.marryus.entity.SdmDTO;
import com.spring.marryus.entity.SdmPageRequestDTO;
import com.spring.marryus.entity.SdmPageResponseDTO;
import com.spring.marryus.status.SortDirection;

@Transactional
public interface SdmService {

	SdmDTO getByName(String itemNm);
	
	SdmPageResponseDTO<SdmDTO> getList(SdmPageRequestDTO pageRequestDTO);
	
	SdmPageResponseDTO<SdmDTO> getListByCategory(String category, SdmPageRequestDTO pageRequestDTO);
	
	Long register(SdmDTO sdmDTO);

	 SdmDTO get(Long id);

	  void modify(SdmDTO sdmDTO);

	  void remove(Long id);

	 SdmPageResponseDTO<SdmDTO> getSortedByPrice(SortDirection direction, SdmPageRequestDTO pageRequestDTO);

	 SdmPageResponseDTO<SdmDTO> getSortedByRating(SortDirection direction, SdmPageRequestDTO pageRequestDTO);
	
	 SdmPageResponseDTO<SdmDTO> searchByItemNm(String itemNm, SdmPageRequestDTO pageRequestDTO);
	 
	 SdmPageResponseDTO<SdmDTO> searchByTag(String tag, SdmPageRequestDTO pageRequestDTO);
	 
	 SdmPageResponseDTO<SdmDTO> convertToResponseDTO(Page<Sdm> result);
	 SdmPageResponseDTO<SdmDTO> getListByCategoryAndSorting(String category, String sortType, SortDirection direction, SdmPageRequestDTO pageRequestDTO);
	 SdmPageResponseDTO<SdmDTO> getListWithSorting(String sortType, SortDirection direction, SdmPageRequestDTO pageRequestDTO);

	List<Sdm> findByNameAndUserrId();
}
