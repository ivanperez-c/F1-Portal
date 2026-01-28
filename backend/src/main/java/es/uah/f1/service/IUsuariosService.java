package es.uah.f1.service;

import es.uah.f1.model.Usuario;
import java.util.List;

public interface IUsuariosService {
    List<Usuario> buscarTodos();
    Usuario buscarPorId(Integer id);
    Usuario buscarPorNombreUsuario(String usuario);
    void guardar(Usuario usuario);
    void eliminar(Integer id);
    void actualizar(Usuario usuario);

    Usuario login(String usuario, String password);
    void registrarUsuario(Usuario usuario);
    List<Usuario> buscarPendientes();
    void validarUsuario(Integer id);
}
