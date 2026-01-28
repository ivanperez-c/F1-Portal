package es.uah.f1.dao;

import es.uah.f1.model.Circuito;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ICircuitosJPA extends JpaRepository<Circuito, Integer> {
    List<Circuito> findByCalendarioTrue();
}