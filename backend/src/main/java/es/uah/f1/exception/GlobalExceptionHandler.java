package es.uah.f1.exception;

import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {

    // 1. Capturar errores lógicos (los que lanzas tú con "throw new RuntimeException")
    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<String> handleRuntimeException(RuntimeException ex) {
        // Devuelve 400 Bad Request y el mensaje que escribiste en el servicio
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(ex.getMessage());
    }

    // 2. Capturar errores de Base de Datos (Claves duplicadas, Foreign Keys...)
    @ExceptionHandler(DataIntegrityViolationException.class)
    public ResponseEntity<String> handleDatabaseError(DataIntegrityViolationException ex) {
        return ResponseEntity.status(HttpStatus.CONFLICT).body("Error de integridad en base de datos. Verifica que los IDs existen o que no estás duplicando datos únicos.");
    }

    // 3. Capturar errores de JSON mal formado (Fechas mal puestas, comas que faltan...)
    @ExceptionHandler(HttpMessageNotReadableException.class)
    public ResponseEntity<String> handleJsonError(HttpMessageNotReadableException ex) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("El JSON enviado tiene un formato incorrecto. Revisa fechas y tipos de datos.");
    }

    // 4. Capturar cualquier otro error inesperado (NullPointer, etc.)
    @ExceptionHandler(Exception.class)
    public ResponseEntity<Map<String, String>> handleGeneralError(Exception ex) {
        Map<String, String> error = new HashMap<>();
        error.put("error", "Error interno del servidor");
        error.put("detalle", ex.getMessage());
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
    }
}