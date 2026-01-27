package es.uah.f1.dao;

import es.uah.f1.model.VotacionPiloto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public class VotacionPilotosDAOImpl implements IVotacionPilotosDAO {

    @Autowired
    IVotacionPilotosJPA jpa;

    @Override
    public List<VotacionPiloto> buscarTodos() {
        return jpa.findAll();
    }

    @Override
    public VotacionPiloto buscarPorId(Integer id) {
        return jpa.findById(id).orElse(null);
    }

    @Override
    public void guardar(VotacionPiloto votacionPiloto) {
        jpa.save(votacionPiloto);
    }

    @Override
    public void eliminar(Integer id) {
        jpa.deleteById(id);
    }

    @Override
    public void actualizar(VotacionPiloto votacionPiloto) {
        jpa.save(votacionPiloto);
    }
}
