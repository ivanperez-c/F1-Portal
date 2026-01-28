-- ============================================
-- SCRIPT DE POBLACIÓN DE DATOS - PORTAL F1
-- ============================================

USE f1_portal;

SET FOREIGN_KEY_CHECKS = 0;

-- NOTA: los campos null deben ser rellenados con PATHs de imagenes.

-- ============================================
-- PASO 1: CREAR USUARIO ADMINISTRADOR INICIAL
-- ============================================
INSERT INTO usuarios 
(nombre, usuario, email, passwdUsuario, rol, validado, fecha_validacion) 
VALUES
('Administrador Sistema', 'admin', 'admin@f1portal.com', 'admin123', 'administrador', TRUE, NOW());

-- ============================================
-- PASO 2: INSERTAR EQUIPOS
-- ============================================
INSERT INTO equipos (nombre, logo, twitter, id_usuario_creador) VALUES
('McLaren Mastercard Formula 1 Team', NULL, 'McLarenF1', 1),
('Mercedes-AMG PETRONAS Formula One Team', NULL, 'MercedesAMGF1', 1),
('Oracle Red Bull Racing', NULL, 'redbullracing', 1),
('Scuderia Ferrari HP', NULL, 'ScuderiaFerrari', 1),
('Atlassian Williams F1 Team', NULL, 'WilliamsF1', 1),
('Visa Cash App Racing Bulls Formula One Team', NULL, 'visacashapprb', 1),
('Aston Martin Aramco Formula One Team', NULL, 'AstonMartinF1', 1),
('TGR Haas F1 Team', NULL, 'HaasF1Team', 1),
('BWT Alpine Formula One Team', NULL, 'AlpineF1Team', 1),
('Audi Revolut F1 Team', NULL, 'stakef1team_ks', 1),
('Cadillac Formula 1 Team', NULL, 'Cadillac_F1', 1);

-- ============================================
-- PASO 3: INSERTAR PILOTOS
-- ============================================
INSERT INTO pilotos 
(nombre, apellidos, siglas, dorsal, foto, pais, twitter, id_equipo, activo) VALUES
('Lando', 'Norris', 'NOR', 1, NULL, 'Reino Unido', 'LandoNorris', 1, TRUE),
('Oscar', 'Piastri', 'PIA', 81, NULL, 'Australia', 'OscarPiastri', 1, TRUE),

('George', 'Russell', 'RUS', 63, NULL, 'Reino Unido', 'GeorgeRussell63', 2, TRUE),
('Andrea Kimi', 'Antonelli', 'ANT', 12, NULL, 'Italia', NULL, 2, TRUE),

('Max', 'Verstappen', 'VER', 3, NULL, 'Países Bajos', 'Max33Verstappen', 3, TRUE),
('Isack', 'Hadjar', 'HAD', 6, NULL, 'Francia', 'Isack_Hadjar', 3, TRUE),

('Charles', 'Leclerc', 'LEC', 16, NULL, 'Mónaco', 'Charles_Leclerc', 4, TRUE),
('Lewis', 'Hamilton', 'HAM', 44, NULL, 'Reino Unido', 'LewisHamilton', 4, TRUE),

('Alexander', 'Albon', 'ALB', 23, NULL, 'Tailandia', 'alex_albon', 5, TRUE),
('Carlos', 'Sainz Jr.', 'SAI', 55, NULL, 'España', 'Carlossainz55', 5, TRUE),

('Liam', 'Lawson', 'LAW', 30, NULL, 'Nueva Zelanda', 'LiamLawson30', 6, TRUE),
('Arvid', 'Lindblad', 'LIN', 41, NULL, 'Reino Unido', NULL, 6, TRUE),

('Fernando', 'Alonso', 'ALO', 14, NULL, 'España', 'alo_oficial', 7, TRUE),
('Lance', 'Stroll', 'STR', 18, NULL, 'Canadá', 'lance_stroll', 7, TRUE),

('Esteban', 'Ocon', 'OCO', 31, NULL, 'Francia', 'OconEsteban', 8, TRUE),
('Oliver', 'Bearman', 'OBE', 87, NULL, 'Reino Unido', 'OllieBearman', 8, TRUE),

('Pierre', 'Gasly', 'GAS', 10, NULL, 'Francia', 'PierreGASLY', 9, TRUE),
('Franco', 'Colapinto', 'COL', 43, NULL, 'Argentina', 'FranColapinto', 9, TRUE),

('Nico', 'Hülkenberg', 'HUL', 27, NULL, 'Alemania', 'HulkHulkenberg', 10, TRUE),
('Gabriel', 'Bortoleto', 'BOR', 5, NULL, 'Brasil', 'gabortoleto85', 10, TRUE),

('Sergio', 'Pérez', 'PER', 11, NULL, 'México', 'SChecoPerez', 11, TRUE),
('Valtteri', 'Bottas', 'BOT', 77, NULL, 'Finlandia', 'ValtteriBottas', 11, TRUE);

