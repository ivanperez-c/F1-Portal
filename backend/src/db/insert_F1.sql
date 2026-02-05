USE f1_portal;

SET FOREIGN_KEY_CHECKS = 0;

-- 1. LIMPIEZA 
TRUNCATE TABLE votos_emitidos;
TRUNCATE TABLE votacion_pilotos;
TRUNCATE TABLE votaciones;
TRUNCATE TABLE noticias;
TRUNCATE TABLE coches;
TRUNCATE TABLE circuitos;
TRUNCATE TABLE pilotos;
TRUNCATE TABLE equipo_responsables;
TRUNCATE TABLE equipos;
TRUNCATE TABLE usuarios;

-- ============================================
-- 2. USUARIOS
-- ============================================
INSERT INTO usuarios (nombre, usuario, email, passwdUsuario, rol, validado, fecha_validacion) VALUES
-- ID 1: Admin
('Administrador Principal', 'admin', 'admin@f1portal.com', 'admin123', 'administrador', TRUE, NOW()),
-- ID 2-12: Responsables de Equipo
('Andrea Stella', 'astella', 'andrea.stella@mclaren.com', 'team123', 'responsable_equipo', TRUE, NOW()),       -- ID 2
('Toto Wolff', 'twolff', 'toto.wolff@mercedes.com', 'team123', 'responsable_equipo', TRUE, NOW()),           -- ID 3
('Christian Horner', 'chorner', 'c.horner@redbull.com', 'team123', 'responsable_equipo', TRUE, NOW()),       -- ID 4
('Frédéric Vasseur', 'fvasseur', 'f.vasseur@ferrari.com', 'team123', 'responsable_equipo', TRUE, NOW()),     -- ID 5
('James Vowles', 'jvowles', 'j.vowles@williams.com', 'team123', 'responsable_equipo', TRUE, NOW()),          -- ID 6
('Laurent Mekies', 'lmekies', 'l.mekies@racingbulls.com', 'team123', 'responsable_equipo', TRUE, NOW()),     -- ID 7
('Mike Krack', 'mkrack', 'm.krack@astonmartin.com', 'team123', 'responsable_equipo', TRUE, NOW()),           -- ID 8
('Ayao Komatsu', 'akomatsu', 'a.komatsu@haas.com', 'team123', 'responsable_equipo', TRUE, NOW()),            -- ID 9
('Oliver Oakes', 'ooakes', 'o.oakes@alpine.com', 'team123', 'responsable_equipo', TRUE, NOW()),              -- ID 10
('Jonathan Wheatley', 'jwheatley', 'j.wheatley@audi.com', 'team123', 'responsable_equipo', TRUE, NOW()),     -- ID 11
('Marc Arnold', 'marnold', 'm.arnold@cadillac.com', 'team123', 'responsable_equipo', TRUE, NOW());           -- ID 12

-- ============================================
-- 3. EQUIPOS
-- ============================================
INSERT INTO equipos (nombre, logo, twitter, id_usuario_creador) VALUES
('McLaren Mastercard Formula 1 Team', 'https://upload.wikimedia.org/wikipedia/en/6/66/McLaren_Racing_logo.svg', 'McLarenF1', 1),
('Mercedes-AMG PETRONAS Formula One Team', 'https://upload.wikimedia.org/wikipedia/commons/f/fb/Mercedes_AMG_Petronas_F1_Logo.svg', 'MercedesAMGF1', 1),
('Oracle Red Bull Racing', 'https://upload.wikimedia.org/wikipedia/en/c/c4/Oracle_Red_Bull_Racing_logo.svg', 'redbullracing', 1),
('Scuderia Ferrari HP', 'https://upload.wikimedia.org/wikipedia/en/d/d1/Ferrari-Logo.svg', 'ScuderiaFerrari', 1),
('Atlassian Williams F1 Team', 'https://upload.wikimedia.org/wikipedia/commons/e/ec/Williams_Racing_2020_Logo.svg', 'WilliamsF1', 1),
('Visa Cash App Racing Bulls Formula One Team', 'https://upload.wikimedia.org/wikipedia/en/3/3f/Visa_Cash_App_RB_Formula_One_Team_logo.svg', 'visacashapprb', 1),
('Aston Martin Aramco Formula One Team', 'https://upload.wikimedia.org/wikipedia/fr/7/72/Aston_Martin_Aramco_Cognizant_F1.svg', 'AstonMartinF1', 1),
('TGR Haas F1 Team', 'https://upload.wikimedia.org/wikipedia/commons/f/f8/MoneyGram_Haas_F1_Team_Logo.svg', 'HaasF1Team', 1),
('BWT Alpine Formula One Team', 'https://upload.wikimedia.org/wikipedia/fr/b/b7/Alpine_F1_Team_2021_Logo.svg', 'AlpineF1Team', 1),
('Audi Revolut F1 Team', 'https://upload.wikimedia.org/wikipedia/commons/9/92/Audi-Logo_2016.svg', 'stakef1team_ks', 1),
('Cadillac Formula 1 Team', 'https://upload.wikimedia.org/wikipedia/commons/1/1d/Cadillac_Logo_2014.png', 'Cadillac_F1', 1);

