package com.biblioteca_icpi.controller;

import com.biblioteca_icpi.dto.CadastrarLivroDTO;
import com.biblioteca_icpi.dto.EditarLivroDTO;
import com.biblioteca_icpi.model.Livro;
import com.biblioteca_icpi.service.LivroService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/livros")
public class LivroController {

    private final LivroService livroService;

    // Removemos o ImageService e o ObjectMapper daqui, pois o upload agora é feito via Google no Front
    public LivroController(LivroService livroService) {
        this.livroService = livroService;
    }

    /**
     * Cadastro Simplificado:
     * Recebe o JSON direto do React Native com os dados do Google Books.
     * O campo 'capaUrl' no DTO já virá com o link do Google.
     */
    @PostMapping
    public ResponseEntity<Livro> cadastrar(@Valid @RequestBody CadastrarLivroDTO dto) {
        Livro livro = livroService.cadastrarLivro(dto);
        return ResponseEntity.ok(livro);
    }

    @GetMapping("/{idLivro}")
    public ResponseEntity<Livro> buscarLivro(@PathVariable Long idLivro) {
        return ResponseEntity.ok(livroService.buscarLivroNoBancoDeDados(idLivro));
    }

    @PutMapping("/{idLivro}")
    public ResponseEntity<Livro> editarLivro(@PathVariable Long idLivro, @Valid @RequestBody EditarLivroDTO dto) {
        return ResponseEntity.ok(livroService.editarLivro(idLivro, dto));
    }

    @DeleteMapping("/{idLivro}")
    public ResponseEntity<Void> deletarLivro(@PathVariable Long idLivro) {
        livroService.excluirLivro(idLivro);
        return ResponseEntity.noContent().build();
    }

    @GetMapping
    public List<Livro> listarLivros() {
        return livroService.listarLivros();
    }
}