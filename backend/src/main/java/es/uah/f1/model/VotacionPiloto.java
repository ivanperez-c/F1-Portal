package es.uah.f1.model;

import jakarta.persistence.*;

@Entity
@Table(name = "votacion_pilotos", uniqueConstraints = {
        @UniqueConstraint(columnNames = {"id_votacion", "id_piloto"})
})
public class VotacionPiloto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "id_votacion", nullable = false)
    private Votacion votacion;

    @ManyToOne
    @JoinColumn(name = "id_piloto", nullable = false)
    private Piloto piloto;

    public Integer getId() { return id; }
    public void setId(Integer id) { this.id = id; }
    public Votacion getVotacion() { return votacion; }
    public void setVotacion(Votacion votacion) { this.votacion = votacion; }
    public Piloto getPiloto() { return piloto; }
    public void setPiloto(Piloto piloto) { this.piloto = piloto; }
}