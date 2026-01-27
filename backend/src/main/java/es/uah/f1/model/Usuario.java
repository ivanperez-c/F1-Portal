package es.uah.f1.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "usuarios")
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false, length = 100)
    private String nombre;

    @Column(nullable = false, length = 50, unique = true)
    private String usuario;

    @Column(nullable = false, length = 100, unique = true)
    private String email;

    @Column(name = "passwdUsuario", nullable = false)
    private String passwdUsuario;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Rol rol;

    private Boolean validado;

    @Column(name = "fecha_registro", insertable = false, updatable = false)
    private LocalDateTime fechaRegistro;

    @Column(name = "fecha_validacion")
    private LocalDateTime fechaValidacion;

    @OneToMany(mappedBy = "usuarioCreador")
    @JsonIgnore
    private List<Equipo> equiposCreados;

    @OneToMany(mappedBy = "autor")
    @JsonIgnore
    private List<Noticia> noticias;

    @OneToMany(mappedBy = "creador")
    @JsonIgnore
    private List<Votacion> votaciones;

    public Integer getId() { return id; }
    public void setId(Integer id) { this.id = id; }
    public String getNombre() { return nombre; }
    public void setNombre(String nombre) { this.nombre = nombre; }
    public String getUsuario() { return usuario; }
    public void setUsuario(String usuario) { this.usuario = usuario; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public String getPasswdUsuario() { return passwdUsuario; }
    public void setPasswdUsuario(String passwdUsuario) { this.passwdUsuario = passwdUsuario; }
    public Rol getRol() { return rol; }
    public void setRol(Rol rol) { this.rol = rol; }
    public Boolean getValidado() { return validado; }
    public void setValidado(Boolean validado) { this.validado = validado; }
    public LocalDateTime getFechaRegistro() { return fechaRegistro; }
    public void setFechaRegistro(LocalDateTime fechaRegistro) { this.fechaRegistro = fechaRegistro; }
    public LocalDateTime getFechaValidacion() { return fechaValidacion; }
    public void setFechaValidacion(LocalDateTime fechaValidacion) { this.fechaValidacion = fechaValidacion; }
    public List<Equipo> getEquiposCreados() { return equiposCreados; }
    public void setEquiposCreados(List<Equipo> equiposCreados) { this.equiposCreados = equiposCreados; }
    public List<Noticia> getNoticias() { return noticias; }
    public void setNoticias(List<Noticia> noticias) { this.noticias = noticias; }
    public List<Votacion> getVotaciones() { return votaciones; }
    public void setVotaciones(List<Votacion> votaciones) { this.votaciones = votaciones; }
}
