-- ============================================
-- SCHEMA BASE DE DATOS PORTAL FORMULA 1
-- ============================================

DROP SCHEMA IF EXISTS f1_portal;
CREATE DATABASE IF NOT EXISTS f1_portal 
CHARACTER SET utf8 
COLLATE utf8_spanish_ci;

USE f1_portal;

-- ============================================
-- TABLA: usuarios
-- Gestión de todos los usuarios del sistema
-- ============================================
CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL COMMENT 'Nombre público del usuario',
    usuario VARCHAR(50) NOT NULL UNIQUE COMMENT 'Nombre de usuario único',
    email VARCHAR(100) NOT NULL UNIQUE COMMENT 'Email único',
    passwdUsuario VARCHAR(255) NOT NULL COMMENT 'Hash de contraseña (mínimo 5 caracteres en texto plano)',
    rol ENUM('responsable_equipo', 'administrador') NOT NULL COMMENT 'Rol del usuario',
    validado BOOLEAN DEFAULT FALSE COMMENT 'Indica si el admin ha validado al usuario',
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_validacion TIMESTAMP NULL,
    INDEX idx_email (email),
    INDEX idx_usuario (usuario),
    INDEX idx_validado (validado)
) ENGINE=InnoDB;

-- ============================================
-- TABLA: equipos
-- Escuderías de F1
-- ============================================
CREATE TABLE equipos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL UNIQUE COMMENT 'Nombre público del equipo',
    logo VARCHAR(255) COMMENT 'Ruta a la imagen del logo. Por ahora puesto como null',
    twitter VARCHAR(50) COMMENT 'Usuario de Twitter sin @',
    id_usuario_creador INT NOT NULL COMMENT 'Usuario que dio de alta el equipo. No puede repetir',
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_usuario_creador) REFERENCES usuarios(id) ON DELETE RESTRICT,
    INDEX idx_nombre (nombre)
) ENGINE=InnoDB;

-- ============================================
-- TABLA: equipo_responsables
-- Tabla intermedia: relación N:M entre equipos y responsables
-- Un usuario solo puede estar en 1 equipo
-- ============================================
CREATE TABLE equipo_responsables (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_equipo INT NOT NULL,
    id_usuario INT NOT NULL,
    fecha_asignacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_equipo) REFERENCES equipos(id) ON DELETE CASCADE,
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id) ON DELETE CASCADE,
    UNIQUE KEY uk_usuario_unico (id_usuario) COMMENT 'Un usuario solo puede pertenecer a 1 equipo',
    INDEX idx_equipo (id_equipo)
) ENGINE=InnoDB;

-- ============================================
-- TABLA: pilotos
-- Pilotos de F1
-- ============================================
CREATE TABLE pilotos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    apellidos VARCHAR(100) NOT NULL,
    siglas CHAR(3) NOT NULL UNIQUE COMMENT 'Máximo 3 letras, ej: HAM, ALO',
    dorsal TINYINT UNSIGNED NOT NULL COMMENT 'Número de dorsal único entre activos',
    foto VARCHAR(255) COMMENT 'Ruta a la foto del piloto',
    pais VARCHAR(100) NOT NULL,
    twitter VARCHAR(50) COMMENT 'Usuario de Twitter sin @',
    id_equipo INT NOT NULL,
    activo BOOLEAN DEFAULT TRUE COMMENT 'Controla si el piloto está activo para validar dorsal único',
    fecha_alta TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_equipo) REFERENCES equipos(id) ON DELETE RESTRICT,
    UNIQUE KEY uk_dorsal_activo (dorsal, activo) COMMENT 'Dorsal único solo entre pilotos activos',
    INDEX idx_equipo (id_equipo),
    INDEX idx_siglas (siglas)
) ENGINE=InnoDB;

-- ============================================
-- TABLA: circuitos
-- Circuitos de F1
-- ============================================
CREATE TABLE circuitos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(150) NOT NULL UNIQUE COMMENT 'Nombre público del circuito',
    ciudad VARCHAR(100) NOT NULL,
    pais VARCHAR(100) NOT NULL,
    calendario BOOLEAN,
    trazado VARCHAR(255) COMMENT 'Ruta a la imagen del trazado',
    numero_vueltas TINYINT UNSIGNED NOT NULL COMMENT 'Número de vueltas en carrera',
    longitud INT UNSIGNED NOT NULL COMMENT 'Longitud del trazado en metros',
    curvas_lentas TINYINT UNSIGNED NOT NULL DEFAULT 0,
    curvas_media TINYINT UNSIGNED NOT NULL DEFAULT 0,
    curvas_rapidas TINYINT UNSIGNED NOT NULL DEFAULT 0,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_carrera  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_nombre (nombre),
    INDEX idx_pais (pais)
) ENGINE=InnoDB;