-- ============================================
-- 4. EQUIPO_RESPONSABLES
-- ============================================
INSERT INTO equipo_responsables (id_equipo, id_usuario) VALUES
(1, 2),  -- McLaren - Stella
(2, 3),  -- Mercedes - Wolff
(3, 4),  -- Red Bull - Horner
(4, 5),  -- Ferrari - Vasseur
(5, 6),  -- Williams - Vowles
(6, 7),  -- RB - Mekies
(7, 8),  -- Aston Martin - Krack
(8, 9),  -- Haas - Komatsu
(9, 10), -- Alpine - Oakes
(10, 11),-- Audi - Wheatley
(11, 12);-- Cadillac - Arnold

-- ============================================
-- 5. PILOTOS
-- ============================================
INSERT INTO pilotos (nombre, apellidos, siglas, dorsal, foto, pais, twitter, id_equipo, activo) VALUES
('Lando', 'Norris', 'NOR', 1, 'https://placehold.co/400x500/orange/white?text=Lando+Norris', 'Reino Unido', 'LandoNorris', 1, TRUE),
('Oscar', 'Piastri', 'PIA', 81, 'https://placehold.co/400x500/orange/white?text=Oscar+Piastri', 'Australia', 'OscarPiastri', 1, TRUE),

('George', 'Russell', 'RUS', 63, 'https://placehold.co/400x500/silver/black?text=George+Russell', 'Reino Unido', 'GeorgeRussell63', 2, TRUE),
('Andrea Kimi', 'Antonelli', 'ANT', 12, 'https://placehold.co/400x500/silver/black?text=Kimi+Antonelli', 'Italia', NULL, 2, TRUE),

('Max', 'Verstappen', 'VER', 3, 'https://placehold.co/400x500/000080/white?text=Max+Verstappen', 'Países Bajos', 'Max33Verstappen', 3, TRUE),
('Isack', 'Hadjar', 'HAD', 6, 'https://placehold.co/400x500/000080/white?text=Isack+Hadjar', 'Francia', 'Isack_Hadjar', 3, TRUE),

('Charles', 'Leclerc', 'LEC', 16, 'https://placehold.co/400x500/red/white?text=Charles+Leclerc', 'Mónaco', 'Charles_Leclerc', 4, TRUE),
('Lewis', 'Hamilton', 'HAM', 44, 'https://placehold.co/400x500/red/white?text=Lewis+Hamilton', 'Reino Unido', 'LewisHamilton', 4, TRUE),

('Alexander', 'Albon', 'ALB', 23, 'https://placehold.co/400x500/0055a4/white?text=Alex+Albon', 'Tailandia', 'alex_albon', 5, TRUE),
('Carlos', 'Sainz Jr.', 'SAI', 55, 'https://placehold.co/400x500/0055a4/white?text=Carlos+Sainz', 'España', 'Carlossainz55', 5, TRUE),

