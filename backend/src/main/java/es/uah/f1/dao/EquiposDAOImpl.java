package es.uah.f1.dao;

import es.uah.f1.model.Equipo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public class EquiposDAOImpl implements IEquiposDAO {
    @Autowired IEquiposJPA repo;

    @Override public List<Equipo> buscarTodos() {
        List<Equipo> equipos = repo.findAllWithPilotos();
        repo.fetchCochesForEquipos(equipos);
        repo.fetchUsuariosForEquipos(equipos);
        return equipos;
    }
    @Override public Equipo buscarPorId(Integer id) {
        Equipo equipo = repo.findByIdWithPilotos(id);
        repo.fetchCochesForEquipo(equipo);
        repo.fetchUsuariosForEquipo(equipo);
        return equipo;
    }
    @Override public void guardar(Equipo equipo) { repo.save(equipo); }
    @Override public void eliminar(Integer id) { repo.deleteById(id); }
    @Override public void actualizar(Equipo equipo) { repo.save(equipo); }
}
