package es.uah.f1.service;

import es.uah.f1.dto.ResultadoCombustible;
import es.uah.f1.dto.ResultadoERS;

public interface ISimulacionService {
    ResultadoCombustible calcularCombustible(Integer idCoche, Integer idCircuito);
    ResultadoERS calcularERS(Integer idCoche, Integer idCircuito, String modo);
}
