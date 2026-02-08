package es.uah.f1.dao;

import es.uah.f1.model.EquipoResponsable;
import java.util.List;

public interface IEquipoResponsablesDAO {
    List<EquipoResponsable> buscarTodos();
    EquipoResponsable buscarPorId(Integer id);
    void guardar(EquipoResponsable equipoResponsable);
    void eliminar(Integer id);
    void actualizar(EquipoResponsable equipoResponsable);
    EquipoResponsable buscarPorUsuario(Integer idUsuario);
    EquipoResponsable buscarPorEquipoYUsuario(Integer idEquipo, Integer idUsuario);
}