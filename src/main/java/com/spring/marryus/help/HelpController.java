package com.spring.marryus.help;

import java.util.Arrays;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.nimbusds.oauth2.sdk.Response;

@RestController
@RequestMapping("/api/help")
public class HelpController {

	@Autowired
	private HelpService helpService;
	
	//새로운 문의
	@PostMapping
	public ResponseEntity<HelpDTO> createMessage(@RequestBody HelpDTO message) {
		return ResponseEntity.ok(helpService.saveMessage(message));
	}
	
	//모든 문의 조회
	@GetMapping
	public ResponseEntity<List<HelpDTO>> getMessage() {
		return ResponseEntity.ok(helpService.getAllMessage());
	}
	
	// 특정 문의 조회수 증가
    @PostMapping("/increment-hit/{id}")
    public ResponseEntity<Void> incrementHit(@PathVariable Long id) {
        helpService.incrementHit(id);
        return ResponseEntity.ok().build();
    }
    
    @GetMapping("/sort/date")
    public ResponseEntity<List<HelpDTO>> getMessageSortedByDate() {
        return ResponseEntity.ok(helpService.getAllMessageSortedByDate());
    }

    @GetMapping("/sort/hitCount")
    public ResponseEntity<List<HelpDTO>> getMessageSortedByHit() {
        return ResponseEntity.ok(helpService.getAllMessageSortedByHit());
    }
    
    //상세페이지
    @GetMapping("/{id}")
    public ResponseEntity<HelpDTO> getMessageById(@PathVariable Long id) {
        HelpDTO message = helpService.getMessageById(id);
        return ResponseEntity.ok(message);
    }
    
 // 문의 수정
    @PutMapping("/{id}")
    public ResponseEntity<HelpDTO> updateMessage(@PathVariable Long id, @RequestBody HelpDTO updatedMessage) {
        HelpDTO message = helpService.updateMessage(id, updatedMessage);
        return ResponseEntity.ok(message);
    }

    // 문의 삭제
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMessage(@PathVariable Long id) {
        helpService.deleteMessage(id);
        return ResponseEntity.noContent().build();
    }
	
}
