package es.uah.f1.dao;

import es.uah.f1.model.Circuito;

import java.util.List;

public interface ICircuitosDAO {
    List<Circuito> buscarTodos();
    Circuito buscarPorId(Integer id);
    void guardar(Circuito circuito);
    void eliminar(Integer id);
    void actualizar(Circuito circuito);
    List<Circuito> buscarCalendario();
}
