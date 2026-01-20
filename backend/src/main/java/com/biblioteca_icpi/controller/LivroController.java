package com.biblioteca_icpi.controller;

import com.biblioteca_icpi.dto.CadastrarLivroDTO;
import com.biblioteca_icpi.dto.EditarLivroDTO;
import com.biblioteca_icpi.model.Livro;
import com.biblioteca_icpi.service.LivroService;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.biblioteca_icpi.service.ImageService; // Ajuste o path conforme seu projeto
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import jakarta.validation.Valid;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/livros")
public class LivroController {

    private final LivroService livroService;
    private final ImageService imageService;
    private final ObjectMapper objectMapper = new ObjectMapper();

    public LivroController(LivroService livroService, ImageService imageService) {
        this.livroService = livroService;
        this.imageService = imageService;
    }

    // ✅ NOVO: Upload com imagem + JSON
    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Livro> cadastrarLivroComImagem(
            @RequestPart("livro") String livroJson,
            @RequestPart("image") MultipartFile file) {
        try {
            // Parse JSON do campo "livro"
            Map<String, Object> livroData = objectMapper.readValue(livroJson, Map.class);
            
            // Upload da imagem
            String capaUrl = imageService.upload(file);
            livroData.put("capaUrl", capaUrl);
            
            // Converter para DTO e salvar
            CadastrarLivroDTO dto = objectMapper.convertValue(livroData, CadastrarLivroDTO.class);
            Livro livro = livroService.cadastrarLivro(dto);
            
            return ResponseEntity.ok(livro);
        } catch (Exception e) {
            throw new RuntimeException("Erro ao cadastrar livro com imagem: " + e.getMessage(), e);
        }
    }

    // ✅ MANTER: POST sem imagem (JSON puro)
    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE)
    public Livro cadastrarLivroSemImagem(@Valid @RequestBody CadastrarLivroDTO dto) {
        return livroService.cadastrarLivro(dto);
    }

    @GetMapping("/{idLivro}")
    public Livro buscarLivro(@PathVariable Long idLivro) {
        return livroService.buscarLivroNoBancoDeDados(idLivro);
    }

    @PutMapping("/{idLivro}")
    public Livro editarLivro(@PathVariable Long idLivro, @Valid @RequestBody EditarLivroDTO dto) {
        return livroService.editarLivro(idLivro, dto);
    }

    @DeleteMapping("/{idLivro}")
    public void deletarLivro(@PathVariable Long idLivro) {
        livroService.excluirLivro(idLivro);
    }

    @GetMapping
    @ResponseBody
    public List<Livro> listarLivros() {
        return livroService.listarLivros();
    }
}