-- ============================================
-- TABLA: coches
-- Monoplazas de cada equipo
-- ============================================
CREATE TABLE coches (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL COMMENT 'Nombre público, ej: Ferrari SF21',
    codigo VARCHAR(50) NOT NULL UNIQUE COMMENT 'Código interno único',
    id_equipo INT NOT NULL,
    ers_curva_lenta DECIMAL(5,4) NOT NULL COMMENT 'Ganancia en kWh (0.01 - 0.06)',
    ers_curva_media DECIMAL(5,4) NOT NULL COMMENT 'Ganancia en kWh (0.01 - 0.06)',
    ers_curva_rapida DECIMAL(5,4) NOT NULL COMMENT 'Ganancia en kWh (0.01 - 0.06)',
    consumo DECIMAL(5,2) NOT NULL COMMENT 'Consumo en L/100km (~34 de media)',
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    activo BOOLEAN DEFAULT TRUE,
    FOREIGN KEY (id_equipo) REFERENCES equipos(id) ON DELETE RESTRICT,
    INDEX idx_equipo (id_equipo),
    INDEX idx_codigo (codigo),
    CONSTRAINT chk_ers_lenta CHECK (ers_curva_lenta BETWEEN 0 AND 1),
    CONSTRAINT chk_ers_media CHECK (ers_curva_media BETWEEN 0 AND 1),
        CONSTRAINT chk_ers_rapida CHECK (ers_curva_rapida BETWEEN 0 AND 1)
) ENGINE=InnoDB;

-- ============================================
-- TABLA: noticias
-- Noticias del portal
-- ============================================
CREATE TABLE noticias (
    id INT AUTO_INCREMENT PRIMARY KEY,
    permalink VARCHAR(100) NOT NULL UNIQUE COMMENT 'URL permanente',
    titulo VARCHAR(100) NOT NULL,
    imagen VARCHAR(255) COMMENT 'Ruta a la imagen',
    texto TEXT NOT NULL COMMENT 'Contenido de la noticia (500-2000 caracteres)',
    id_autor INT NOT NULL COMMENT 'Administrador que creó la noticia',
    fecha_publicacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    activo BOOLEAN DEFAULT TRUE,
    FOREIGN KEY (id_autor) REFERENCES usuarios(id) ON DELETE RESTRICT,
    INDEX idx_permalink (permalink),
    INDEX idx_fecha (fecha_publicacion),
    CONSTRAINT chk_texto_length CHECK (CHAR_LENGTH(texto) BETWEEN 500 AND 2000)
) ENGINE=InnoDB;

-- ============================================
-- TABLA: votaciones
-- Votaciones del portal
-- ============================================
CREATE TABLE votaciones (
    id INT AUTO_INCREMENT PRIMARY KEY,
    permalink VARCHAR(100) NOT NULL UNIQUE COMMENT 'URL permanente',
    titulo VARCHAR(100) NOT NULL,
    descripcion VARCHAR(500) NOT NULL,
    limite DATETIME NOT NULL COMMENT 'Fecha y hora de cierre',
    id_creador INT NOT NULL COMMENT 'Administrador que creó la votación',
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    activo BOOLEAN DEFAULT TRUE,
    FOREIGN KEY (id_creador) REFERENCES usuarios(id) ON DELETE RESTRICT,
    INDEX idx_permalink (permalink),
    INDEX idx_limite (limite)
) ENGINE=InnoDB;

-- ============================================
-- TABLA: votacion_pilotos (N:M)
-- Pilotos disponibles en cada votación (5-10 pilotos)
-- ============================================
CREATE TABLE votacion_pilotos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_votacion INT NOT NULL,
    id_piloto INT NOT NULL,
    FOREIGN KEY (id_votacion) REFERENCES votaciones(id) ON DELETE CASCADE,
    FOREIGN KEY (id_piloto) REFERENCES pilotos(id) ON DELETE CASCADE,
    UNIQUE KEY uk_votacion_piloto (id_votacion, id_piloto),
    INDEX idx_votacion (id_votacion)
) ENGINE=InnoDB;

-- ============================================
-- TABLA: votos_emitidos
-- Votos de aficionados (1 voto por email)
-- ============================================
CREATE TABLE votos_emitidos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_votacion INT NOT NULL,
    nombre_aficionado VARCHAR(100) NOT NULL,
    email_aficionado VARCHAR(100) NOT NULL,
    id_piloto_votado INT NOT NULL,
    fecha_voto TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_votacion) REFERENCES votaciones(id) ON DELETE CASCADE,
    FOREIGN KEY (id_piloto_votado) REFERENCES pilotos(id) ON DELETE CASCADE,
    UNIQUE KEY uk_email_votacion (email_aficionado, id_votacion) COMMENT '1 voto por email en cada votación',
    INDEX idx_votacion (id_votacion),
    INDEX idx_email (email_aficionado)
) ENGINE=InnoDB;