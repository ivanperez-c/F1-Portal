package es.uah.f1.service;

import es.uah.f1.model.Equipo;
import java.util.List;

public interface IEquiposService {
    List<Equipo> buscarTodos();
    Equipo buscarPorId(Integer id);
    Equipo guardar(Equipo equipo);
    void eliminar(Integer id);
    void actualizar(Equipo equipo);
}