('Liam', 'Lawson', 'LAW', 30, 'https://placehold.co/400x500/1e41ff/white?text=Liam+Lawson', 'Nueva Zelanda', 'LiamLawson30', 6, TRUE),
('Arvid', 'Lindblad', 'LIN', 41, 'https://placehold.co/400x500/1e41ff/white?text=Arvid+Lindblad', 'Reino Unido', NULL, 6, TRUE),

('Fernando', 'Alonso', 'ALO', 14, 'https://placehold.co/400x500/006f62/white?text=Fernando+Alonso', 'España', 'alo_oficial', 7, TRUE),
('Lance', 'Stroll', 'STR', 18, 'https://placehold.co/400x500/006f62/white?text=Lance+Stroll', 'Canadá', 'lance_stroll', 7, TRUE),

('Esteban', 'Ocon', 'OCO', 31, 'https://placehold.co/400x500/white/red?text=Esteban+Ocon', 'Francia', 'OconEsteban', 8, TRUE),
('Oliver', 'Bearman', 'OBE', 87, 'https://placehold.co/400x500/white/red?text=Ollie+Bearman', 'Reino Unido', 'OllieBearman', 8, TRUE),

('Pierre', 'Gasly', 'GAS', 10, 'https://placehold.co/400x500/fd4bc7/white?text=Pierre+Gasly', 'Francia', 'PierreGASLY', 9, TRUE),
('Franco', 'Colapinto', 'COL', 43, 'https://placehold.co/400x500/fd4bc7/white?text=Franco+Colapinto', 'Argentina', 'FranColapinto', 9, TRUE),

('Nico', 'Hülkenberg', 'HUL', 27, 'https://placehold.co/400x500/4b4b4b/red?text=Nico+Hulkenberg', 'Alemania', 'HulkHulkenberg', 10, TRUE),
('Gabriel', 'Bortoleto', 'BOR', 5, 'https://placehold.co/400x500/4b4b4b/red?text=Gabriel+Bortoleto', 'Brasil', 'gabortoleto85', 10, TRUE),

('Sergio', 'Pérez', 'PER', 11, 'https://placehold.co/400x500/gold/black?text=Sergio+Perez', 'México', 'SChecoPerez', 11, TRUE),
('Valtteri', 'Bottas', 'BOT', 77, 'https://placehold.co/400x500/gold/black?text=Valtteri+Bottas', 'Finlandia', 'ValtteriBottas', 11, TRUE);

