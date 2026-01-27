package es.uah.f1.dao;

import es.uah.f1.model.Votacion;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public class VotacionesDAOImpl implements IVotacionesDAO {

    @Autowired
    IVotacionesJPA votacionesJPA;

    @Override
    public List<Votacion> buscarTodas() { return votacionesJPA.findAll(); }

    @Override
    public Votacion buscarPorId(Integer id) { return votacionesJPA.findById(id).orElse(null); }

    @Override
    public void guardar(Votacion votacion) { votacionesJPA.save(votacion); }

    @Override
    public void eliminar(Integer id) { votacionesJPA.deleteById(id); }

    @Override
    public void actualizar(Votacion votacion) { votacionesJPA.save(votacion); }
}