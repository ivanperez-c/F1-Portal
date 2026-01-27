package es.uah.f1.service;

import es.uah.f1.model.Noticia;
import java.util.List;

public interface INoticiasService {
    List<Noticia> buscarTodas();
    Noticia buscarPorId(Integer id);
    Noticia buscarPorPermalink(String permalink);
    void guardar(Noticia noticia);
    void eliminar(Integer id);
    void actualizar(Noticia noticia);
}
