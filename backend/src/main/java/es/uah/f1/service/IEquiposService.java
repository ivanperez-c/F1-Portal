package es.uah.f1.service;

import es.uah.f1.model.Equipo;
import es.uah.f1.model.Usuario;

import java.util.List;

public interface IEquiposService {
    List<Equipo> buscarTodos();
    Equipo buscarPorId(Integer id);
    Equipo guardar(Equipo equipo);
    void eliminar(Integer id);
    void actualizar(Equipo equipo);
    Usuario anadirResponsable(Integer idEquipo, String username);
    void quitarResponsable(Integer idEquipo, Integer idUsuario);
}
