package es.uah.f1.controller;

import es.uah.f1.model.Votacion;
import es.uah.f1.service.IVotacionesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import es.uah.f1.dto.VotacionDetalleDTO;
import es.uah.f1.dto.VotacionRequest;
import java.util.List;

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

    @PostMapping("/crear-con-pilotos")
    public ResponseEntity<?> crearCompleta(@RequestBody VotacionRequest request) {

        try {
            Votacion votacion = service.crearVotacion(
                    request.getVotacion(),
                    request.getPilotosIds(),
                    request.getIdUsuarioCreador()
            );

            VotacionDetalleDTO dto = service.buscarPorId(votacion.getId());

            return ResponseEntity.ok(dto);

        } catch (IllegalArgumentException | IllegalStateException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

}
