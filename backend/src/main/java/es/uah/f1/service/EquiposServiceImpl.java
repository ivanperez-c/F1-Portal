package es.uah.f1.service;

import es.uah.f1.dao.IEquiposDAO;
import es.uah.f1.model.Equipo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class EquiposServiceImpl implements IEquiposService {
    @Autowired IEquiposDAO dao;

    @Override public List<Equipo> buscarTodos() { return dao.buscarTodos(); }
    @Override public Equipo buscarPorId(Integer id) { return dao.buscarPorId(id); }

    @Override
    public void guardar(Equipo equipo) {
        if(equipo.getUsuarioCreador() != null) { // Validación simple
            dao.guardar(equipo);
        }
    }

    @Override
    public void eliminar(Integer id) {
        if(dao.buscarPorId(id) != null) dao.eliminar(id);
    }

    @Override
    public void actualizar(Equipo equipo) {
        if(equipo.getId() != null && dao.buscarPorId(equipo.getId()) != null) {
            dao.actualizar(equipo);
        }
    }
}