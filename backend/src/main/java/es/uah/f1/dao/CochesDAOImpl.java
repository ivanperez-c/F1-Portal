package es.uah.f1.dao;

import es.uah.f1.model.Coche;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public class CochesDAOImpl implements ICochesDAO {

    @Autowired
    ICochesJPA cochesJPA;

    @Override
    public List<Coche> buscarTodos() { return cochesJPA.findAll(); }

    @Override
    public Coche buscarPorId(Integer id) { return cochesJPA.findById(id).orElse(null); }

    @Override
    public void guardar(Coche coche) { cochesJPA.save(coche); }

    @Override
    public void eliminar(Integer id) { cochesJPA.deleteById(id); }

    @Override
    public void actualizar(Coche coche) { cochesJPA.save(coche); }
}
