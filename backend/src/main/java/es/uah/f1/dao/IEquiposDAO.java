package es.uah.f1.dao;

import es.uah.f1.model.Equipo;
import java.util.List;

public interface IEquiposDAO {
    List<Equipo> buscarTodos();
    Equipo buscarPorId(Integer id);
    void guardar(Equipo equipo);
    void eliminar(Integer id);
    void actualizar(Equipo equipo);
    Equipo buscarPorUsuarioCreador(Integer idUsuario);
}
