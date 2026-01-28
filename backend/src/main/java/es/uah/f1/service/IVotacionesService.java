package es.uah.f1.service;

import es.uah.f1.model.Votacion;
import java.util.List;

public interface IVotacionesService {
    List<Votacion> buscarTodas();
    Votacion buscarPorId(Integer id);
    void guardar(Votacion votacion);
    void eliminar(Integer id);
    void actualizar(Votacion votacion);
    String crearVotacion(Votacion votacion, List<Integer> idsPilotos);
}
