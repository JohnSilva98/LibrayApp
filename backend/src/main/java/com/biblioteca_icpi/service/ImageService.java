package com.biblioteca_icpi.service;

import okhttp3.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;

@Service
public class ImageService {
    
    @Value("${cloudinary.cloud-name}")
    private String cloudName;
    
    @Value("${cloudinary.api-key}")
    private String apiKey;
    
    @Value("${cloudinary.api-secret}")
    private String apiSecret;

    public String uploadImage(MultipartFile file) throws IOException {
        OkHttpClient client = new OkHttpClient();
        
        RequestBody requestBody = new MultipartBody.Builder()
            .setType(MultipartBody.FORM)
            .addFormDataPart("file", file.getOriginalFilename(), 
                RequestBody.create(file.getBytes(), 
                    MediaType.parse(file.getContentType())))
            .addFormDataPart("upload_preset", "ml_default")
            .addFormDataPart("cloud_name", cloudName)
            .addFormDataPart("api_key", apiKey)
            .build();

        Request request = new Request.Builder()
            .url("https://api.cloudinary.com/v1_1/" + cloudName + "/image/upload")
            .post(requestBody)
            .build();

        try (Response response = client.newCall(request).execute()) {
            if (!response.isSuccessful()) {
                throw new IOException("Upload falhou: " + response.code());
            }
            
            // Extrai URL da resposta JSON
            String jsonResponse = response.body().string();
            String secureUrl = jsonResponse.split("\"secure_url\":\"")[1];
            return secureUrl.split("\"")[0];
        }
    }
}
