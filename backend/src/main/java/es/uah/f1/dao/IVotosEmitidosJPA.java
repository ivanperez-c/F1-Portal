package es.uah.f1.dao;

import es.uah.f1.model.VotoEmitido;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface IVotosEmitidosJPA extends JpaRepository<VotoEmitido, Integer> {
    boolean existsByEmailAficionadoAndVotacionId(String email, Integer idVotacion);


    @Query("SELECT v.pilotoVotado.siglas, COUNT(v) " +
            "FROM VotoEmitido v " +
            "WHERE v.votacion.id = :idVotacion " +
            "GROUP BY v.pilotoVotado.siglas")
    List<Object[]> contarVotosPorVotacion(@Param("idVotacion") Integer idVotacion);

    @Query("SELECT v.pilotoVotado.id, COUNT(v) FROM VotoEmitido v WHERE v.votacion.id = :idVotacion GROUP BY v.pilotoVotado.id")
    List<Object[]> contarVotosPorPilotoId(@Param("idVotacion") Integer idVotacion);
}