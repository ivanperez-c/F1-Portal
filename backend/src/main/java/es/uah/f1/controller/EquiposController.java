package es.uah.f1.controller;

import es.uah.f1.model.Equipo;
import es.uah.f1.service.IEquiposService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import es.uah.f1.dto.EquipoConPilotosDTO;

@RestController
@RequestMapping("/api/equipos")
public class EquiposController {
    @Autowired IEquiposService service;

    /*
    @GetMapping
    public List<Equipo> buscarTodos() { return service.buscarTodos(); }
     */

    @GetMapping
    public List<EquipoConPilotosDTO> buscarTodos() {
        return service.buscarTodos()
                .stream()
                .map(EquipoConPilotosDTO::new)
                .toList();
    }

    @GetMapping("/{id}")
    public EquipoConPilotosDTO buscarPorId(@PathVariable Integer id) {
        Equipo equipo = service.buscarPorId(id);
        return equipo != null ? new EquipoConPilotosDTO(equipo) : null;
    }

    @PostMapping
    public void guardar(@RequestBody Equipo equipo) { service.guardar(equipo); }

    @PutMapping
    public void actualizar(@RequestBody Equipo equipo) { service.actualizar(equipo); }

    @DeleteMapping("/{id}")
    public void eliminar(@PathVariable Integer id) { service.eliminar(id); }
}