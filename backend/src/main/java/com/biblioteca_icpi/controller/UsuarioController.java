package com.biblioteca_icpi.controller;

import com.biblioteca_icpi.dto.CadastrarUsuarioDTO;
import com.biblioteca_icpi.dto.EditarUsuarioDTO;
import com.biblioteca_icpi.model.Aluguel;
import com.biblioteca_icpi.model.Usuario;
import com.biblioteca_icpi.service.UsuarioService;
import jakarta.validation.Valid;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/usuarios")
@CrossOrigin(origins = "*")
public class UsuarioController {

    private final UsuarioService usuarioService;

    public UsuarioController(UsuarioService usuarioService) {
        this.usuarioService = usuarioService;
    }

    @PostMapping
    public ResponseEntity<Usuario> cadastrar (@Valid @RequestBody CadastrarUsuarioDTO dto) {
        Usuario usuarioCriado = usuarioService.criarUsuario(dto);
        return ResponseEntity.ok(usuarioCriado);
    }

    @PutMapping("/{id}")
    public Usuario editarUsuario (@PathVariable Long id, @Valid @RequestBody EditarUsuarioDTO dto) {
        return usuarioService.editarUsuario(id, dto);
    }

    @DeleteMapping("/{id}")
    public void excluirUsuario (@PathVariable Long id) {
        usuarioService.excluirUsuario(id);
    }


    @GetMapping("/{id}")
    public Usuario consultarUsuario (@PathVariable("id") Long idUsuario) {
        return usuarioService.buscarUsuarioNoBanco(idUsuario);
    }

    @GetMapping
    public List<Usuario> consultarUsuarios () {
        return usuarioService.listarUsuarios();
    }

}
