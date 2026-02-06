package es.uah.f1.dao;

import es.uah.f1.model.Equipo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;

public interface IEquiposJPA extends JpaRepository<Equipo, Integer> {
    @Query("SELECT DISTINCT e FROM Equipo e LEFT JOIN FETCH e.pilotos")
    List<Equipo> findAllWithPilotos();

    @Query("SELECT DISTINCT e FROM Equipo e LEFT JOIN FETCH e.pilotos WHERE e.id = :id")
    Equipo findByIdWithPilotos(@Param("id") Integer id);

    @Query("""
        SELECT DISTINCT e
        FROM Equipo e
        LEFT JOIN FETCH e.coches
        WHERE e IN :equipos
    """)
    List<Equipo> fetchCochesForEquipos(@Param("equipos") List<Equipo> equipos);

    @Query("""
        SELECT DISTINCT e
        FROM Equipo e
        LEFT JOIN FETCH e.coches
        WHERE e = :equipo
    """)
    Equipo fetchCochesForEquipo(@Param("equipo") Equipo equipo);

    @Query("""
        SELECT DISTINCT e
        FROM Equipo e
        LEFT JOIN FETCH e.usuarioCreador
        WHERE e IN :equipos
    """)
    List<Equipo> fetchUsuariosForEquipos(@Param("equipos") List<Equipo> equipos);

    @Query("""
        SELECT e
        FROM Equipo e
        LEFT JOIN FETCH e.usuarioCreador
        WHERE e = :equipo
    """)
    Equipo fetchUsuariosForEquipo(@Param("equipo") Equipo equipo);

    Equipo findByUsuarioCreadorId(Integer idUsuario);

    // PRUEBAS FETCH RESPONSABLES

    @Query("""
        SELECT DISTINCT e
        FROM Equipo e
        LEFT JOIN FETCH e.responsables r
        LEFT JOIN FETCH r.usuario
        WHERE e IN :equipos
    """)
    List<Equipo> fetchResponsablesForEquipos(@Param("equipos") List<Equipo> equipos);

    @Query("""
        SELECT DISTINCT e
        FROM Equipo e
        LEFT JOIN FETCH e.responsables r
        LEFT JOIN FETCH r.usuario
        WHERE e = :equipo
    """)
    Equipo fetchResponsablesForEquipo(@Param("equipo") Equipo equipo);
}