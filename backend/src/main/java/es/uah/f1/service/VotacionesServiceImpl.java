package es.uah.f1.service;

import es.uah.f1.dao.IVotacionesDAO;
import es.uah.f1.model.Votacion;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class VotacionesServiceImpl implements IVotacionesService {

    @Autowired
    IVotacionesDAO dao;

    @Override
    public List<Votacion> buscarTodas() { return dao.buscarTodas(); }

    @Override
    public Votacion buscarPorId(Integer id) { return dao.buscarPorId(id); }

    @Override
    public void guardar(Votacion votacion) {
        if (votacion.getTitulo() != null && votacion.getLimite() != null) {
            dao.guardar(votacion);
        }
    }

    @Override
    public void eliminar(Integer id) {
        if (dao.buscarPorId(id) != null) dao.eliminar(id);
    }

    @Override
    public void actualizar(Votacion votacion) {
        if (votacion.getId() != null && dao.buscarPorId(votacion.getId()) != null) {
            dao.actualizar(votacion);
        }
    }
}