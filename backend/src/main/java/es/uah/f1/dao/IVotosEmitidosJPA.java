package es.uah.f1.dao;

import es.uah.f1.model.VotoEmitido;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IVotosEmitidosJPA extends JpaRepository<VotoEmitido, Integer> {
}