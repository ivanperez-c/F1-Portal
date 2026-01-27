package es.uah.f1.dao;

import es.uah.f1.model.Coche;
import java.util.List;

public interface ICochesDAO {
    List<Coche> buscarTodos();
    Coche buscarPorId(Integer id);
    void guardar(Coche coche);
    void eliminar(Integer id);
    void actualizar(Coche coche);
}
