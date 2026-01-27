package es.uah.f1.service;

import es.uah.f1.dao.INoticiasDAO;
import es.uah.f1.model.Noticia;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class NoticiasServiceImpl implements INoticiasService {

    @Autowired
    INoticiasDAO dao;

    @Override
    public List<Noticia> buscarTodas() { return dao.buscarTodas(); }

    @Override
    public Noticia buscarPorId(Integer id) { return dao.buscarPorId(id); }

    @Override
    public Noticia buscarPorPermalink(String permalink) { return dao.buscarPorPermalink(permalink); }

    @Override
    public void guardar(Noticia noticia) {
        if (noticia.getTitulo() != null && noticia.getAutor() != null) {
            dao.guardar(noticia);
        }
    }

    @Override
    public void eliminar(Integer id) {
        if (dao.buscarPorId(id) != null) dao.eliminar(id);
    }

    @Override
    public void actualizar(Noticia noticia) {
        if (noticia.getId() != null && dao.buscarPorId(noticia.getId()) != null) {
            dao.actualizar(noticia);
        }
    }
}