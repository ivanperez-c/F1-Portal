package es.uah.f1.controller;

import es.uah.f1.model.VotoEmitido;
import es.uah.f1.service.IVotosEmitidosService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/votos-emitidos")
public class VotosEmitidosController {
    @Autowired IVotosEmitidosService service;

    @GetMapping public List<VotoEmitido> buscarTodos() { return service.buscarTodos(); }
    @GetMapping("/{id}") public VotoEmitido buscarPorId(@PathVariable Integer id) { return service.buscarPorId(id); }
    @PostMapping public void guardar(@RequestBody VotoEmitido voto) { service.guardar(voto); }
    @PutMapping public void actualizar(@RequestBody VotoEmitido voto) { service.actualizar(voto); }
    @DeleteMapping("/{id}") public void eliminar(@PathVariable Integer id) { service.eliminar(id); }
}
