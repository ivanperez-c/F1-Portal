package es.uah.f1.controller;

import es.uah.f1.model.VotoEmitido;
import es.uah.f1.service.IVotosEmitidosService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import org.springframework.http.ResponseEntity;
import java.util.Map;

@RestController
@RequestMapping("/api/votos-emitidos")
public class VotosEmitidosController {
    @Autowired IVotosEmitidosService service;

    @GetMapping public List<VotoEmitido> buscarTodos() { return service.buscarTodos(); }
    @GetMapping("/{id}") public VotoEmitido buscarPorId(@PathVariable Integer id) { return service.buscarPorId(id); }
    @PostMapping public void guardar(@RequestBody VotoEmitido voto) { service.guardar(voto); }
    @PutMapping public void actualizar(@RequestBody VotoEmitido voto) { service.actualizar(voto); }
    @DeleteMapping("/{id}") public void eliminar(@PathVariable Integer id) { service.eliminar(id); }

    @PostMapping("/votar")
    public ResponseEntity<?> votar(@RequestBody VotoEmitido voto) {
        String resultado = service.registrarVoto(voto);
        if ("OK".equals(resultado)) {
            return ResponseEntity.ok("Voto registrado correctamente.");
        } else {
            return ResponseEntity.badRequest().body(resultado);
        }
    }

    @GetMapping("/resultados/{idVotacion}")
    public ResponseEntity<?> verResultados(@PathVariable Integer idVotacion) {
        Map<String, Long> resultados = service.obtenerResultados(idVotacion);
        if (resultados == null) {
            return ResponseEntity.ok("La votación sigue en curso. Los resultados no son públicos aún.");
        }
        return ResponseEntity.ok(resultados);
    }
}
