package es.uah.f1.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "votaciones")
public class Votacion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false, length = 100, unique = true)
    private String permalink;

    @Column(nullable = false, length = 100)
    private String titulo;

    @Column(nullable = false, length = 500)
    private String descripcion;

    @Column(nullable = false)
    private LocalDateTime limite;

    @ManyToOne
    @JoinColumn(name = "id_creador", nullable = false)
    private Usuario creador;

    @Column(name = "fecha_creacion", insertable = false, updatable = false)
    private LocalDateTime fechaCreacion;

    private Boolean activo;

    @OneToMany(mappedBy = "votacion")
    @JsonIgnore
    private List<VotacionPiloto> pilotosCandidatos;

    public Integer getId() { return id; }
    public void setId(Integer id) { this.id = id; }
    public String getPermalink() { return permalink; }
    public void setPermalink(String permalink) { this.permalink = permalink; }
    public String getTitulo() { return titulo; }
    public void setTitulo(String titulo) { this.titulo = titulo; }
    public String getDescripcion() { return descripcion; }
    public void setDescripcion(String descripcion) { this.descripcion = descripcion; }
    public LocalDateTime getLimite() { return limite; }
    public void setLimite(LocalDateTime limite) { this.limite = limite; }
    public Usuario getCreador() { return creador; }
    public void setCreador(Usuario creador) { this.creador = creador; }
    public LocalDateTime getFechaCreacion() { return fechaCreacion; }
    public void setFechaCreacion(LocalDateTime fechaCreacion) { this.fechaCreacion = fechaCreacion; }
    public Boolean getActivo() { return activo; }
    public void setActivo(Boolean activo) { this.activo = activo; }
    public List<VotacionPiloto> getPilotosCandidatos() { return pilotosCandidatos; }
    public void setPilotosCandidatos(List<VotacionPiloto> pilotosCandidatos) { this.pilotosCandidatos = pilotosCandidatos; }
}