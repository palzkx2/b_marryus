package com.spring.marryus.help;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class HelpService {
	
	@Autowired
	private HelpMapper helpMapper;
	
	//문의 저장
	public HelpDTO saveMessage(HelpDTO message) {
		
		HelpDTO help = new HelpDTO();
        help.setNum(message.getNum());
        help.setName(message.getName());
        help.setEmail(message.getEmail());
        help.setPwd(message.getPwd());
        help.setSubject(message.getSubject());
        help.setContent(message.getContent());
        
        LocalDate currentDate = LocalDate.now();
        help.setCreated(currentDate.format(DateTimeFormatter.ofPattern("yy-MM-dd")));
        
        help.setHitCount(0);
        
		return helpMapper.save(help);
	}
	
	//조회수증가
	public void incrementHit(Long id) {
        HelpDTO help = getMessageById(id);
        help.setHitCount(help.getHitCount() + 1); // 조회수 증가
        helpMapper.save(help); // 업데이트
	}
	
	//모든 문의 저장
	public List<HelpDTO> getAllMessage() {
		return helpMapper.findAll();
	}
	
	public HelpDTO getMessageById(Long id) {
		return helpMapper.findById(id)
				.orElseThrow(()-> new RuntimeException("문의 없음"));
	}
	
	//순번 증가
	public void updateOrder() {
	    List<HelpDTO> allMessages = helpMapper.findAll();
	    for (int i = 0; i < allMessages.size(); i++) {
	        HelpDTO help = allMessages.get(i);
	        help.setNum(i + 1); // 순번 업데이트
	        helpMapper.save(help); // DB에 저장
	    }
	}
	
	//문의 삭제
	public void deleteMessage(Long id) {
		helpMapper.deleteById(id);
	}
	
	// 최신순으로 모든 문의 조회
    public List<HelpDTO> getAllMessageSortedByDate() {
        return helpMapper.findAllOrderByCreatedDesc();
    }

    // 조회수순으로 모든 문의 조회
    public List<HelpDTO> getAllMessageSortedByHit() {
        return helpMapper.findAllOrderByHitDesc();
    }

}
