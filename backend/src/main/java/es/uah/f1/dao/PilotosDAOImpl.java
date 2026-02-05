package es.uah.f1.dao;

import es.uah.f1.model.Piloto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public class PilotosDAOImpl implements IPilotosDAO {

    @Autowired
    IPilotosJPA pilotosJPA;

    @Override
    public List<Piloto> buscarTodos() {
        return pilotosJPA.findAll();
    }

    @Override
    public Piloto buscarPilotoPorId(Integer id) {
        Optional<Piloto> optional = pilotosJPA.findById(id);
        return optional.orElse(null);
    }

    @Override
    public void guardarPiloto(Piloto piloto) {
        pilotosJPA.save(piloto);
    }

    @Override
    public void eliminarPiloto(Integer id) {
        pilotosJPA.deleteById(id);
    }

    @Override
    public void actualizarPiloto(Piloto piloto) {
        pilotosJPA.save(piloto);
    }

    @Override
    public List<Piloto> buscarPorEquipo(Integer idEquipo) {
        return pilotosJPA.findByEquipoId(idEquipo);
    }

    @Override
    public Piloto buscarPorSiglas(String siglas) {
        return pilotosJPA.findBySiglas(siglas);
    }
}