-- ============================================
-- 6. CIRCUITOS
-- ============================================
INSERT INTO circuitos (nombre, ciudad, pais, calendario, trazado, numero_vueltas, longitud, curvas_lentas, curvas_media, curvas_rapidas, fecha_carrera) VALUES
('Albert Park', 'Melbourne', 'Australia', true, 'https://i.pinimg.com/originals/2f/e3/7f/2fe37ff84888bc64f2487ab256b198eb.jpg', 58, 5278, 3, 5, 6, '2026-03-08'),
('Shanghai International Circuit', 'Shanghai', 'China', true, 'https://i.pinimg.com/originals/2f/e3/7f/2fe37ff84888bc64f2487ab256b198eb.jpg', 56, 5451, 5, 7, 4, '2026-03-15'),
('Suzuka Circuit', 'Suzuka', 'Japón', true, 'https://i.pinimg.com/originals/2f/e3/7f/2fe37ff84888bc64f2487ab256b198eb.jpg', 53, 5807, 2, 8, 8, '2026-03-29'),
('Bahrain International Circuit', 'Sakhir', 'Bahrain', true, 'https://i.pinimg.com/originals/2f/e3/7f/2fe37ff84888bc64f2487ab256b198eb.jpg', 57, 5412, 3, 8, 4, '2026-04-12'),
('Jeddah Corniche Circuit', 'Jeddah', 'Arabia Saudí', true, 'https://i.pinimg.com/originals/2f/e3/7f/2fe37ff84888bc64f2487ab256b198eb.jpg', 50, 6174, 2, 10, 15, '2026-04-19'),
('Miami International Autodrome', 'Miami Gardens', 'EE. UU.', true, 'https://i.pinimg.com/originals/2f/e3/7f/2fe37ff84888bc64f2487ab256b198eb.jpg', 57, 5412, 5, 8, 6, '2026-05-03'),
('Circuit Gilles Villeneuve', 'Montreal', 'Canadá', true, 'https://i.pinimg.com/originals/2f/e3/7f/2fe37ff84888bc64f2487ab256b198eb.jpg', 70, 4361, 4, 8, 2, '2026-05-24'),
('Circuit de Monaco', 'Mónaco', 'Mónaco', true, 'https://i.pinimg.com/originals/2f/e3/7f/2fe37ff84888bc64f2487ab256b198eb.jpg', 78, 3337, 10, 9, 0, '2026-06-07'),
('Circuit de Barcelona-Catalunya', 'Montmeló', 'España', true, 'https://i.pinimg.com/originals/2f/e3/7f/2fe37ff84888bc64f2487ab256b198eb.jpg', 66, 4657, 4, 6, 4, '2026-06-14'),
('Red Bull Ring', 'Spielberg', 'Austria', true, 'https://i.pinimg.com/originals/2f/e3/7f/2fe37ff84888bc64f2487ab256b198eb.jpg', 71, 4326, 3, 3, 4, '2026-06-28'),
('Silverstone Circuit', 'Silverstone', 'Reino Unido', true, 'https://i.pinimg.com/originals/2f/e3/7f/2fe37ff84888bc64f2487ab256b198eb.jpg', 52, 5891, 4, 5, 9, '2026-07-05'),
('Circuit de Spa-Francorchamps', 'Spa', 'Bélgica', true, 'https://i.pinimg.com/originals/2f/e3/7f/2fe37ff84888bc64f2487ab256b198eb.jpg', 44, 7004, 3, 8, 8, '2026-07-19'),
('Hungaroring', 'Budapest', 'Hungría', true, 'https://i.pinimg.com/originals/2f/e3/7f/2fe37ff84888bc64f2487ab256b198eb.jpg', 70, 4381, 6, 6, 2, '2026-07-26'),
('Circuit Zandvoort', 'Zandvoort', 'Países Bajos', true, 'https://i.pinimg.com/originals/2f/e3/7f/2fe37ff84888bc64f2487ab256b198eb.jpg', 72, 4259, 4, 6, 4, '2026-08-23'),
('Autodromo Nazionale di Monza', 'Monza', 'Italia', true, 'https://i.pinimg.com/originals/2f/e3/7f/2fe37ff84888bc64f2487ab256b198eb.jpg', 53, 5793, 3, 5, 3, '2026-09-06'),
('Madrid Street Circuit', 'Madrid', 'España', true, 'https://i.pinimg.com/originals/2f/e3/7f/2fe37ff84888bc64f2487ab256b198eb.jpg', 57, 5474, 7, 8, 5, '2026-09-13'),
('Baku City Circuit', 'Baku', 'Azerbaiyán', true, 'https://i.pinimg.com/originals/2f/e3/7f/2fe37ff84888bc64f2487ab256b198eb.jpg', 51, 6003, 8, 8, 4, '2026-09-26'),
('Marina Bay Street Circuit', 'Singapur', 'Singapur', true, 'https://i.pinimg.com/originals/2f/e3/7f/2fe37ff84888bc64f2487ab256b198eb.jpg', 62, 4927, 9, 8, 2, '2026-10-11'),
('Circuit of The Americas', 'Austin', 'EE. UU.', true, 'https://i.pinimg.com/originals/2f/e3/7f/2fe37ff84888bc64f2487ab256b198eb.jpg', 56, 5513, 5, 8, 7, '2026-10-25'),
('Autódromo Hermanos Rodríguez', 'Ciudad de México', 'México', true, 'https://i.pinimg.com/originals/2f/e3/7f/2fe37ff84888bc64f2487ab256b198eb.jpg', 71, 4304, 8, 5, 4, '2026-11-01'),
('Autódromo José Carlos Pace', 'São Paulo', 'Brasil', true, 'https://i.pinimg.com/originals/2f/e3/7f/2fe37ff84888bc64f2487ab256b198eb.jpg', 71, 4309, 5, 6, 4, '2026-11-08'),
('Las Vegas Street Circuit', 'Las Vegas', 'EE. UU.', true, 'https://i.pinimg.com/originals/2f/e3/7f/2fe37ff84888bc64f2487ab256b198eb.jpg', 50, 6201, 5, 8, 4, '2026-11-21'),
('Lusail International Circuit', 'Lusail', 'Catar', true, 'https://i.pinimg.com/originals/2f/e3/7f/2fe37ff84888bc64f2487ab256b198eb.jpg', 57, 5419, 1, 8, 7, '2026-11-29'),
('Yas Marina Circuit', 'Abu Dhabi', 'EAU', true, 'https://i.pinimg.com/originals/2f/e3/7f/2fe37ff84888bc64f2487ab256b198eb.jpg', 58, 5281, 5, 7, 4, '2026-12-06');

