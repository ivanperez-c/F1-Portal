package es.uah.f1.controller;

import es.uah.f1.model.Circuito;
import es.uah.f1.service.ICircuitosService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/circuitos")
public class CircuitosController {
    @Autowired ICircuitosService service;

    @GetMapping
    public List<Circuito> buscarTodos() { return service.buscarTodos(); }

    @GetMapping("/{id}")
    public Circuito buscarPorId(@PathVariable Integer id) { return service.buscarPorId(id); }

    @PostMapping
    public void guardar(@RequestBody Circuito circuito) { service.guardar(circuito); }

    @PutMapping
    public void actualizar(@RequestBody Circuito circuito) { service.actualizar(circuito); }

    @DeleteMapping("/{id}")
    public void eliminar(@PathVariable Integer id) { service.eliminar(id); }

    @GetMapping("/calendario")
    public List<Circuito> buscarCalendario() {
        return service.buscarCalendario();
    }
}