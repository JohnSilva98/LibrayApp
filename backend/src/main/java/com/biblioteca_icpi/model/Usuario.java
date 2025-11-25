package com.biblioteca_icpi.model;

import jakarta.persistence.*;
import java.util.List;

@Entity
@Table(name = "TB_USUARIO")
public class Usuario {

    public Usuario() {}

    public Usuario(Long id, String nome, String email, String senha, String dataNascimento, String telefone, String role, List<Aluguel> alugueis) {
        this.id = id;
        this.nome = nome;
        this.email = email;
        this.senha = senha;
        this.dataNascimento = dataNascimento;
        this.telefone = telefone;
        this.role = role;
        this.alugueis = alugueis;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nome;

    @Column(unique = true)
    private String email;

    private String senha;

    private String dataNascimento;

    private String telefone;

    private String role = "USER"; // USER ou ADMIN

    @OneToMany(mappedBy = "usuario")
    private List<Aluguel> alugueis;

    // getters e setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getNome() { return nome; }
    public void setNome(String nome) { this.nome = nome; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getSenha() { return senha; }
    public void setSenha(String senha) { this.senha = senha; }

    public String getDataNascimento() { return dataNascimento; }
    public void setDataNascimento(String dataNascimento) { this.dataNascimento = dataNascimento; }

    public String getTelefone() { return telefone; }
    public void setTelefone(String telefone) { this.telefone = telefone; }

    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }

    public List<Aluguel> getAlugueis() { return alugueis; }
    public void setAlugueis(List<Aluguel> alugueis) { this.alugueis = alugueis; }
}
