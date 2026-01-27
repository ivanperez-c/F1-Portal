package es.uah.f1.controller;

import es.uah.f1.model.Piloto;
import es.uah.f1.service.IPilotosService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/pilotos")
public class PilotosController {

    @Autowired
    IPilotosService pilotosService;

    @GetMapping
    public List<Piloto> buscarTodos() {
        return pilotosService.buscarTodos();
    }

    @GetMapping("/{id}")
    public Piloto buscarPilotoPorId(@PathVariable("id") Integer id) {
        return pilotosService.buscarPilotoPorId(id);
    }

    @PostMapping
    public void guardarPiloto(@RequestBody Piloto piloto) {
        pilotosService.guardarPiloto(piloto);
    }

    @PutMapping
    public void actualizarPiloto(@RequestBody Piloto piloto) {
        pilotosService.actualizarPiloto(piloto);
    }

    @DeleteMapping("/{id}")
    public void eliminarPiloto(@PathVariable("id") Integer id) {
        pilotosService.eliminarPiloto(id);
    }
}
