package com.spring.marryus.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import javax.persistence.Index;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "sukso", indexes = {
        @Index(name = "idx_place", columnList = "place"),
        @Index(name = "idx_price", columnList = "price"),
        @Index(name = "idx_pyong", columnList = "pyong"),
        // 복합 인덱스 (필요시) - place, price, pyong 세 필드를 묶어 하나의 인덱스로 추가
        @Index(name = "idx_place_price_pyong", columnList = "place, price, pyong")
})
public class Sukso {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String sname;

    private String hosil;

    private int price;

    private String whereType;

    private String place;

    private int pyong;

    private String wido;

    private String gyungdo;

    private String addr;

    private String imgName;
}
