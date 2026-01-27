package es.uah.f1.dao;

import es.uah.f1.model.Equipo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public class EquiposDAOImpl implements IEquiposDAO {
    @Autowired IEquiposJPA repo;

    @Override public List<Equipo> buscarTodos() { return repo.findAll(); }
    @Override public Equipo buscarPorId(Integer id) { return repo.findById(id).orElse(null); }
    @Override public void guardar(Equipo equipo) { repo.save(equipo); }
    @Override public void eliminar(Integer id) { repo.deleteById(id); }
    @Override public void actualizar(Equipo equipo) { repo.save(equipo); }
}
