package es.uah.f1.service;

import es.uah.f1.model.Piloto;
import java.util.List;

public interface IPilotosService {
    List<Piloto> buscarTodos();
    Piloto buscarPilotoPorId(Integer id);
    void guardarPiloto(Piloto piloto);
    void eliminarPiloto(Integer id);
    void actualizarPiloto(Piloto piloto);
}
