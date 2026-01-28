package es.uah.f1.dao;

import es.uah.f1.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;
import java.util.List;

public interface IUsuariosJPA extends JpaRepository<Usuario, Integer> {
    Optional<Usuario> findByUsuario(String usuario);
    Optional<Usuario> findByEmail(String email);
    List<Usuario> findByValidadoFalse();
}
