package es.uah.f1.dao;

import es.uah.f1.model.Equipo;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IEquiposJPA extends JpaRepository<Equipo, Integer> { }