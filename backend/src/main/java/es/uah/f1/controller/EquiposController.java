package es.uah.f1.controller;

import es.uah.f1.model.Equipo;
import es.uah.f1.model.Usuario;
import es.uah.f1.service.IEquiposService;
import es.uah.f1.service.IUsuariosService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import es.uah.f1.dto.EquipoConPilotosDTO;

@RestController
@RequestMapping("/api/equipos")
public class EquiposController {
    @Autowired IEquiposService service;
    @Autowired
    IUsuariosService usuariosService;

    @GetMapping
    public List<EquipoConPilotosDTO> buscarTodos() {
        Integer currentUserId = getCurrentUserId();
        return service.buscarTodos()
                .stream()
                .map(equipo -> new EquipoConPilotosDTO(equipo, currentUserId))
                .toList();
    }

    @GetMapping("/{id}")
    public EquipoConPilotosDTO buscarPorId(
            @PathVariable Integer id,
            @RequestParam(required = false) Integer excludeUserId
    ) {
        System.out.println("DEBUG: excludeUserId from query param = " + excludeUserId);
        Equipo equipo = service.buscarPorId(id);
        return equipo != null ? new EquipoConPilotosDTO(equipo, excludeUserId) : null;
    }

    @PostMapping
    public ResponseEntity<Equipo> guardar(@RequestBody Equipo equipo) {
        Equipo nuevoEquipo = service.guardar(equipo);
        return ResponseEntity.status(HttpStatus.CREATED).body(nuevoEquipo);
    }

    @PutMapping
    public void actualizar(@RequestBody Equipo equipo) { service.actualizar(equipo); }

    @DeleteMapping("/{id}")
    public void eliminar(@PathVariable Integer id) { service.eliminar(id); }

    private Integer getCurrentUserId() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();

        if (auth != null && auth.isAuthenticated() && !"anonymousUser".equals(auth.getPrincipal())) {
            String username = auth.getName();
            Usuario usuario = usuariosService.buscarPorNombreUsuario(username); // You need this method
            return usuario != null ? usuario.getId() : null;
        }

        return null;
    }

}