-- ============================================
-- 7. COCHES
-- ============================================
INSERT INTO coches (nombre, codigo, id_equipo, ers_curva_lenta, ers_curva_media, ers_curva_rapida, consumo) VALUES
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
-- 8. NOTICIAS
-- ============================================
INSERT INTO noticias (permalink, titulo, imagen, texto, id_autor) VALUES
(
  'hamilton-ferrari-debut-2026',
  'El mundo observa: Hamilton de rojo',
  'https://i.pinimg.com/originals/2f/e3/7f/2fe37ff84888bc64f2487ab256b198eb.jpg',
  'Lewis Hamilton ha pisado Maranello por primera vez como piloto oficial. "Es diferente a todo lo que he vivido", declaró el heptacampeón. Los Tifosi colapsaron la entrada de la fábrica esperando ver al británico con el mono rojo, marcando el inicio de la asociación más mediática de la historia. Este movimiento marca un antes y un después en la competición, generando una expectación sin precedentes entre los aficionados y la prensa especializada. Los analistas coinciden en que esta temporada será decisiva para el futuro de la categoría, redefiniendo las alianzas históricas del deporte.',
  1
),
(
  'madrid-gp-aprobado',
  'Luz verde definitiva para el GP de Madrid',
  'https://i.pinimg.com/originals/2f/e3/7f/2fe37ff84888bc64f2487ab256b198eb.jpg',
  'La FIA ha homologado hoy el trazado de IFEMA. Con su curva peraltada única y el paso subterráneo entre pabellones, el circuito madrileño promete ser la joya de la corona europea. Se esperan 140.000 espectadores diarios en el fin de semana inaugural de septiembre. La infraestructura ha sido elogiada por su sostenibilidad y accesibilidad, estableciendo un nuevo estándar para los circuitos urbanos modernos. La ciudad se prepara para recibir a miles de turistas internacionales, con un impacto económico estimado que superará todas las previsiones iniciales del gobierno regional.',
  1
),
(
  'audi-presentacion-2026',
  'Audi revela su "bestia" para 2026',
  'https://i.pinimg.com/originals/2f/e3/7f/2fe37ff84888bc64f2487ab256b198eb.jpg',
  'El equipo alemán no ha decepcionado. El R26 presenta una aerodinámica agresiva aprovechando el nuevo reglamento. Nico Hülkenberg se mostró confiado: "El motor suena diferente a todo lo demás". El esquema de colores gris plomo y rojo neón destaca en la parrilla. La unidad de potencia, desarrollada íntegramente en las nuevas instalaciones de Neuburg, incorpora soluciones innovadoras en la parte híbrida que podrían darles una ventaja significativa en los circuitos de alta velocidad. La competencia directa con Mercedes y Ferrari será el verdadero test de fuego para la marca de los cuatro aros.',
  1
),
(
  'cadillac-entra-f1',
  'Cadillac: El gigante americano llega para quedarse',
  'https://i.pinimg.com/originals/2f/e3/7f/2fe37ff84888bc64f2487ab256b198eb.jpg',
  'Andretti Global y General Motors han hecho realidad su sueño. El equipo Cadillac F1 Team ha presentado hoy sus instalaciones en Silverstone. Con motores propios previstos para 2028, inician esta etapa como cliente pero con ambición de podios desde el primer año. La llegada de un fabricante estadounidense de este calibre ha sacudido el paddock, atrayendo nuevos patrocinadores y consolidando la expansión de la Fórmula 1 en el mercado norteamericano. El equipo técnico, formado por veteranos de la parrilla y nuevos talentos, promete un enfoque agresivo y disruptivo en su estrategia de carrera.',
  1
);

