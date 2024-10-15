package com.spring.marryus.oauth;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@Entity
public class BaseAuthUser {

	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE)
	private Long id;
	
	@Column(nullable = false)
	private String name;
	
	@Column(nullable = false)
	private String email;
	
	@Column(nullable = false)
	private String picture;
	
	@Enumerated(EnumType.STRING)
	@Column(nullable = false)
	private BaseAuthRole role;
	
	
	
	@Builder
	public BaseAuthUser(String name,String email, String picture, BaseAuthRole role) {
		this.name = name;
		this.email = email;
		this.picture = picture;
		this.role = role;
	}
	
	//ȸ�� ���� ����(���ۿ� �ִ� �׸����� ���� �مf���� �ͼ� �ٲ�Բ� ��)
	public BaseAuthUser update(String name,String picture) {//�̸����� ���̵�Ƿ� �ٲ�� ����. �̸��̳� ���Ĵ� �ٲ� ������
		this.name = name;
		this.picture = picture;
		
		return this;//�ڱ� �ڽſ��� ��ȯ�϶�� ��.
	}
	
	public String getRoleKey() {
		return this.role.getKey();//role�� key�� . ��, ROLE_USER �����.
	}
}
