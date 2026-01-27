package es.uah.f1.service;

import es.uah.f1.model.VotacionPiloto;
import java.util.List;

public interface IVotacionPilotosService {
    List<VotacionPiloto> buscarTodos();
    VotacionPiloto buscarPorId(Integer id);
    void guardar(VotacionPiloto vp);
    void eliminar(Integer id);
    void actualizar(VotacionPiloto vp);
}
