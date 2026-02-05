package es.uah.f1.dao;

import es.uah.f1.model.VotacionPiloto;
import java.util.List;

public interface IVotacionPilotosDAO {
    List<VotacionPiloto> buscarTodos();
    VotacionPiloto buscarPorId(Integer id);
    void guardar(VotacionPiloto votacionPiloto);
    void eliminar(Integer id);
    void actualizar(VotacionPiloto votacionPiloto);
    List<VotacionPiloto> buscarPorVotacion(Integer idVotacion);
}