-- ============================================
-- PASO 4: INSERTAR CIRCUITOS
-- ============================================
INSERT INTO circuitos 
(nombre, ciudad, pais, calendario, trazado, numero_vueltas, longitud, curvas_lentas, curvas_media, curvas_rapidas, fecha_carrera) VALUES
('Albert Park', 'Melbourne', 'Australia', true, NULL, 58, 5278, 3, 5, 6, '2026-03-08'),
('Shanghai International Circuit', 'Shanghai', 'China', true, NULL, 56, 5451, 5, 7, 4, '2026-03-15'),
('Suzuka Circuit', 'Suzuka', 'Japón', true, NULL, 53, 5807, 2, 8, 8, '2026-03-29'),
('Bahrain International Circuit', 'Sakhir', 'Bahrain', true, NULL, 57, 5412, 3, 8, 4, '2026-04-12'),
('Jeddah Corniche Circuit', 'Jeddah', 'Arabia Saudí', true, NULL, 50, 6174, 2, 10, 15, '2026-04-19'),
('Miami International Autodrome', 'Miami Gardens', 'EE. UU.', true, NULL, 57, 5412, 5, 8, 6, '2026-05-03'),
('Circuit Gilles Villeneuve', 'Montreal', 'Canadá', true, NULL, 70, 4361, 4, 8, 2, '2026-05-24'),
('Circuit de Monaco', 'Mónaco', 'Mónaco', true, NULL, 78, 3337, 10, 9, 0, '2026-06-07'),
('Circuit de Barcelona-Catalunya', 'Montmeló', 'España', true, NULL, 66, 4657, 4, 6, 4, '2026-06-14'),
('Red Bull Ring', 'Spielberg', 'Austria', true, NULL, 71, 4326, 3, 3, 4, '2026-06-28'),
('Silverstone Circuit', 'Silverstone', 'Reino Unido', true, NULL, 52, 5891, 4, 5, 9, '2026-07-05'),
('Circuit de Spa-Francorchamps', 'Spa', 'Bélgica', true, NULL, 44, 7004, 3, 8, 8, '2026-07-19'),
('Hungaroring', 'Budapest', 'Hungría', true, NULL, 70, 4381, 6, 6, 2, '2026-07-26'),
('Circuit Zandvoort', 'Zandvoort', 'Países Bajos', true, NULL, 72, 4259, 4, 6, 4, '2026-08-23'),
('Autodromo Nazionale di Monza', 'Monza', 'Italia', true, NULL, 53, 5793, 3, 5, 3, '2026-09-06'),
('Madrid Street Circuit', 'Madrid', 'España', true, NULL, 57, 5474, 7, 8, 5, '2026-09-13'),
('Baku City Circuit', 'Baku', 'Azerbaiyán', true, NULL, 51, 6003, 8, 8, 4, '2026-09-26'),
('Marina Bay Street Circuit', 'Singapur', 'Singapur', true, NULL, 62, 4927, 9, 8, 2, '2026-10-11'),
('Circuit of The Americas', 'Austin', 'EE. UU.', true, NULL, 56, 5513, 5, 8, 7, '2026-10-25'),
('Autódromo Hermanos Rodríguez', 'Ciudad de México', 'México', true, NULL, 71, 4304, 8, 5, 4, '2026-11-01'),
('Autódromo José Carlos Pace', 'São Paulo', 'Brasil', true, NULL, 71, 4309, 5, 6, 4, '2026-11-08'),
('Las Vegas Street Circuit', 'Las Vegas', 'EE. UU.', true, NULL, 50, 6201, 5, 8, 4, '2026-11-21'),
('Lusail International Circuit', 'Lusail', 'Catar', true, NULL, 57, 5419, 1, 8, 7, '2026-11-29'),
('Yas Marina Circuit', 'Abu Dhabi', 'EAU', true, NULL, 58, 5281, 5, 7, 4, '2026-12-06');


-- ============================================
-- PASO 5: INSERTAR COCHES
-- ============================================
INSERT INTO coches 
(nombre, codigo, id_equipo, ers_curva_lenta, ers_curva_media, ers_curva_rapida, consumo) VALUES
('McLaren MCL40', 'MCL40', 1, 0.0190, 0.0115, 0.0105, 32.70),
('Mercedes F1 W17 E', 'W17E', 2, 0.0192, 0.0116, 0.0106, 32.50),
('Red Bull RB22', 'RB22', 3, 0.0189, 0.0114, 0.0104, 32.80),
('Ferrari SF26', 'SF26', 4, 0.0194, 0.0118, 0.0107, 32.90),
('Williams FW48', 'FW48', 5, 0.0185, 0.0110, 0.0102, 33.20),
('VCARB 03', 'VCARB03', 6, 0.0187, 0.0112, 0.0103, 33.00),
('Aston Martin AMR26', 'AMR26', 7, 0.0188, 0.0113, 0.0104, 32.80),
('Haas VF-26', 'VF26', 8, 0.0184, 0.0109, 0.0101, 33.60),
('Alpine A526', 'A526', 9, 0.0185, 0.0110, 0.0102, 33.30),
('Audi R26', 'R26', 10, 0.0186, 0.0111, 0.0102, 33.40),
('Cadillac C26', 'C26', 11, 0.0182, 0.0108, 0.0100, 33.80);

-- ============================================
-- PASO 6: DATOS DE EJEMPLO
-- ============================================
INSERT INTO noticias (permalink, titulo, imagen, texto, id_autor) VALUES
(
  'hamilton-ficha-ferrari-2025',
  'Hamilton ficha por Ferrari para 2025',
  NULL,
  'Lewis Hamilton ha confirmado su fichaje por Scuderia Ferrari a partir de la temporada 2025 en una de las decisiones más impactantes de la historia reciente de la Fórmula 1. El siete veces campeón del mundo pondrá fin a una etapa legendaria en Mercedes, donde logró seis títulos mundiales y más de cien victorias. Hamilton compartirá equipo con Charles Leclerc, formando una de las parejas más competitivas jamás vistas en la escudería italiana. El piloto británico ha declarado que se trata de un sueño cumplido y un nuevo desafío en la fase final de su carrera deportiva.',
  1
);

SET FOREIGN_KEY_CHECKS = 1;