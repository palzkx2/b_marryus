package com.spring.marryus.util;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import javax.annotation.PostConstruct;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import net.coobird.thumbnailator.Thumbnails;

@Component
@Log4j2
@RequiredArgsConstructor
public class CustomFileUtil {

    @Value("${com.spring.marryus.upload.path}")
    private String uploadPath;

    @PostConstruct
    public void init() {
        File tempFolder = new File(uploadPath);

        if (!tempFolder.exists()) {
            tempFolder.mkdir();
        }

        uploadPath = tempFolder.getAbsolutePath();

        log.info("-------------------------------------");
        log.info(uploadPath);
    }

    public List<String> saveFiles(List<MultipartFile> files) throws RuntimeException {

        if (files == null || files.size() == 0) {
            return null;
        }

        List<String> uploadNames = new ArrayList<>();

        for (MultipartFile multipartFile : files) {
            String savedName = UUID.randomUUID().toString() + "_" + multipartFile.getOriginalFilename();
            Path savePath = Paths.get(uploadPath, savedName);

            // try-with-resources를 사용하여 InputStream을 자동으로 닫습니다.
            try (InputStream is = multipartFile.getInputStream()) {
                Files.copy(is, savePath);
            } catch (IOException e) {
                throw new RuntimeException("파일 저장 중 오류 발생: " + e.getMessage(), e);
            }

            String contentType = multipartFile.getContentType();

            if (contentType != null && contentType.startsWith("image")) { // 이미지 여부 확인
                Path thumbnailPath = Paths.get(uploadPath, "s_" + savedName);

                try {
                    // 썸네일 생성
                    Thumbnails.of(savePath.toFile())
                              .size(400, 400)
                              .toFile(thumbnailPath.toFile());
                } catch (IOException e) {
                    throw new RuntimeException("썸네일 생성 중 오류 발생: " + e.getMessage(), e);
                }
            }

            uploadNames.add(savedName);
            log.info("파일 저장 완료: " + savedName);
        } // end for

        return uploadNames;
    }

    public ResponseEntity<Resource> getFile(String fileName) {

        Resource resource = new FileSystemResource(uploadPath + File.separator + fileName);

        if (!resource.exists()) {
            resource = new FileSystemResource(uploadPath + File.separator + "default.jpeg");
        }

        HttpHeaders headers = new HttpHeaders();

        try {
            headers.add("Content-Type", Files.probeContentType(resource.getFile().toPath()));
        } catch (Exception e) {
            log.error("파일의 Content-Type을 설정하는 중 오류 발생: ", e);
            return ResponseEntity.internalServerError().build();
        }

        return ResponseEntity.ok().headers(headers).body(resource);
    }

    public void deleteFiles(List<String> fileNames) {

        if (fileNames == null || fileNames.size() == 0) {
            return;
        }

        fileNames.forEach(fileName -> {
            // 썸네일이 있는지 확인하고 삭제
            String thumbnailFileName = "s_" + fileName;
            Path thumbnailPath = Paths.get(uploadPath, thumbnailFileName);
            Path filePath = Paths.get(uploadPath, fileName);

            try {
                Files.deleteIfExists(filePath);
                Files.deleteIfExists(thumbnailPath);
                log.info("파일 삭제 완료: " + fileName);
            } catch (IOException e) {
                throw new RuntimeException("파일 삭제 중 오류 발생: " + e.getMessage(), e);
            }
        });
    }

}