package es.uah.f1.dao;

import es.uah.f1.model.EquipoResponsable;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public class EquipoResponsablesDAOImpl implements IEquipoResponsablesDAO {

    @Autowired
    IEquipoResponsablesJPA jpa;

    @Override
    public List<EquipoResponsable> buscarTodos() {
        return jpa.findAll();
    }

    @Override
    public EquipoResponsable buscarPorId(Integer id) {
        return jpa.findById(id).orElse(null);
    }

    @Override
    public void guardar(EquipoResponsable equipoResponsable) {
        jpa.save(equipoResponsable);
    }

    @Override
    public void eliminar(Integer id) {
        jpa.deleteById(id);
    }

    @Override
    public void actualizar(EquipoResponsable equipoResponsable) {
        jpa.save(equipoResponsable);
    }
}