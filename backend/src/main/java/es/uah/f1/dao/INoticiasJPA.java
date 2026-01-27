package es.uah.f1.dao;

import es.uah.f1.model.Noticia;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface INoticiasJPA extends JpaRepository<Noticia, Integer> {
    Optional<Noticia> findByPermalink(String permalink);
}
