package com.spring.marryus.service;

import org.springframework.web.multipart.MultipartFile;

import com.spring.marryus.entity.SdmImg;

public interface SdmImgService {
	 void saveImg(SdmImg sdmImg, MultipartFile itemImgFile);
	

}
