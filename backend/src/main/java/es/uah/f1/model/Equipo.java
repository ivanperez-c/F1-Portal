package es.uah.f1.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "equipos")
public class Equipo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false, length = 100, unique = true)
    private String nombre;

    @Lob
    @Column(columnDefinition = "LONGTEXT")
    private String logo;

    @Column(length = 50)
    private String twitter;

    @ManyToOne
    @JoinColumn(name = "id_usuario_creador", nullable = false)
    @JsonIgnore
    private Usuario usuarioCreador;

    @Column(name = "fecha_creacion", updatable = false)
    @CreationTimestamp
    private LocalDateTime fechaCreacion;

    @OneToMany(mappedBy = "equipo")
    @JsonIgnore
    private List<Piloto> pilotos;

    @OneToMany(mappedBy = "equipo")
    @JsonIgnore
    private List<Coche> coches;

    @OneToMany(mappedBy = "equipo")
    @JsonIgnore  // Add this initially, we'll handle serialization in DTO
    private List<EquipoResponsable> responsables;

    // Add getter/setter
    public List<EquipoResponsable> getResponsables() { return responsables; }
    public void setResponsables(List<EquipoResponsable> responsables) { this.responsables = responsables; }

    public Integer getId() { return id; }
    public void setId(Integer id) { this.id = id; }
    public String getNombre() { return nombre; }
    public void setNombre(String nombre) { this.nombre = nombre; }
    public String getLogo() { return logo; }
    public void setLogo(String logo) { this.logo = logo; }
    public String getTwitter() { return twitter; }
    public void setTwitter(String twitter) { this.twitter = twitter; }
    public Usuario getUsuarioCreador() { return usuarioCreador; }
    public void setUsuarioCreador(Usuario usuarioCreador) { this.usuarioCreador = usuarioCreador; }
    public LocalDateTime getFechaCreacion() { return fechaCreacion; }
    public void setFechaCreacion(LocalDateTime fechaCreacion) { this.fechaCreacion = fechaCreacion; }
    public List<Piloto> getPilotos() { return pilotos; }
    public void setPilotos(List<Piloto> pilotos) { this.pilotos = pilotos; }
    public List<Coche> getCoches() { return coches; }
    public void setCoches(List<Coche> coches) { this.coches = coches; }


    @JsonProperty("id_usuario_creador")
    public void setIdUsuarioCreadorInt(Integer id) {
        if (id != null) {
            this.usuarioCreador = new Usuario();
            this.usuarioCreador.setId(id);
        }
    }
}
