package es.uah.f1.dao;

import es.uah.f1.model.VotacionPiloto;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface IVotacionPilotosJPA extends JpaRepository<VotacionPiloto, Integer> {
    List<VotacionPiloto> findByVotacionId(Integer idVotacion);
}