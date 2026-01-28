package es.uah.f1.dao;

import es.uah.f1.model.Circuito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class CircuitosDAOImpl implements ICircuitosDAO {
    @Autowired ICircuitosJPA repo;

    @Override public List<Circuito> buscarTodos() { return repo.findAll(); }
    @Override public Circuito buscarPorId(Integer id) { return repo.findById(id).orElse(null); }
    @Override public void guardar(Circuito circuito) { repo.save(circuito); }
    @Override public void eliminar(Integer id) { repo.deleteById(id); }
    @Override public void actualizar(Circuito circuito) { repo.save(circuito); }

    @Override
    public List<Circuito> buscarCalendario() {
        return repo.findByCalendarioTrue();
    }
}
