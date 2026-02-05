package es.uah.f1.service;

import es.uah.f1.model.Votacion;
import es.uah.f1.model.VotacionPiloto;
import es.uah.f1.dao.IVotacionesDAO;
import es.uah.f1.dao.IVotacionPilotosDAO;
import es.uah.f1.dao.IVotosEmitidosDAO;
import es.uah.f1.dao.IPilotosDAO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.time.LocalDateTime;
import java.util.Map;
import java.util.HashMap;
import java.util.stream.Collectors;
import es.uah.f1.dto.VotacionDetalleDTO;


@Service
public class VotacionesServiceImpl implements IVotacionesService {

    @Autowired
    IVotacionesDAO dao;

    @Autowired
    IVotacionPilotosDAO votacionPilotosDAO;

    @Autowired
    IPilotosDAO pilotosDAO;

    @Autowired
    IVotosEmitidosDAO votosEmitidosDAO;

    @Override
    public List<VotacionDetalleDTO> buscarTodas() {
        List<Votacion> entidades = dao.buscarTodas();
        return entidades.stream()
                .map(this::convertirADTO)
                .collect(Collectors.toList());
    }

    @Override
    public VotacionDetalleDTO buscarPorId(Integer id) {
        Votacion entidad = dao.buscarPorId(id);
        if (entidad == null) return null;
        return convertirADTO(entidad);
    }

    private VotacionDetalleDTO convertirADTO(Votacion votacion) {
        VotacionDetalleDTO dto = new VotacionDetalleDTO();
        dto.setId(votacion.getId());
        dto.setTitulo(votacion.getTitulo());
        dto.setDescripcion(votacion.getDescripcion());
        dto.setLimite(votacion.getLimite());

        // 1. Obtener IDs de pilotos candidatos
        List<VotacionPiloto> candidatos = votacionPilotosDAO.buscarPorVotacion(votacion.getId());
        // Nota: Asegúrate de tener implementado buscarPorVotacion en tu DAO
        List<Integer> idsPilotos = candidatos.stream()
                .map(vp -> vp.getPiloto().getId())
                .collect(Collectors.toList());
        dto.setIdPilotos(idsPilotos);

        // 2. Calcular Votos (Solo si ya pasó la fecha)
        Map<Integer, Long> mapaVotos = new HashMap<>();

        // Inicializar a 0
        for(Integer idPiloto : idsPilotos) {
            mapaVotos.put(idPiloto, 0L);
        }

        if (LocalDateTime.now().isAfter(votacion.getLimite())) {
            List<Object[]> resultados = votosEmitidosDAO.contarVotosPorPilotoId(votacion.getId());
            for (Object[] fila : resultados) {
                Integer idPiloto = (Integer) fila[0];
                Long cantidad = (Long) fila[1];
                mapaVotos.put(idPiloto, cantidad);
            }
        }

        dto.setVotos(mapaVotos);
        return dto;
    }

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