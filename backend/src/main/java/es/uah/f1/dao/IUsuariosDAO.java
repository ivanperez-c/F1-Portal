package es.uah.f1.dao;

import es.uah.f1.model.Usuario;
import java.util.List;

public interface IUsuariosDAO {
    List<Usuario> buscarTodos();
    Usuario buscarPorId(Integer id);
    Usuario buscarPorNombreUsuario(String nombreUsuario);
    void guardar(Usuario usuario);
    void eliminar(Integer id);
    void actualizar(Usuario usuario);
    List<Usuario> buscarPendientesDeValidacion();
}