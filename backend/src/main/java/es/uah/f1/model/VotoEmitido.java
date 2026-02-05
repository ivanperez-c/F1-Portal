package es.uah.f1.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "votos_emitidos", uniqueConstraints = {
        @UniqueConstraint(columnNames = {"email_aficionado", "id_votacion"})
})
public class VotoEmitido {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "id_votacion", nullable = false)
    private Votacion votacion;

    @JsonProperty("nombreAficionado")
    @Column(name = "nombre_aficionado", nullable = false, length = 100)
    private String nombreAficionado;

    @JsonProperty("emailAficionado")
    @Column(name = "email_aficionado", nullable = false, length = 100)
    private String emailAficionado;

    @JsonProperty("pilotoVotado")
    @ManyToOne
    @JoinColumn(name = "id_piloto_votado", nullable = false)
    private Piloto pilotoVotado;

    @Column(name = "fecha_voto", insertable = false, updatable = false)
    private LocalDateTime fechaVoto;

    public Integer getId() { return id; }
    public void setId(Integer id) { this.id = id; }
    public Votacion getVotacion() { return votacion; }
    public void setVotacion(Votacion votacion) { this.votacion = votacion; }
    public String getNombreAficionado() { return nombreAficionado; }
    public void setNombreAficionado(String nombreAficionado) { this.nombreAficionado = nombreAficionado; }
    public String getEmailAficionado() { return emailAficionado; }
    public void setEmailAficionado(String emailAficionado) { this.emailAficionado = emailAficionado; }
    public Piloto getPilotoVotado() { return pilotoVotado; }
    public void setPilotoVotado(Piloto pilotoVotado) { this.pilotoVotado = pilotoVotado; }
    public LocalDateTime getFechaVoto() { return fechaVoto; }
    public void setFechaVoto(LocalDateTime fechaVoto) { this.fechaVoto = fechaVoto; }
}
