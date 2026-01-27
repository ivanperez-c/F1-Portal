package es.uah.f1.service;

import es.uah.f1.dao.IEquipoResponsablesDAO;
import es.uah.f1.model.EquipoResponsable;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class EquipoResponsablesServiceImpl implements IEquipoResponsablesService {
    @Autowired IEquipoResponsablesDAO dao;

    @Override public List<EquipoResponsable> buscarTodos() { return dao.buscarTodos(); }
    @Override public EquipoResponsable buscarPorId(Integer id) { return dao.buscarPorId(id); }
    @Override public void guardar(EquipoResponsable er) { dao.guardar(er); }
    @Override public void eliminar(Integer id) { if(dao.buscarPorId(id)!=null) dao.eliminar(id); }
    @Override public void actualizar(EquipoResponsable er) { if(er.getId()!=null) dao.actualizar(er); }
}