package es.uah.f1.dto;

import es.uah.f1.model.EquipoResponsable;

public class ResponsableDTO {
    private Integer id;
    private Integer idUsuario;
    private String nombreUsuario;
    private String emailUsuario;

    public ResponsableDTO(EquipoResponsable responsable) {
        this.id = responsable.getId();
        this.idUsuario = responsable.getUsuario().getId();
        this.nombreUsuario = responsable.getUsuario().getNombre(); // Assuming Usuario has nombre
        this.emailUsuario = responsable.getUsuario().getEmail(); // Assuming Usuario has email
    }

    // Getters and setters
    public Integer getId() { return id; }
    public void setId(Integer id) { this.id = id; }
    public Integer getIdUsuario() { return idUsuario; }
    public void setIdUsuario(Integer idUsuario) { this.idUsuario = idUsuario; }
    public String getNombreUsuario() { return nombreUsuario; }
    public void setNombreUsuario(String nombreUsuario) { this.nombreUsuario = nombreUsuario; }
    public String getEmailUsuario() { return emailUsuario; }
    public void setEmailUsuario(String emailUsuario) { this.emailUsuario = emailUsuario; }
}