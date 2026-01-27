package es.uah.f1.service;

import es.uah.f1.dao.IVotosEmitidosDAO;
import es.uah.f1.model.VotoEmitido;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class VotosEmitidosServiceImpl implements IVotosEmitidosService {
    @Autowired IVotosEmitidosDAO dao;

    @Override public List<VotoEmitido> buscarTodos() { return dao.buscarTodos(); }
    @Override public VotoEmitido buscarPorId(Integer id) { return dao.buscarPorId(id); }
    @Override public void guardar(VotoEmitido voto) { dao.guardar(voto); }
    @Override public void eliminar(Integer id) { if(dao.buscarPorId(id)!=null) dao.eliminar(id); }
    @Override public void actualizar(VotoEmitido voto) { if(voto.getId()!=null) dao.actualizar(voto); }
}