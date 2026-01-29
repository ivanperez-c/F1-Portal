package es.uah.f1.dto;

public class ResultadoERS {
    private Double energiaRecuperadaPorVuelta;
    private Double vueltasParaCargaCompleta;
    private Double porcentajeRecuperado;
    private String modoConduccion;

    public ResultadoERS(Double energia, Double vueltas, Double porcentaje, String modo) {
        this.energiaRecuperadaPorVuelta = energia;
        this.vueltasParaCargaCompleta = vueltas;
        this.porcentajeRecuperado = porcentaje;
        this.modoConduccion = modo;
    }

    public Double getEnergiaRecuperadaPorVuelta() { return energiaRecuperadaPorVuelta; }
    public Double getVueltasParaCargaCompleta() { return vueltasParaCargaCompleta; }
    public Double getPorcentajeRecuperado() { return porcentajeRecuperado; }
    public String getModoConduccion() { return modoConduccion; }
}
