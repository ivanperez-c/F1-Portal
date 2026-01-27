package es.uah.f1.controller;

import es.uah.f1.model.Votacion;
import es.uah.f1.service.IVotacionesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/votaciones")
public class VotacionesController {

    @Autowired
    IVotacionesService service;

    @GetMapping
    public List<Votacion> buscarTodas() {
        return service.buscarTodas();
    }

    @GetMapping("/{id}")
    public Votacion buscarPorId(@PathVariable("id") Integer id) {
        return service.buscarPorId(id);
    }

    @PostMapping
    public void guardar(@RequestBody Votacion votacion) {
        service.guardar(votacion);
    }

    @PutMapping
    public void actualizar(@RequestBody Votacion votacion) {
        service.actualizar(votacion);
    }

    @DeleteMapping("/{id}")
    public void eliminar(@PathVariable("id") Integer id) {
        service.eliminar(id);
    }
}