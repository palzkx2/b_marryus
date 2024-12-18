package com.spring.marryus.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.spring.marryus.dao.SuksoRepository;
import com.spring.marryus.entity.Sukso;

import java.util.List;

@Service
@Transactional
public class SuksoService {

    @Autowired
    private SuksoRepository suksoRepository;

    // 숙소 등록
    public Sukso saveSukso(Sukso sukso) {
        return suksoRepository.save(sukso);
    }

    // 모든 숙소 조회
    public List<Sukso> getAllSukso() {
        return suksoRepository.findAll();
    }

    // 특정 숙소 조회 (ID로)
    public Sukso getSuksoById(Long id) {
        return suksoRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("해당 숙소가 존재하지 않습니다. ID: " + id));
    }

    // 숙소 삭제
    public void deleteSukso(Long id) {
        suksoRepository.deleteById(id);
    }
    
    // 특정 ID로 숙소 존재 여부 확인
    public boolean existsById(Long id) {
        return suksoRepository.existsById(id);
    }

    // 숙소 삭제 메서드
    public void deleteSuksoById(Long id) {
        suksoRepository.deleteById(id);
    }
    public List<Sukso> searchAgencies(String region, int price, int pyong) {
        return suksoRepository.findByPlaceAndPriceLessThanEqualAndPyongGreaterThanEqual(region, price, pyong);
    }
}
