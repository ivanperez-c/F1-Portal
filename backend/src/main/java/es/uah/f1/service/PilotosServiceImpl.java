package es.uah.f1.service;

import es.uah.f1.dao.IPilotosDAO;
import es.uah.f1.model.Piloto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class PilotosServiceImpl implements IPilotosService {

    @Autowired
    IPilotosDAO pilotosDAO;

    @Override
    public List<Piloto> buscarTodos() {
        return pilotosDAO.buscarTodos();
    }

    @Override
    public Piloto buscarPilotoPorId(Integer id) {
        return pilotosDAO.buscarPilotoPorId(id);
    }

    @Override
    public void guardarPiloto(Piloto piloto) {
        Piloto existente = pilotosDAO.buscarPorSiglas(piloto.getSiglas());

        if (existente != null) {
            if (piloto.getId() == null || !piloto.getId().equals(existente.getId())) {
                throw new ResponseStatusException(
                        HttpStatus.CONFLICT,
                        "Error: Las siglas '" + piloto.getSiglas() + "' ya están en uso por otro piloto."
                );
            }
        }

        pilotosDAO.guardarPiloto(piloto);
    }

    @Override
    public void eliminarPiloto(Integer id) {
        if (pilotosDAO.buscarPilotoPorId(id) != null) {
            pilotosDAO.eliminarPiloto(id);
        }
    }

    @Override
    public void actualizarPiloto(Piloto piloto) {
        if (piloto.getId() != null && pilotosDAO.buscarPilotoPorId(piloto.getId()) != null) {
            pilotosDAO.actualizarPiloto(piloto);
        }
    }

    @Override
    public List<Piloto> buscarPorEquipo(Integer idEquipo) {
        return pilotosDAO.buscarPorEquipo(idEquipo);
    }
}
