package es.uah.f1.service;

import es.uah.f1.dao.IPilotosDAO;
import es.uah.f1.dao.IVotosEmitidosDAO;
import es.uah.f1.dao.IVotacionesDAO;
import es.uah.f1.model.Piloto;
import es.uah.f1.model.VotoEmitido;
import es.uah.f1.model.Votacion;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@Service
public class VotosEmitidosServiceImpl implements IVotosEmitidosService {
    @Autowired IVotosEmitidosDAO dao;

    @Autowired
    IVotacionesDAO votacionesDAO;

    @Autowired
    IPilotosDAO pilotosDAO;

    @Override public List<VotoEmitido> buscarTodos() { return dao.buscarTodos(); }
    @Override public VotoEmitido buscarPorId(Integer id) { return dao.buscarPorId(id); }
    @Override public void guardar(VotoEmitido voto) { dao.guardar(voto); }
    @Override public void eliminar(Integer id) { if(dao.buscarPorId(id)!=null) dao.eliminar(id); }
    @Override public void actualizar(VotoEmitido voto) { if(voto.getId()!=null) dao.actualizar(voto); }


    @Override
    public String registrarVoto(VotoEmitido voto) {

        Votacion votacion = votacionesDAO.buscarPorId(voto.getVotacion().getId());
        if (votacion == null) return "La votación no existe.";

        Piloto piloto = pilotosDAO.buscarPilotoPorId(voto.getPilotoVotado().getId());
        if (piloto == null) return "El piloto seleccionado no existe.";

        if (LocalDateTime.now().isAfter(votacion.getLimite())) {
            return "La votación está cerrada. Ya no se admiten votos.";
        }

        if (dao.yaHaVotado(voto.getEmailAficionado(), votacion.getId())) {
            return "Este email ya ha participado en esta votación.";
        }

        voto.setVotacion(votacion);
        voto.setPilotoVotado(piloto);
        voto.setFechaVoto(LocalDateTime.now());

        dao.guardar(voto);

        return "OK";
    }

    @Override
    public Map<String, Long> obtenerResultados(Integer idVotacion) {
        Votacion votacion = votacionesDAO.buscarPorId(idVotacion);

        if (votacion != null && LocalDateTime.now().isBefore(votacion.getLimite())) {
            return null;
        }

        List<Object[]> resultados = dao.obtenerResultados(idVotacion);
        Map<String, Long> mapaResultados = new HashMap<>();

        for (Object[] fila : resultados) {
            String piloto = (String) fila[0];
            Long votos = (Long) fila[1];
            mapaResultados.put(piloto, votos);
        }
        return mapaResultados;
    }
}