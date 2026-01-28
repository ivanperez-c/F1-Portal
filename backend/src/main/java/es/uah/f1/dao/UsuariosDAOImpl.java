package es.uah.f1.dao;

import es.uah.f1.model.Usuario;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class UsuariosDAOImpl implements IUsuariosDAO {

    @Autowired
    IUsuariosJPA usuariosJPA;

    @Override
    public List<Usuario> buscarTodos() {
        return usuariosJPA.findAll();
    }

    @Override
    public Usuario buscarPorId(Integer id) {
        return usuariosJPA.findById(id).orElse(null);
    }

    @Override
    public Usuario buscarPorNombreUsuario(String nombreUsuario) {
        return usuariosJPA.findByUsuario(nombreUsuario).orElse(null);
    }

    @Override
    public void guardar(Usuario usuario) {
        usuariosJPA.save(usuario);
    }

    @Override
    public void eliminar(Integer id) {
        usuariosJPA.deleteById(id);
    }

    @Override
    public void actualizar(Usuario usuario) {
        usuariosJPA.save(usuario);
    }

    @Override
    public List<Usuario> buscarPendientesDeValidacion() {
        return usuariosJPA.findByValidadoFalse();
    }
}