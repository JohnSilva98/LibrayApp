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
        if (livroRepository.count() > 0) {
            System.out.println("⚠️ Banco já populado. Pulando Seed.");
            return;
        }

        RestTemplate restTemplate = new RestTemplate();
        String[] temas = {"Fiction", "History", "Technology", "Science", "Mystery"};

        for (String tema : temas) {
            String url = "https://www.googleapis.com/books/v1/volumes?q=subject:" + tema + "&maxResults=10&langRestrict=pt";
            try {
                Map<String, Object> response = restTemplate.getForObject(url, Map.class);
                if (response == null) continue;

                List<Map<String, Object>> items = (List<Map<String, Object>>) response.get("items");

                if (items != null) {
                    for (Map<String, Object> item : items) {
                        Map<String, Object> info = (Map<String, Object>) item.get("volumeInfo");
                        String titulo = (String) info.get("title");

                        // Verifica se o livro já existe antes de salvar
                        if (!livroRepository.existsByNome(titulo)) {
                            Livro livro = new Livro();
                            livro.setNome(titulo);

                            List<String> authors = (List<String>) info.get("authors");
                            livro.setAutor(authors != null ? authors.get(0) : "Desconhecido");

                            livro.setGenero(tema);
                            livro.setDescricao((String) info.get("description"));
                            livro.setDisponivel(true);

                            Map<String, String> imgs = (Map<String, String>) info.get("imageLinks");
                            if (imgs != null) {
                                String thumb = imgs.get("thumbnail");
                                if (thumb != null) {
                                    livro.setCapaUrl(thumb.replace("http://", "https://"));
                                }
                            }

                            livroRepository.save(livro);
                        }
                    }
                }
            } catch (Exception e) {
                System.out.println("Erro ao buscar tema " + tema + ": " + e.getMessage());
            }
        }
        System.out.println("✅ Biblioteca populada com livros reais!");
    }
}