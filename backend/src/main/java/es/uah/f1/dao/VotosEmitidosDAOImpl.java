package es.uah.f1.dao;

import es.uah.f1.model.VotoEmitido;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public class VotosEmitidosDAOImpl implements IVotosEmitidosDAO {

    @Autowired
    IVotosEmitidosJPA jpa;

    @Override
    public List<VotoEmitido> buscarTodos() {
        return jpa.findAll();
    }

    @Override
    public VotoEmitido buscarPorId(Integer id) {
        return jpa.findById(id).orElse(null);
    }

    @Override
    public void guardar(VotoEmitido votoEmitido) {
        jpa.save(votoEmitido);
    }

    @Override
    public void eliminar(Integer id) {
        jpa.deleteById(id);
    }

    @Override
    public void actualizar(VotoEmitido votoEmitido) {
        jpa.save(votoEmitido);
    }

    @Override
    public boolean yaHaVotado(String email, Integer idVotacion) {
        return jpa.existsByEmailAficionadoAndVotacionId(email, idVotacion);
    }

    @Override
    public List<Object[]> obtenerResultados(Integer idVotacion) {
        return jpa.contarVotosPorVotacion(idVotacion);
    }
}