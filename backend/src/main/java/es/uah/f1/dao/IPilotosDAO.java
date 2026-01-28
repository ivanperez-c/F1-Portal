package es.uah.f1.dao;

import es.uah.f1.model.Piloto;
import java.util.List;

public interface IPilotosDAO {
    List<Piloto> buscarTodos();
    Piloto buscarPilotoPorId(Integer id);
    void guardarPiloto(Piloto piloto);
    void eliminarPiloto(Integer id);
    void actualizarPiloto(Piloto piloto);
    List<Piloto> buscarPorEquipo(Integer idEquipo);
}
