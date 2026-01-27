package es.uah.f1.dao;

import es.uah.f1.model.Votacion;
import java.util.List;

public interface IVotacionesDAO {
    List<Votacion> buscarTodas();
    Votacion buscarPorId(Integer id);
    void guardar(Votacion votacion);
    void eliminar(Integer id);
    void actualizar(Votacion votacion);
}
