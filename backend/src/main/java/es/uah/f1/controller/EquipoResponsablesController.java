package es.uah.f1.controller;

import es.uah.f1.model.EquipoResponsable;
import es.uah.f1.service.IEquipoResponsablesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/equipo-responsables")
public class EquipoResponsablesController {
    @Autowired IEquipoResponsablesService service;

    @GetMapping public List<EquipoResponsable> buscarTodos() { return service.buscarTodos(); }
    @GetMapping("/{id}") public EquipoResponsable buscarPorId(@PathVariable Integer id) { return service.buscarPorId(id); }
    @PostMapping public void guardar(@RequestBody EquipoResponsable er) { service.guardar(er); }
    @PutMapping public void actualizar(@RequestBody EquipoResponsable er) { service.actualizar(er); }
    @DeleteMapping("/{id}") public void eliminar(@PathVariable Integer id) { service.eliminar(id); }
}