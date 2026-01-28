package es.uah.f1.dao;

import es.uah.f1.model.Piloto;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface IPilotosJPA extends JpaRepository<Piloto, Integer> {
    List<Piloto> findByEquipoId(Integer idEquipo);
}