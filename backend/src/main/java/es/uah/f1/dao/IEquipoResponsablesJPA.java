package es.uah.f1.dao;

import es.uah.f1.model.EquipoResponsable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IEquipoResponsablesJPA extends JpaRepository<EquipoResponsable, Integer> {
}
