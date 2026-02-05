package es.uah.f1.service;

import es.uah.f1.dao.ICircuitosDAO;
import es.uah.f1.dao.ICochesDAO;
import es.uah.f1.dto.ResultadoCombustible;
import es.uah.f1.dto.ResultadoERS;
import es.uah.f1.model.Circuito;
import es.uah.f1.model.Coche;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SimulacionServiceImpl implements ISimulacionService {

    @Autowired ICochesDAO cochesDAO;
    @Autowired ICircuitosDAO circuitosDAO;

    private static final double CAPACIDAD_BATERIA_KWH = 1.20;
    private static final double LIMITE_RECUPERACION_VUELTA_KWH = 0.6;

    @Override
    public ResultadoCombustible calcularCombustible(Integer idCoche, Integer idCircuito) {
        Coche coche = cochesDAO.buscarPorId(idCoche);
        Circuito circuito = circuitosDAO.buscarPorId(idCircuito);

        if (coche == null || circuito == null) return null;

        double consumoMedioCoche = coche.getConsumo().doubleValue();
        double longitudCircuitoKm = circuito.getLongitud() / 1000.0;
        int totalVueltas = circuito.getNumeroVueltas();

        double consumoPorVuelta = (consumoMedioCoche * longitudCircuitoKm) / 100.0;

        double consumoTotal = consumoPorVuelta * totalVueltas;

        return new ResultadoCombustible(redondear(consumoPorVuelta), redondear(consumoTotal), totalVueltas);
    }

    @Override
    public ResultadoERS calcularERS(Integer idCoche, Integer idCircuito, String modo) {
        Coche coche = cochesDAO.buscarPorId(idCoche);
        Circuito circuito = circuitosDAO.buscarPorId(idCircuito);

        if (coche == null || circuito == null) return null;

        double recLenta = coche.getErsCurvaLenta().doubleValue() * circuito.getCurvasLentas();
        double recMedia = coche.getErsCurvaMedia().doubleValue() * circuito.getCurvasMedia();
        double recRapida = coche.getErsCurvaRapida().doubleValue() * circuito.getCurvasRapidas();

        double recuperacionBase = recLenta + recMedia + recRapida;

        double factorModo = 1.0;
        switch (modo.toUpperCase()) {
            case "AHORRADOR":
                factorModo = 1.05;
                break;
            case "NORMAL":
                factorModo = 0.75;
                break;
            case "DEPORTIVO":
                factorModo = 0.40;
                break;
            default:
                factorModo = 0.75;
        }

        double energiaPorVuelta = recuperacionBase * factorModo;

        if (energiaPorVuelta > LIMITE_RECUPERACION_VUELTA_KWH) {
            energiaPorVuelta = LIMITE_RECUPERACION_VUELTA_KWH;
        }

        double vueltasParaCarga = 0;
        if (energiaPorVuelta > 0) {
            vueltasParaCarga = CAPACIDAD_BATERIA_KWH / energiaPorVuelta;
        }

        double porcentaje = 0;
        if (CAPACIDAD_BATERIA_KWH > 0) {
            porcentaje = (energiaPorVuelta / CAPACIDAD_BATERIA_KWH) * 100;
        }

        return new ResultadoERS(redondear(energiaPorVuelta), redondear(vueltasParaCarga), redondear(porcentaje), modo);
    }

    private double redondear(double valor) {
        return Math.round(valor * 100.0) / 100.0;
    }
}