-- ============================================
-- 9. VOTACIONES Y DATOS DE UNIÓN
-- ============================================

-- Crear una votación activa
INSERT INTO votaciones (permalink, titulo, descripcion, limite, id_creador) 
VALUES ('piloto-dia-madrid-2026', 'Piloto del Día - GP Madrid', 'Vota por quién ha dominado las calles de Madrid.', '2026-09-13 18:00:00', 1);

-- Seleccionar el ID de la votación creada
SET @id_votacion = LAST_INSERT_ID();

-- Asociar Pilotos a la votación (ID Votación, ID Piloto)
INSERT INTO votacion_pilotos (id_votacion, id_piloto) VALUES
(@id_votacion, 10),
(@id_votacion, 13),
(@id_votacion, 8),
(@id_votacion, 5),
(@id_votacion, 18);

-- Registrar Votos Emitidos
INSERT INTO votos_emitidos (id_votacion, nombre_aficionado, email_aficionado, id_piloto_votado) VALUES
(@id_votacion, 'Laura Gómez', 'laura@gmail.com', 10),    -- Voto a Sainz
(@id_votacion, 'Pedro Martínez', 'pmartinez@gmail.com', 13), -- Voto a Alonso
(@id_votacion, 'John Doe', 'jdoe@gmail.com', 8),          -- Voto a Hamilton
(@id_votacion, 'Max Fan', 'max33@gmail.com', 5),          -- Voto a Verstappen
(@id_votacion, 'Lucía Pérez', 'lucia.p@gmail.com', 18);  -- Voto a Colapinto

-- Crear una votación finalizada
INSERT INTO votaciones (permalink, titulo, descripcion, limite, id_creador, activo) 
VALUES (
    'piloto-dia-gp-bahrain-2024', 
    'Piloto del Día - GP Bahrain 2024', 
    'Vota por el piloto que mejor rendimiento ha tenido en la carrera inaugural.', 
    '2024-03-02 23:59:59',
    1,
    TRUE
);

SET @id_votacion = LAST_INSERT_ID();

INSERT INTO votacion_pilotos (id_votacion, id_piloto) VALUES
(@id_votacion, 5),  -- Max Verstappen
(@id_votacion, 10), -- Carlos Sainz
(@id_votacion, 7),  -- Charles Leclerc
(@id_votacion, 1),  -- Lando Norris
(@id_votacion, 13), -- Fernando Alonso
(@id_votacion, 8);  -- Lewis Hamilton

INSERT INTO votos_emitidos (id_votacion, nombre_aficionado, email_aficionado, id_piloto_votado) VALUES
(@id_votacion, 'Juan Perez', 'juan@test.com', 10),    -- Voto a Sainz
(@id_votacion, 'Maria Lopez', 'maria@test.com', 10),  -- Voto a Sainz
(@id_votacion, 'Carlos Ruiz', 'carlos@test.com', 10), -- Voto a Sainz
(@id_votacion, 'Max Fan', 'maxfan@test.com', 5),      -- Voto a Verstappen
(@id_votacion, 'RedBull Lover', 'rb@test.com', 5),    -- Voto a Verstappen
(@id_votacion, 'Nano Fan', 'magic@test.com', 13);     -- Voto a Alonso

SET FOREIGN_KEY_CHECKS = 1;