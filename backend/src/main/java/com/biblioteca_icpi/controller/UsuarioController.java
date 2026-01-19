package com.biblioteca_icpi.controller;

import com.biblioteca_icpi.dto.CadastrarUsuarioDTO;
import com.biblioteca_icpi.dto.EditarUsuarioDTO;
import com.biblioteca_icpi.model.Aluguel;
import com.biblioteca_icpi.model.Usuario;
import com.biblioteca_icpi.service.UsuarioService;
import com.biblioteca_icpi.dto.LoginDTO;
import com.biblioteca_icpi.repository.UsuarioRepository;
import jakarta.validation.Valid;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.HttpStatus;

import java.util.List;

@RestController
@RequestMapping("/usuarios")
@CrossOrigin(origins = "*")
public class UsuarioController {

    private final UsuarioService usuarioService;

    private final UsuarioRepository usuarioRepository;

    public UsuarioController(UsuarioService usuarioService, UsuarioRepository usuarioRepository) {
        this.usuarioService = usuarioService;
        this.usuarioRepository = usuarioRepository;
    }

    @PostMapping
    public ResponseEntity<Usuario> cadastrar (@Valid @RequestBody CadastrarUsuarioDTO dto) {
        Usuario usuarioCriado = usuarioService.criarUsuario(dto);
        return ResponseEntity.ok(usuarioCriado);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginDTO loginDTO) {
    Usuario usuario = usuarioRepository.findByEmail(loginDTO.getEmail());

// 2. Validação básica (verificando se existe e se a senha bate)
    if (usuario != null && usuario.getSenha().equals(loginDTO.getSenha())) {
        
        // Se tudo estiver OK, retornamos o objeto usuário
        // O JSON gerado terá o campo "role" que você precisa no Frontend
        return ResponseEntity.ok(usuario);
    }

    // 3. Se falhar, retorna erro 401
    return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("E-mail ou senha incorretos.");
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
