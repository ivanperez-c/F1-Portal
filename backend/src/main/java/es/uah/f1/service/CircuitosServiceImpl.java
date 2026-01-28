package es.uah.f1.service;

import es.uah.f1.dao.ICircuitosDAO;
import es.uah.f1.model.Circuito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class CircuitosServiceImpl implements ICircuitosService {
    @Autowired ICircuitosDAO dao;

    @Override public List<Circuito> buscarTodos() { return dao.buscarTodos(); }
    @Override public Circuito buscarPorId(Integer id) { return dao.buscarPorId(id); }
    @Override public void guardar(Circuito circuito) { dao.guardar(circuito); }

    @Override public void eliminar(Integer id) {
        if(dao.buscarPorId(id) != null) dao.eliminar(id);
    }

    @Override public void actualizar(Circuito circuito) {
        if(circuito.getId() != null) dao.actualizar(circuito);
    }

    @Override
    public List<Circuito> buscarCalendario() {
        return dao.buscarCalendario();
    }
}