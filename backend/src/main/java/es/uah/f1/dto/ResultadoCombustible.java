package es.uah.f1.dto;

public class ResultadoCombustible {
    private Double consumoPorVuelta;
    private Double consumoTotal;

    public ResultadoCombustible(Double porVuelta, Double total) {
        this.consumoPorVuelta = porVuelta;
        this.consumoTotal = total;
    }
    public Double getConsumoPorVuelta() { return consumoPorVuelta; }
    public Double getConsumoTotal() { return consumoTotal; }
}
