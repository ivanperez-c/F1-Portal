package es.uah.f1.service;

import es.uah.f1.model.Coche;
import java.util.List;

public interface ICochesService {
    List<Coche> buscarTodos();
    Coche buscarPorId(Integer id);
    void guardar(Coche coche);
    void eliminar(Integer id);
    void actualizar(Coche coche);
}
