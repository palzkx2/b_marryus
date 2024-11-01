package com.spring.marryus.entity;

import java.util.ArrayList;
import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.spring.marryus.status.SdmItemSellStatus;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class SdmDTO {

    private Long id;
    
    private String itemNm;

    private String addr;

    private int totalLikes;

    private String itemDetail;

    private int stockNumber;

    private Integer price;

    private Integer rating;

    private String tag;

    private String category;

    private SdmItemSellStatus itemsellstatus;
    
    private boolean delFlag;
    
    private List<SdmImg> imageList = new ArrayList<>();

    private List<MultipartFile> files = new ArrayList<>();

    private List<String> uploadFileNames = new ArrayList<>();

    @Builder
    public SdmDTO(Long id, String itemNm, String addr, int totalLikes, String itemDetail,
                  int stockNumber, Integer price, Integer rating, String tag, String category,
                  SdmItemSellStatus itemsellstatus, boolean delFlag, List<SdmImg> imageList, 
                  List<MultipartFile> files, List<String> uploadFileNames) {
        this.id = id;
        this.itemNm = itemNm;
        this.addr = addr;
        this.totalLikes = totalLikes;
        this.itemDetail = itemDetail;
        this.stockNumber = stockNumber;
        this.price = price;
        this.rating = rating;
        this.tag = tag;
        this.category = category;
        this.itemsellstatus = itemsellstatus;
        this.delFlag = delFlag;
        this.imageList = imageList != null ? imageList : new ArrayList<>();
        this.files = files != null ? files : new ArrayList<>();
        this.uploadFileNames = uploadFileNames != null ? uploadFileNames : new ArrayList<>();
    }
    
    // Sdm 객체를 인자로 받는 생성자
    public SdmDTO(Sdm sdm) {
        this.id = sdm.getId();
        this.itemNm = sdm.getItemNm();
        this.addr = sdm.getAddr();
        this.totalLikes = sdm.getTotalLikes();
        this.itemDetail = sdm.getItemDetail();
        this.stockNumber = sdm.getStockNumber();
        this.price = sdm.getPrice();
        this.rating = sdm.getRating();
        this.tag = sdm.getTag();
        this.category = sdm.getCategory();
        this.itemsellstatus = sdm.getItemsellstatus();
        this.delFlag = sdm.isDelFlag();
        this.imageList = sdm.getImageList() != null ? sdm.getImageList() : new ArrayList<>();
        this.uploadFileNames = sdm.getUploadFileNames() != null ? (ArrayList<String>) sdm.getUploadFileNames() : new ArrayList<>();
    }
}
	

