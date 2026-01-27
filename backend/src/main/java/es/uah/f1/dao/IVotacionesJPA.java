package es.uah.f1.dao;

import es.uah.f1.model.Votacion;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IVotacionesJPA extends JpaRepository<Votacion, Integer> {
}
