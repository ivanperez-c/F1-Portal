package es.uah.f1.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "equipo_responsables")
public class EquipoResponsable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "id_equipo", nullable = false)
    private Equipo equipo;

    @OneToOne
    @JoinColumn(name = "id_usuario", nullable = false, unique = true)
    private Usuario usuario;

    @Column(name = "fecha_asignacion", insertable = false, updatable = false)
    private LocalDateTime fechaAsignacion;

    public Integer getId() { return id; }
    public void setId(Integer id) { this.id = id; }
    public Equipo getEquipo() { return equipo; }
    public void setEquipo(Equipo equipo) { this.equipo = equipo; }
    public Usuario getUsuario() { return usuario; }
    public void setUsuario(Usuario usuario) { this.usuario = usuario; }
    public LocalDateTime getFechaAsignacion() { return fechaAsignacion; }
    public void setFechaAsignacion(LocalDateTime fechaAsignacion) { this.fechaAsignacion = fechaAsignacion; }
}
