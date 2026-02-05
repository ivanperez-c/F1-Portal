package es.uah.f1.service;

import es.uah.f1.dao.IUsuariosDAO;
import es.uah.f1.dao.IEquiposDAO;
import es.uah.f1.dao.IEquipoResponsablesDAO;
import es.uah.f1.dto.UsuarioLoginDTO;
import es.uah.f1.model.Equipo;
import es.uah.f1.model.EquipoResponsable;
import es.uah.f1.model.Rol;
import es.uah.f1.model.Usuario;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.time.LocalDateTime;


@Service
public class UsuariosServiceImpl implements IUsuariosService {

    @Autowired
    IUsuariosDAO dao;

    @Autowired
    IEquiposDAO equiposDAO;

    @Autowired
    IEquipoResponsablesDAO equipoResponsablesDAO;

    @Override
    public List<Usuario> buscarTodos() {
        return dao.buscarTodos();
    }

    @Override
    public Usuario buscarPorId(Integer id) {
        return dao.buscarPorId(id);
    }

    @Override
    public Usuario buscarPorNombreUsuario(String usuario) {
        return dao.buscarPorNombreUsuario(usuario);
    }

    @Override
    public void guardar(Usuario usuario) {
        if (usuario.getUsuario() != null && usuario.getEmail() != null) {
            dao.guardar(usuario);
        }
    }

    @Override
    public void eliminar(Integer id) {
        if (dao.buscarPorId(id) != null) {
            dao.eliminar(id);
        }
    }

    @Override
    public void actualizar(Usuario usuario) {
        if (usuario.getId() != null && dao.buscarPorId(usuario.getId()) != null) {
            dao.actualizar(usuario);
        }
    }

    @Override
    public UsuarioLoginDTO login(String usuario, String password) {
        Usuario u = dao.buscarPorNombreUsuario(usuario);

        if (u != null && u.getPasswdUsuario().equals(password)) {
            UsuarioLoginDTO dto = new UsuarioLoginDTO();
            dto.setId(u.getId());
            dto.setNombre(u.getNombre());
            dto.setUsuario(u.getUsuario());
            dto.setEmail(u.getEmail());
            dto.setRol(u.getRol().toString());
            dto.setValidado(u.getValidado());

            if ("responsable_equipo".equals(dto.getRol())) {
                Integer idEquipoEncontrado = null;


                Equipo equipoCreado = equiposDAO.buscarPorUsuarioCreador(u.getId());
                if (equipoCreado != null) {
                    idEquipoEncontrado = equipoCreado.getId();
                }

                else {
                    EquipoResponsable asignacion = equipoResponsablesDAO.buscarPorUsuario(u.getId());
                    if (asignacion != null) {
                        idEquipoEncontrado = asignacion.getEquipo().getId();
                    }
                }

                dto.setIdEquipo(idEquipoEncontrado);
            }

            return dto;
        }
        return null;
    }

    @Override
    public void registrarUsuario(Usuario usuario) {
        usuario.setValidado(false);
        usuario.setFechaRegistro(LocalDateTime.now());

        if (usuario.getUsuario() != null && usuario.getPasswdUsuario() != null) {
            dao.guardar(usuario);
        }
    }

    @Override
    public List<Usuario> buscarPendientes() {
        return dao.buscarPendientesDeValidacion();
    }

    @Override
    public void validarUsuario(Integer id, String rol) {
        Usuario u = dao.buscarPorId(id);
        if (u != null) {
            Rol r = Rol.valueOf(rol);
            u.setValidado(true);
            u.setRol(r);
            u.setFechaValidacion(LocalDateTime.now());
            dao.actualizar(u);
        }
    }
}
