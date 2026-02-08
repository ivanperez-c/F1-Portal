package es.uah.f1.service;

import es.uah.f1.model.Votacion;
import es.uah.f1.model.Usuario;
import es.uah.f1.dao.IUsuariosDAO;
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

    @Autowired
    IUsuariosDAO usuariosDAO;

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

        List<VotacionPiloto> candidatos = votacionPilotosDAO.buscarPorVotacion(votacion.getId());
        List<Integer> idsPilotos = candidatos.stream()
                .map(vp -> vp.getPiloto().getId())
                .collect(Collectors.toList());
        dto.setIdPilotos(idsPilotos);

        Map<Integer, Long> mapaVotos = new HashMap<>();

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
    public Votacion crearVotacion(Votacion votacion, List<Integer> idsPilotos, Integer idCreador) {

        if (idsPilotos == null || idsPilotos.size() < 5 || idsPilotos.size() > 10) {
            throw new IllegalArgumentException("Una votación debe tener entre 5 y 10 pilotos candidatos.");
        }

        if (idCreador == null) {
            throw new IllegalArgumentException("El ID del usuario creador es obligatorio.");
        }

        Usuario creador = usuariosDAO.buscarPorId(idCreador);

        if (creador == null) {
            throw new IllegalStateException("El usuario creador con ID " + idCreador + " no existe.");
        }

        votacion.setCreador(creador);
        votacion.setFechaCreacion(LocalDateTime.now());
        votacion.setActivo(true);

        dao.guardar(votacion);

        for (Integer idPiloto : idsPilotos) {
            VotacionPiloto vp = new VotacionPiloto();
            vp.setVotacion(votacion);
            vp.setPiloto(pilotosDAO.buscarPilotoPorId(idPiloto));
            votacionPilotosDAO.guardar(vp);
        }

        return votacion;
    }
}