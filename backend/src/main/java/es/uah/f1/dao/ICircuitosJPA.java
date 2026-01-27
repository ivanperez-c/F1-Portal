package es.uah.f1.dao;

import es.uah.f1.model.Circuito;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ICircuitosJPA extends JpaRepository<Circuito, Integer> { }