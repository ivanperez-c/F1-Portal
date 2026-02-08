package es.uah.f1.dto;

import es.uah.f1.model.EquipoResponsable;
import es.uah.f1.model.Usuario;

public class ResponsableDTO {
    private Integer id;
    private Integer idUsuario;
    private String nombreUsuario;
    private String emailUsuario;

    public ResponsableDTO(Usuario usuario) {
        if (usuario != null) {
            this.id = usuario.getId();
            this.idUsuario = usuario.getId();
            this.nombreUsuario = usuario.getNombre();
            this.emailUsuario = usuario.getEmail();
        }
    }

    public Integer getId() { return id; }
    public void setId(Integer id) { this.id = id; }
    public Integer getIdUsuario() { return idUsuario; }
    public void setIdUsuario(Integer idUsuario) { this.idUsuario = idUsuario; }
    public String getNombreUsuario() { return nombreUsuario; }
    public void setNombreUsuario(String nombreUsuario) { this.nombreUsuario = nombreUsuario; }
    public String getEmailUsuario() { return emailUsuario; }
    public void setEmailUsuario(String emailUsuario) { this.emailUsuario = emailUsuario; }
}