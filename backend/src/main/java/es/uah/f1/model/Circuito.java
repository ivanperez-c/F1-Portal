package es.uah.f1.model;

import jakarta.persistence.*;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "circuitos")
public class Circuito {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false, length = 150, unique = true)
    private String nombre;

    @Column(nullable = false, length = 100)
    private String ciudad;

    @Column(nullable = false, length = 100)
    private String pais;

    private Boolean calendario;
    @Lob
    @Column(columnDefinition = "LONGTEXT")
    private String trazado;

    @Column(name = "numero_vueltas", nullable = false)
    private Integer numeroVueltas;

    @Column(nullable = false)
    private Integer longitud;

    @Column(name = "curvas_lentas", nullable = false)
    private Integer curvasLentas;

    @Column(name = "curvas_media", nullable = false)
    private Integer curvasMedia;

    @Column(name = "curvas_rapidas", nullable = false)
    private Integer curvasRapidas;

    @Column(name = "fecha_creacion", insertable = false, updatable = false)
    private LocalDateTime fechaCreacion;

    @Column(name = "fecha_carrera")
    private LocalDate fechaCarrera;

    public Integer getId() { return id; }
    public void setId(Integer id) { this.id = id; }
    public String getNombre() { return nombre; }
    public void setNombre(String nombre) { this.nombre = nombre; }
    public String getCiudad() { return ciudad; }
    public void setCiudad(String ciudad) { this.ciudad = ciudad; }
    public String getPais() { return pais; }
    public void setPais(String pais) { this.pais = pais; }
    public Boolean getCalendario() { return calendario; }
    public void setCalendario(Boolean calendario) { this.calendario = calendario; }
    public String getTrazado() { return trazado; }
    public void setTrazado(String trazado) { this.trazado = trazado; }
    public Integer getNumeroVueltas() { return numeroVueltas; }
    public void setNumeroVueltas(Integer numeroVueltas) { this.numeroVueltas = numeroVueltas; }
    public Integer getLongitud() { return longitud; }
    public void setLongitud(Integer longitud) { this.longitud = longitud; }
    public Integer getCurvasLentas() { return curvasLentas; }
    public void setCurvasLentas(Integer curvasLentas) { this.curvasLentas = curvasLentas; }
    public Integer getCurvasMedia() { return curvasMedia; }
    public void setCurvasMedia(Integer curvasMedia) { this.curvasMedia = curvasMedia; }
    public Integer getCurvasRapidas() { return curvasRapidas; }
    public void setCurvasRapidas(Integer curvasRapidas) { this.curvasRapidas = curvasRapidas; }
    public LocalDateTime getFechaCreacion() { return fechaCreacion; }
    public void setFechaCreacion(LocalDateTime fechaCreacion) { this.fechaCreacion = fechaCreacion; }
    public LocalDate getFechaCarrera() { return fechaCarrera; }
    public void setFechaCarrera(LocalDate fechaCarrera) { this.fechaCarrera = fechaCarrera; }
}
