package com.spring.marryus.controller;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.UnsupportedEncodingException;
import java.net.URL;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import com.nimbusds.jose.shaded.json.JSONObject;
import com.nimbusds.jose.shaded.json.parser.JSONParser;
import com.nimbusds.jose.shaded.json.parser.ParseException;

@RestController
public class GeocodeController {



    @GetMapping("/api/geoCode")
    public Map<String, Object> getCoordinates(@RequestParam("address") String address,
    										  @RequestParam("type") String type) throws UnsupportedEncodingException {
    	System.out.println(type);
    	System.out.println("호출됨");
    	/* Java 코드 사용예제 */     
    	String apikey = "3D97621D-D686-329B-8D35-9CB23E7F4ECA";
    	String searchType = type;
    	String searchAddr = address;
    	String epsg = "epsg:4326";

    	StringBuilder sb = new StringBuilder("https://api.vworld.kr/req/address");
    	sb.append("?service=address");
    	sb.append("&request=getCoord");
    	sb.append("&format=json");
    	sb.append("&crs=" + epsg);
    	sb.append("&key=" + apikey);
    	sb.append("&type=" + searchType);
    	sb.append("&address=" + URLEncoder.encode(searchAddr, StandardCharsets.UTF_8.toString()));
    	
    	Map<String, Object> jsonMap = new HashMap<>();
    	
    	try{
    		URL url = new URL(sb.toString());
    		BufferedReader reader = new BufferedReader(new InputStreamReader(url.openStream(), StandardCharsets.UTF_8));
    		
    		JSONParser jspa = new JSONParser();
    		JSONObject jsob = (JSONObject) jspa.parse(reader);
    		JSONObject jsrs = (JSONObject) jsob.get("response");
    		JSONObject jsResult = (JSONObject) jsrs.get("result");
    		JSONObject jspoitn = (JSONObject) jsResult.get("point");
    		
    		System.out.println(jspoitn.get("x"));
    		System.out.println(jspoitn.get("y"));
    		
	        jsonMap.put("x", jspoitn.get("x").toString());
	        jsonMap.put("y", jspoitn.get("y").toString());
    		
    	} catch (IOException | ParseException e) {
//    		throw new RuntimeException(e);
    		 jsonMap.put("error", "정확한 주소를 입력해주세요");
    	}
    	
    	return jsonMap;
    }
}
