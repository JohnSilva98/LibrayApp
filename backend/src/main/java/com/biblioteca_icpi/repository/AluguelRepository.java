package com.biblioteca_icpi.repository;

import com.biblioteca_icpi.model.Aluguel;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AluguelRepository extends JpaRepository <Aluguel, Long> {
    List<Aluguel> findByUsuarioId(Long usuarioId);
}
