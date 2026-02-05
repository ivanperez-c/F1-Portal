package es.uah.f1.service;

import es.uah.f1.dao.IEquiposDAO;
import es.uah.f1.model.Equipo;
import es.uah.f1.model.Usuario;
import es.uah.f1.dao.IUsuariosDAO;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class EquiposServiceImpl implements IEquiposService {
    @Autowired IEquiposDAO dao;

    @Autowired
    IUsuariosDAO usuariosDAO;

    @Override public List<Equipo> buscarTodos() { return dao.buscarTodos(); }
    @Override public Equipo buscarPorId(Integer id) { return dao.buscarPorId(id); }

    @Override
    @Transactional
    public Equipo guardar(Equipo equipo) {

        return dao.guardar(equipo);


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