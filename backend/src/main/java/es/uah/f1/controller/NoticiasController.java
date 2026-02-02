package es.uah.f1.controller;

import es.uah.f1.model.Noticia;
import es.uah.f1.service.INoticiasService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/noticias")
public class NoticiasController {

    @Autowired
    INoticiasService service;

    @GetMapping
    public List<Noticia> buscarTodas() {
        return service.buscarTodas();
    }

    @GetMapping("/{id}")
    public Noticia buscarPorId(@PathVariable("id") Integer id) {
        return service.buscarPorId(id);
    }

    @GetMapping("/permalink/{permalink}")
    public Noticia buscarPorPermalink(@PathVariable("permalink") String permalink) { return service.buscarPorPermalink(permalink); }

    @GetMapping("/{permalink}/related")
    public List<Noticia> buscarRelacionadas(@PathVariable("permalink") String permalink) { return service.buscarRelacionadas(permalink); }

    @PostMapping
    public void guardar(@RequestBody Noticia noticia) {
        service.guardar(noticia);
    }

    @PutMapping
    public void actualizar(@RequestBody Noticia noticia) {
        service.actualizar(noticia);
    }

    @DeleteMapping("/{id}")
    public void eliminar(@PathVariable("id") Integer id) {
        service.eliminar(id);
    }
}