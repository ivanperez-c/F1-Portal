package es.uah.f1.controller;

import es.uah.f1.model.Votacion;
import es.uah.f1.service.IVotacionesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import es.uah.f1.dto.VotacionDetalleDTO;
import es.uah.f1.dto.VotacionRequest;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/votaciones")
public class VotacionesController {

    @Autowired
    IVotacionesService service;

    @GetMapping
    public List<VotacionDetalleDTO> buscarTodas() {
        return service.buscarTodas();
    }

    @GetMapping("/{id}")
    public ResponseEntity<VotacionDetalleDTO> buscarPorId(@PathVariable("id") Integer id) {
        VotacionDetalleDTO dto = service.buscarPorId(id);
        if (dto != null) {
            return ResponseEntity.ok(dto);
        } else {
            return ResponseEntity.notFound().build();
        }
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

    /*
    public static class VotacionRequest {
        public Votacion votacion;
        public List<Integer> pilotosIds;
    }

    @PostMapping("/crear-con-pilotos")
    public ResponseEntity<?> crearCompleta(@RequestBody VotacionRequest request) {
        String resultado = service.crearVotacion(request.votacion, request.pilotosIds);
        if ("OK".equals(resultado)) {
            return ResponseEntity.ok("Votación creada con éxito.");
        } else {
            return ResponseEntity.badRequest().body(resultado);
        }
    }
     */

    @PostMapping("/crear-con-pilotos")
    public ResponseEntity<VotacionDetalleDTO> crearCompleta(
            @RequestBody VotacionRequest request) {

        try {
            Votacion votacion = service.crearVotacion(
                    request.getVotacion(),
                    request.getPilotosIds()
            );

            VotacionDetalleDTO dto = service.buscarPorId(votacion.getId());
            return ResponseEntity.ok(dto);

        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().build();
        }
    }

}
