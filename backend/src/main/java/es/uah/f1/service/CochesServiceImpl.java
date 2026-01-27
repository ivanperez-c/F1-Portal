package es.uah.f1.service;

import es.uah.f1.dao.ICochesDAO;
import es.uah.f1.model.Coche;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class CochesServiceImpl implements ICochesService {

    @Autowired
    ICochesDAO dao;

    @Override
    public List<Coche> buscarTodos() { return dao.buscarTodos(); }

    @Override
    public Coche buscarPorId(Integer id) { return dao.buscarPorId(id); }

    @Override
    public void guardar(Coche coche) {
        if (coche.getCodigo() != null && coche.getEquipo() != null) {
            dao.guardar(coche);
        }
    }

    @Override
    public void eliminar(Integer id) {
        if (dao.buscarPorId(id) != null) dao.eliminar(id);
    }

    @Override
    public void actualizar(Coche coche) {
        if (coche.getId() != null && dao.buscarPorId(coche.getId()) != null) {
            dao.actualizar(coche);
        }
    }
}