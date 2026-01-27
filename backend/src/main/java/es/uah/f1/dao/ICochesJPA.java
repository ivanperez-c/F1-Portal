package es.uah.f1.dao;

import es.uah.f1.model.Coche;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ICochesJPA extends JpaRepository<Coche, Integer> {
}