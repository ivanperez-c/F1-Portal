package es.uah.f1.dto;

public class ResultadoCombustible {
    private Double consumoPorVuelta;
    private Double consumoTotal;
    private Integer vueltas;

    public ResultadoCombustible(Double porVuelta, Double total, Integer vueltas) {
        this.consumoPorVuelta = porVuelta;
        this.consumoTotal = total;
        this.vueltas = vueltas;
    }
    public Double getConsumoPorVuelta() { return consumoPorVuelta; }
    public Double getConsumoTotal() { return consumoTotal; }
    public Integer getVueltas() { return vueltas; }
}
