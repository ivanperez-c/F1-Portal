package es.uah.f1.controller;

import es.uah.f1.model.VotacionPiloto;
import es.uah.f1.service.IVotacionPilotosService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/votacion-pilotos")
public class VotacionPilotosController {
    @Autowired IVotacionPilotosService service;

    @GetMapping public List<VotacionPiloto> buscarTodos() { return service.buscarTodos(); }
    @GetMapping("/{id}") public VotacionPiloto buscarPorId(@PathVariable Integer id) { return service.buscarPorId(id); }
    @PostMapping public void guardar(@RequestBody VotacionPiloto vp) { service.guardar(vp); }
    @PutMapping public void actualizar(@RequestBody VotacionPiloto vp) { service.actualizar(vp); }
    @DeleteMapping("/{id}") public void eliminar(@PathVariable Integer id) { service.eliminar(id); }
}
