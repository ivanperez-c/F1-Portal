package es.uah.f1.controller;

import es.uah.f1.model.Rol;
import es.uah.f1.model.Usuario;
import es.uah.f1.service.IUsuariosService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/usuarios")
public class UsuariosController {

    @Autowired
    IUsuariosService service;

    @GetMapping
    public List<Usuario> buscarTodos() {
        return service.buscarTodos();
    }

    @GetMapping("/{id}")
    public Usuario buscarPorId(@PathVariable("id") Integer id) {
        return service.buscarPorId(id);
    }

    @PostMapping
    public void guardar(@RequestBody Usuario usuario) {
        service.guardar(usuario);
    }

    @PutMapping
    public void actualizar(@RequestBody Usuario usuario) {
        service.actualizar(usuario);
    }

    @DeleteMapping("/{id}")
    public void eliminar(@PathVariable("id") Integer id) {
        service.eliminar(id);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> credenciales) {
        String usuario = credenciales.get("usuario");
        String pass = credenciales.get("password");

        Usuario u = service.login(usuario, pass);

        if (u != null) {
            if (!u.getValidado()) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN)
                        .body("Usuario registrado pero pendiente de validación por un administrador.");
            }
            return ResponseEntity.ok(u);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Credenciales incorrectas.");
        }
    }

    @PostMapping("/registro")
    public void registrar(@RequestBody Map<String, String> credenciales) {
        Usuario u = new Usuario();
        u.setNombre(credenciales.get("nombre"));
        u.setUsuario(credenciales.get("usuario"));
        u.setEmail(credenciales.get("email"));
        u.setPasswdUsuario(credenciales.get("passwdUsuario"));
        u.setRol(Rol.responsable_equipo);
        service.registrarUsuario(u);
    }

    @GetMapping("/pendientes")
    public List<Usuario> buscarPendientes() {
        return service.buscarPendientes();
    }

    @PutMapping("/{id}/validar")
    public void validarUsuario(@PathVariable("id") Integer id, @RequestBody Map<String, String> rol) {
        service.validarUsuario(id, rol.get("role"));
    }
}