package es.uah.f1.service;

import es.uah.f1.model.Votacion;
import es.uah.f1.model.VotacionPiloto;
import es.uah.f1.dao.IVotacionesDAO;
import es.uah.f1.dao.IVotacionPilotosDAO;
import es.uah.f1.dao.IPilotosDAO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.time.LocalDateTime;

@Service
public class VotacionesServiceImpl implements IVotacionesService {

    @Autowired
    IVotacionesDAO dao;

    @Autowired
    IVotacionPilotosDAO votacionPilotosDAO;

    @Autowired
    IPilotosDAO pilotosDAO;

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

    @Override
    public String crearVotacion(Votacion votacion, List<Integer> idsPilotos) {
        if (idsPilotos == null || idsPilotos.size() < 5 || idsPilotos.size() > 10) {
            return "Error: Una votación debe tener entre 5 y 10 pilotos candidatos.";
        }

        votacion.setFechaCreacion(LocalDateTime.now());
        votacion.setActivo(true);
        dao.guardar(votacion);

        for (Integer idPiloto : idsPilotos) {
            VotacionPiloto vp = new VotacionPiloto();
            vp.setVotacion(votacion);
            vp.setPiloto(pilotosDAO.buscarPilotoPorId(idPiloto));
            votacionPilotosDAO.guardar(vp);
        }

        return "OK";
    }
}