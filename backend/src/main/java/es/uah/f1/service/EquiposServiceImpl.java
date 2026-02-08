package es.uah.f1.service;

import es.uah.f1.dao.IEquiposDAO;
import es.uah.f1.model.Equipo;
import es.uah.f1.model.Usuario;
import es.uah.f1.dao.IUsuariosDAO;
import es.uah.f1.dao.IEquipoResponsablesDAO;
import es.uah.f1.dao.IUsuariosDAO;
import es.uah.f1.model.EquipoResponsable;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class EquiposServiceImpl implements IEquiposService {
    @Autowired IEquiposDAO dao;

    @Autowired
    IUsuariosDAO usuariosDAO;

    @Autowired
    IEquipoResponsablesDAO responsablesDAO;

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

    @Override
    @Transactional
    public Usuario anadirResponsable(Integer idEquipo, String username) {

        Equipo equipo = dao.buscarPorId(idEquipo);
        if (equipo == null) {
            throw new RuntimeException("El equipo no existe.");
        }

        Usuario usuario = usuariosDAO.buscarPorNombreUsuario(username);
        if (usuario == null) {
            throw new RuntimeException("El usuario '" + username + "' no existe.");
        }

        EquipoResponsable existe = responsablesDAO.buscarPorEquipoYUsuario(idEquipo, usuario.getId());
        if (existe != null) {
            throw new RuntimeException("El usuario ya es responsable de este equipo.");
        }

        EquipoResponsable nuevo = new EquipoResponsable();
        nuevo.setEquipo(equipo);
        nuevo.setUsuario(usuario);
        responsablesDAO.guardar(nuevo);

        return usuario;
    }

    @Override
    @Transactional
    public void quitarResponsable(Integer idEquipo, Integer idUsuario) {
        if (usuariosDAO.buscarPorId(idUsuario) == null) {
            throw new RuntimeException("El usuario con ID " + idUsuario + " no existe.");
        }

        EquipoResponsable relacion = responsablesDAO.buscarPorEquipoYUsuario(idEquipo, idUsuario);

        if (relacion != null) {
            responsablesDAO.eliminar(relacion.getId());
        } else {
            throw new RuntimeException("El usuario con ID " + idUsuario + " no es responsable de este equipo.");
        }
    }
}