package es.uah.f1.controller;

import es.uah.f1.model.Equipo;
import es.uah.f1.service.IEquiposService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/circuitos")
public class CircuitosController {
    @Autowired IEquiposService service;

    @GetMapping
    public List<Equipo> buscarTodos() { return service.buscarTodos(); }

    @GetMapping("/{id}")
    public Equipo buscarPorId(@PathVariable Integer id) { return service.buscarPorId(id); }

    @PostMapping
    public void guardar(@RequestBody Equipo equipo) { service.guardar(equipo); }

    @PutMapping
    public void actualizar(@RequestBody Equipo equipo) { service.actualizar(equipo); }

    @DeleteMapping("/{id}")
    public void eliminar(@PathVariable Integer id) { service.eliminar(id); }
}