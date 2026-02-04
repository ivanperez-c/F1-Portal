package es.uah.f1.dao;

import es.uah.f1.model.Equipo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.util.List;

public interface IEquiposJPA extends JpaRepository<Equipo, Integer> {
    @Query("SELECT DISTINCT e FROM Equipo e LEFT JOIN FETCH e.pilotos")
    List<Equipo> findAllWithPilotos();
}