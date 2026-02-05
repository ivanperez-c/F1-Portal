package es.uah.f1.dao;

import es.uah.f1.model.VotoEmitido;
import java.util.List;

public interface IVotosEmitidosDAO {
    List<VotoEmitido> buscarTodos();
    VotoEmitido buscarPorId(Integer id);
    void guardar(VotoEmitido votoEmitido);
    void eliminar(Integer id);
    void actualizar(VotoEmitido votoEmitido);
    boolean yaHaVotado(String email, Integer idVotacion);
    List<Object[]> obtenerResultados(Integer idVotacion);
    List<Object[]> contarVotosPorPilotoId(Integer idVotacion);
}
