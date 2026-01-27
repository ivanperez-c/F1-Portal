package es.uah.f1.dao;

import es.uah.f1.model.VotacionPiloto;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IVotacionPilotosJPA extends JpaRepository<VotacionPiloto, Integer> {
}