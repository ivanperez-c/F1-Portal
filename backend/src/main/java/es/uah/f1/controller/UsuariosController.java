package es.uah.f1.controller;

import es.uah.f1.model.Usuario;
import es.uah.f1.service.IUsuariosService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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
}