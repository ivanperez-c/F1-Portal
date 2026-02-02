package es.uah.f1.dao;

import es.uah.f1.model.Noticia;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public class NoticiasDAOImpl implements INoticiasDAO {

    @Override
    public List<Noticia> buscarRelacionadas(String permalink) { return noticiasJPA.findByPermalinkNot(permalink); }

    @Autowired
    INoticiasJPA noticiasJPA;

    @Override
    public List<Noticia> buscarTodas() { return noticiasJPA.findAll(); }

    @Override
    public Noticia buscarPorId(Integer id) { return noticiasJPA.findById(id).orElse(null); }

    @Override
    public Noticia buscarPorPermalink(String permalink) {
        return noticiasJPA.findByPermalink(permalink).orElse(null);
    }

    @Override
    public void guardar(Noticia noticia) { noticiasJPA.save(noticia); }

    @Override
    public void eliminar(Integer id) { noticiasJPA.deleteById(id); }

    @Override
    public void actualizar(Noticia noticia) { noticiasJPA.save(noticia); }
}