package es.uah.f1.controller;

import es.uah.f1.dto.ResultadoCombustible;
import es.uah.f1.dto.ResultadoERS;
import es.uah.f1.service.ISimulacionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/simulacion")
public class SimulacionController {

    @Autowired
    ISimulacionService service;

    @GetMapping("/combustible")
    public ResponseEntity<?> calcularCombustible(
            @RequestParam Integer idCoche,
            @RequestParam Integer idCircuito) {

        ResultadoCombustible res = service.calcularCombustible(idCoche, idCircuito);
        if (res == null) return ResponseEntity.badRequest().body("Coche o Circuito no encontrado");
        return ResponseEntity.ok(res);
    }

    @GetMapping("/ers")
    public ResponseEntity<?> calcularERS(
            @RequestParam Integer idCoche,
            @RequestParam Integer idCircuito,
            @RequestParam String modo) {

        ResultadoERS res = service.calcularERS(idCoche, idCircuito, modo);
        if (res == null) return ResponseEntity.badRequest().body("Coche o Circuito no encontrado");
        return ResponseEntity.ok(res);
    }
}
