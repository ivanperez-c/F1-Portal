package es.uah.f1.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import es.uah.f1.model.Votacion;
import java.util.List;

public class VotacionRequest {

    @JsonProperty("votacion")
    private Votacion votacion;

    @JsonProperty("pilotosIds")
    private List<Integer> pilotosIds;

    public Votacion getVotacion() {
        return votacion;
    }

    public void setVotacion(Votacion votacion) {
        this.votacion = votacion;
    }

    public List<Integer> getPilotosIds() {
        return pilotosIds;
    }

    public void setPilotosIds(List<Integer> pilotosIds) {
        this.pilotosIds = pilotosIds;
    }
}
