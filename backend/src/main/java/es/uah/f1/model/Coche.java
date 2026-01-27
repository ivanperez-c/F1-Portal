package es.uah.f1.model;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "coches")
public class Coche {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false, length = 100)
    private String nombre;

    @Column(nullable = false, length = 50, unique = true)
    private String codigo;

    @ManyToOne
    @JoinColumn(name = "id_equipo", nullable = false)
    private Equipo equipo;

    @Column(name = "ers_curva_lenta", nullable = false, precision = 5, scale = 4)
    private BigDecimal ersCurvaLenta;

    @Column(name = "ers_curva_media", nullable = false, precision = 5, scale = 4)
    private BigDecimal ersCurvaMedia;

    @Column(name = "ers_curva_rapida", nullable = false, precision = 5, scale = 4)
    private BigDecimal ersCurvaRapida;

    @Column(nullable = false, precision = 5, scale = 2)
    private BigDecimal consumo;

    @Column(name = "fecha_creacion", insertable = false, updatable = false)
    private LocalDateTime fechaCreacion;

    private Boolean activo;

    public Integer getId() { return id; }
    public void setId(Integer id) { this.id = id; }
    public String getNombre() { return nombre; }
    public void setNombre(String nombre) { this.nombre = nombre; }
    public String getCodigo() { return codigo; }
    public void setCodigo(String codigo) { this.codigo = codigo; }
    public Equipo getEquipo() { return equipo; }
    public void setEquipo(Equipo equipo) { this.equipo = equipo; }
    public BigDecimal getErsCurvaLenta() { return ersCurvaLenta; }
    public void setErsCurvaLenta(BigDecimal ersCurvaLenta) { this.ersCurvaLenta = ersCurvaLenta; }
    public BigDecimal getErsCurvaMedia() { return ersCurvaMedia; }
    public void setErsCurvaMedia(BigDecimal ersCurvaMedia) { this.ersCurvaMedia = ersCurvaMedia; }
    public BigDecimal getErsCurvaRapida() { return ersCurvaRapida; }
    public void setErsCurvaRapida(BigDecimal ersCurvaRapida) { this.ersCurvaRapida = ersCurvaRapida; }
    public BigDecimal getConsumo() { return consumo; }
    public void setConsumo(BigDecimal consumo) { this.consumo = consumo; }
    public LocalDateTime getFechaCreacion() { return fechaCreacion; }
    public void setFechaCreacion(LocalDateTime fechaCreacion) { this.fechaCreacion = fechaCreacion; }
    public Boolean getActivo() { return activo; }
    public void setActivo(Boolean activo) { this.activo = activo; }
}