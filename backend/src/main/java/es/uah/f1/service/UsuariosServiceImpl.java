package es.uah.f1.service;

import es.uah.f1.dao.IUsuariosDAO;
import es.uah.f1.model.Usuario;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class UsuariosServiceImpl implements IUsuariosService {

    @Autowired
    IUsuariosDAO dao;

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
}
