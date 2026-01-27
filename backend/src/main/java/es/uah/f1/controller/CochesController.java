package es.uah.f1.controller;

import es.uah.f1.model.Coche;
import es.uah.f1.service.ICochesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/coches")
public class CochesController {

    @Autowired
    ICochesService service;

    @GetMapping
    public List<Coche> buscarTodos() {
        return service.buscarTodos();
    }

    @GetMapping("/{id}")
    public Coche buscarPorId(@PathVariable("id") Integer id) {
        return service.buscarPorId(id);
    }

    @PostMapping
    public void guardar(@RequestBody Coche coche) {
        service.guardar(coche);
    }

    @PutMapping
    public void actualizar(@RequestBody Coche coche) {
        service.actualizar(coche);
    }

    @DeleteMapping("/{id}")
    public void eliminar(@PathVariable("id") Integer id) {
        service.eliminar(id);
    }
}
