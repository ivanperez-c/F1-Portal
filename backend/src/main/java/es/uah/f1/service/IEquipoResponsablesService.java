package es.uah.f1.service;

import es.uah.f1.model.EquipoResponsable;
import java.util.List;

public interface IEquipoResponsablesService {
    List<EquipoResponsable> buscarTodos();
    EquipoResponsable buscarPorId(Integer id);
    void guardar(EquipoResponsable er);
    void eliminar(Integer id);
    void actualizar(EquipoResponsable er);
}