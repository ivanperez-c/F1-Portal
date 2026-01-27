package es.uah.f1.service;

import es.uah.f1.model.VotoEmitido;
import java.util.List;

public interface IVotosEmitidosService {
    List<VotoEmitido> buscarTodos();
    VotoEmitido buscarPorId(Integer id);
    void guardar(VotoEmitido voto);
    void eliminar(Integer id);
    void actualizar(VotoEmitido voto);
}
