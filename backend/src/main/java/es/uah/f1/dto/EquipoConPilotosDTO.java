package es.uah.f1.dto;

import es.uah.f1.model.Coche;
import es.uah.f1.model.Equipo;
import es.uah.f1.model.EquipoResponsable;
import es.uah.f1.model.Piloto;
import java.util.List;
import java.util.stream.Collectors;

public class EquipoConPilotosDTO {
    private Integer id;
    private String nombre;
    private String logo;
    private String twitter;
    private List<Piloto> pilotos;
    private List<Coche> coches;
    private  List<ResponsableDTO> responsables;

    public EquipoConPilotosDTO(Equipo equipo) {
        this.id = equipo.getId();
        this.nombre = equipo.getNombre();
        this.logo = equipo.getLogo();
        this.twitter = equipo.getTwitter();
        this.pilotos = equipo.getPilotos();
        this.coches = equipo.getCoches();
        this.responsables = equipo.getResponsables() != null
            ? equipo.getResponsables().stream()
                .map(ResponsableDTO::new)
                .collect(Collectors.toList())
            : List.of();
    }

    // Getters and setters

    public List<ResponsableDTO> getResponsables() {
        return responsables;
    }

    public void setResponsables(List<ResponsableDTO> responsables) {
        this.responsables = responsables;
    }

    public Integer getId() { return id; }
    public void setId(Integer id) { this.id = id; }
    public String getNombre() { return nombre; }
    public void setNombre(String nombre) { this.nombre = nombre; }
    public String getLogo() { return logo; }
    public void setLogo(String logo) { this.logo = logo; }
    public String getTwitter() { return twitter; }
    public void setTwitter(String twitter) { this.twitter = twitter; }
    public List<Piloto> getPilotos() { return pilotos; }
    public void setPilotos(List<Piloto> pilotos) { this.pilotos = pilotos; }
    public List<Coche> getCoches() { return coches; }
    public void setCoches(List<Coche> coches) {  this.coches = coches; }
}