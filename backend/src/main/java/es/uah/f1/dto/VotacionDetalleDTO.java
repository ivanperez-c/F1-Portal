package es.uah.f1.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

public class VotacionDetalleDTO {

    private Integer id;
    private String titulo;
    private String descripcion;
    private LocalDateTime limite;

    @JsonProperty("id_pilotos")
    private List<Integer> idPilotos;

    private Map<Integer, Long> votos;

    public VotacionDetalleDTO() {}

    public Integer getId() { return id; }
    public void setId(Integer id) { this.id = id; }
    public String getTitulo() { return titulo; }
    public void setTitulo(String titulo) { this.titulo = titulo; }
    public String getDescripcion() { return descripcion; }
    public void setDescripcion(String descripcion) { this.descripcion = descripcion; }
    public LocalDateTime getLimite() { return limite; }
    public void setLimite(LocalDateTime limite) { this.limite = limite; }
    public List<Integer> getIdPilotos() { return idPilotos; }
    public void setIdPilotos(List<Integer> idPilotos) { this.idPilotos = idPilotos; }
    public Map<Integer, Long> getVotos() { return votos; }
    public void setVotos(Map<Integer, Long> votos) { this.votos = votos; }
}