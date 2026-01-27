package es.uah.f1.service;

import es.uah.f1.dao.IVotacionPilotosDAO;
import es.uah.f1.model.VotacionPiloto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class VotacionPilotosServiceImpl implements IVotacionPilotosService {
    @Autowired IVotacionPilotosDAO dao;

    @Override public List<VotacionPiloto> buscarTodos() { return dao.buscarTodos(); }
    @Override public VotacionPiloto buscarPorId(Integer id) { return dao.buscarPorId(id); }
    @Override public void guardar(VotacionPiloto vp) { dao.guardar(vp); }
    @Override public void eliminar(Integer id) { if(dao.buscarPorId(id)!=null) dao.eliminar(id); }
    @Override public void actualizar(VotacionPiloto vp) { if(vp.getId()!=null) dao.actualizar(vp); }
}
