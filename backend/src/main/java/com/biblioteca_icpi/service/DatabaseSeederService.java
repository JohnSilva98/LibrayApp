package com.biblioteca_icpi.service;

import com.biblioteca_icpi.model.Livro;
import com.biblioteca_icpi.repository.LivroRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import java.util.List;
import java.util.Map;

@Service
public class DatabaseSeederService {

    private final LivroRepository livroRepository;

    public DatabaseSeederService(LivroRepository livroRepository) {
        this.livroRepository = livroRepository;
    }

    public void popularBanco() {
        if (livroRepository.count() > 0){
            System.out.println("⚠️ Banco já populado. Pulando Seed.");
        return;
        }

        RestTemplate restTemplate = new RestTemplate();
        String[] temas = {"Fiction", "History", "Technology", "Science", "Mystery"};

        for (String tema : temas) {
            String url = "https://www.googleapis.com/books/v1/volumes?q=subject:" + tema + "&maxResults=10&langRestrict=pt";
            try {
                Map<String, Object> response = restTemplate.getForObject(url, Map.class);
                List<Map<String, Object>> items = (List<Map<String, Object>>) response.get("items");

                if (items != null) {
                    for (Map<String, Object> item : items) {
                        Map<String, Object> info = (Map<String, Object>) item.get("volumeInfo");
                        
                        Livro livro = new Livro();
                        livro.setNome((String) info.get("title"));
                        
                        List<String> authors = (List<String>) info.get("authors");
                        livro.setAutor(authors != null ? authors.get(0) : "Desconhecido");
                        
                        livro.setGenero(tema);
                        livro.setDescricao((String) info.get("description"));
                        livro.setDisponivel(true);

                        Map<String, String> imgs = (Map<String, String>) info.get("imageLinks");
                        if (imgs != null) {
                            livro.setCapaUrl(imgs.get("thumbnail").replace("http://", "https://"));
                        }

                        livroRepository.save(livro);
                    }
                }
            } catch (Exception e) {
                System.out.println("Erro ao buscar tema " + tema + ": " + e.getMessage());
            }
        }
        System.out.println("✅ Biblioteca populada com livros reais!");
    }
}