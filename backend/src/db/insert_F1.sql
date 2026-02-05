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
('Andrea Stella', 'astella', 'andrea.stella@mclaren.com', 'team123', 'responsable_equipo', TRUE, NOW()),     -- ID 2
('Toto Wolff', 'twolff', 'toto.wolff@mercedes.com', 'team123', 'responsable_equipo', TRUE, NOW()),           -- ID 3
('Christian Horner', 'chorner', 'c.horner@redbull.com', 'team123', 'responsable_equipo', TRUE, NOW()),       -- ID 4
('Frédéric Vasseur', 'fvasseur', 'f.vasseur@ferrari.com', 'team123', 'responsable_equipo', TRUE, NOW()),     -- ID 5
('James Vowles', 'jvowles', 'j.vowles@williams.com', 'team123', 'responsable_equipo', TRUE, NOW()),          -- ID 6
('Laurent Mekies', 'lmekies', 'l.mekies@racingbulls.com', 'team123', 'responsable_equipo', TRUE, NOW()),     -- ID 7
('Mike Krack', 'mkrack', 'm.krack@astonmartin.com', 'team123', 'responsable_equipo', TRUE, NOW()),           -- ID 8
('Ayao Komatsu', 'akomatsu', 'a.komatsu@haas.com', 'team123', 'responsable_equipo', TRUE, NOW()),            -- ID 9
('Oliver Oakes', 'ooakes', 'o.oakes@alpine.com', 'team123', 'responsable_equipo', TRUE, NOW()),              -- ID 10
('Jonathan Wheatley', 'jwheatley', 'j.wheatley@audi.com', 'team123', 'responsable_equipo', TRUE, NOW()),     -- ID 11
('Marc Arnold', 'marnold', 'm.arnold@cadillac.com', 'team123', 'responsable_equipo', TRUE, NOW()),          -- ID 12
('Zak Brown', 'zbrown', 'zak.brown@mclaren.com', 'team123', 'responsable_equipo', TRUE, NOW()),        		-- ID 13
('Rob Marshall', 'rmarshall', 'rob.marshall@mclaren.com', 'team123', 'responsable_equipo', TRUE, NOW()),     -- ID 14
('Neil Houldey', 'nhouldey', 'neil.houldey@mclaren.com', 'team123', 'responsable_equipo', TRUE, NOW());      -- ID 15

-- ============================================
-- 3. EQUIPOS
-- ============================================
INSERT INTO equipos (nombre, logo, twitter, id_usuario_creador) VALUES
('McLaren Mastercard Formula 1 Team', 'https://media.formula1.com/image/upload/c_fit,h_64/q_auto/v1740000000/common/f1/2025/mclaren/2025mclarenlogowhite.webp', 'McLarenF1', 1),
('Mercedes-AMG PETRONAS Formula One Team', 'https://media.formula1.com/image/upload/c_fit,h_64/q_auto/v1740000000/common/f1/2025/mercedes/2025mercedeslogowhite.webp', 'MercedesAMGF1', 1),
('Oracle Red Bull Racing', 'https://media.formula1.com/image/upload/c_fit,h_64/q_auto/v1740000000/common/f1/2025/redbullracing/2025redbullracinglogowhite.webp', 'redbullracing', 1),
('Scuderia Ferrari HP', 'https://media.formula1.com/image/upload/c_fit,h_64/q_auto/v1740000000/common/f1/2025/ferrari/2025ferrarilogolight.webp', 'ScuderiaFerrari', 1),
('Atlassian Williams F1 Team', 'https://media.formula1.com/image/upload/c_fit,h_64/q_auto/v1740000000/common/f1/2025/williams/2025williamslogowhite.webp', 'WilliamsF1', 1),
('Visa Cash App Racing Bulls Formula One Team', 'https://media.formula1.com/image/upload/c_fit,h_64/q_auto/v1740000000/common/f1/2025/redbullracing/2025redbullracinglogowhite.webp', 'visacashapprb', 1),
('Aston Martin Aramco Formula One Team', 'https://media.formula1.com/image/upload/c_fit,h_64/q_auto/v1740000000/common/f1/2025/astonmartin/2025astonmartinlogowhite.webp', 'AstonMartinF1', 1),
('TGR Haas F1 Team', 'https://media.formula1.com/image/upload/c_fit,h_64/q_auto/v1740000000/common/f1/2025/haas/2025haaslogowhite.webp', 'HaasF1Team', 1),
('BWT Alpine Formula One Team', 'https://media.formula1.com/image/upload/c_fit,h_64/q_auto/v1740000000/common/f1/2025/alpine/2025alpinelogowhite.webp', 'AlpineF1Team', 1),
('Audi Revolut F1 Team', 'https://media.formula1.com/image/upload/c_fit,h_64/q_auto/v1740000000/common/f1/2026/audi/2026audilogowhite.webp', 'audi_f1stars', 1),
('Cadillac Formula 1 Team', 'https://media.formula1.com/image/upload/c_fit,h_64/q_auto/v1740000000/common/f1/2026/cadillac/2026cadillaclogowhite.webp', 'Cadillac_F1', 1);

-- ============================================
-- 4. EQUIPO_RESPONSABLES
-- ============================================
INSERT INTO equipo_responsables (id_equipo, id_usuario) VALUES
(1, 2),  -- McLaren - Stella
(1, 3),  -- Mercedes - Wolff
(1, 4),  -- Red Bull - Horner
(1, 5),  -- Ferrari - Vasseur
(5, 6),  -- Williams - Vowles
(6, 7),  -- RB - Mekies
(7, 8),  -- Aston Martin - Krack
(8, 9),  -- Haas - Komatsu
(9, 10), -- Alpine - Oakes
(10, 11),-- Audi - Wheatley
(11, 12),-- Cadillac - Arnold
(1, 13), -- McLaren - Zak Brown
(1, 14), -- McLaren - Rob Marshall
(1, 15); -- McLaren - Neil Houldey

-- ============================================
-- 5. PILOTOS
-- ============================================
INSERT INTO pilotos (nombre, apellidos, siglas, dorsal, foto, pais, twitter, id_equipo, activo) VALUES
('Lando', 'Norris', 'NOR', 1, 'https://media.formula1.com/image/upload/c_lfill,w_440/q_auto/v1740000000/common/f1/2025/mclaren/lannor01/2025mclarenlannor01right.webp', 'Reino Unido', 'LandoNorris', 1, TRUE),
('Oscar', 'Piastri', 'PIA', 81, 'https://media.formula1.com/image/upload/c_lfill,w_440/q_auto/v1740000000/common/f1/2025/mclaren/oscpia01/2025mclarenoscpia01right.webp', 'Australia', 'OscarPiastri', 1, TRUE),

('George', 'Russell', 'RUS', 63, 'https://media.formula1.com/image/upload/c_lfill,w_440/q_auto/v1740000000/common/f1/2025/mercedes/georus01/2025mercedesgeorus01right.webp', 'Reino Unido', 'GeorgeRussell63', 2, TRUE),
('Andrea Kimi', 'Antonelli', 'ANT', 12, 'https://media.formula1.com/image/upload/c_lfill,w_440/q_auto/v1740000000/common/f1/2025/mercedes/andant01/2025mercedesandant01right.webp', 'Italia', NULL, 2, TRUE),

('Max', 'Verstappen', 'VER', 3, 'https://media.formula1.com/image/upload/c_lfill,w_440/q_auto/v1740000000/common/f1/2025/redbullracing/maxver01/2025redbullracingmaxver01right.webp', 'Países Bajos', 'Max33Verstappen', 3, TRUE),
('Isack', 'Hadjar', 'HAD', 6, 'https://media.formula1.com/image/upload/c_lfill,w_440/q_auto/v1740000000/common/f1/2026/redbullracing/isahad01/2026redbullracingisahad01right.webp', 'Francia', 'Isack_Hadjar', 3, TRUE),

('Charles', 'Leclerc', 'LEC', 16, 'https://media.formula1.com/image/upload/c_lfill,w_440/q_auto/v1740000000/common/f1/2025/ferrari/chalec01/2025ferrarichalec01right.webp', 'Mónaco', 'Charles_Leclerc', 4, TRUE),
('Lewis', 'Hamilton', 'HAM', 44, 'https://media.formula1.com/image/upload/c_lfill,w_440/q_auto/v1740000000/common/f1/2025/ferrari/lewham01/2025ferrarilewham01right.webp', 'Reino Unido', 'LewisHamilton', 4, TRUE),

('Alexander', 'Albon', 'ALB', 23, 'https://media.formula1.com/image/upload/c_lfill,w_440/q_auto/v1740000000/common/f1/2025/williams/alealb01/2025williamsalealb01right.webp', 'Tailandia', 'alex_albon', 5, TRUE),
('Carlos', 'Sainz Jr.', 'SAI', 55, 'https://media.formula1.com/image/upload/c_lfill,w_440/q_auto/v1740000000/common/f1/2025/williams/carsai01/2025williamscarsai01right.webp', 'España', 'Carlossainz55', 5, TRUE),

('Liam', 'Lawson', 'LAW', 30, 'https://media.formula1.com/image/upload/c_lfill,w_440/q_auto/v1740000000/common/f1/2025/racingbulls/lialaw01/2025racingbullslialaw01right.webp', 'Nueva Zelanda', 'LiamLawson30', 6, TRUE),
('Arvid', 'Lindblad', 'LIN', 41, 'https://media.formula1.com/image/upload/c_lfill,w_440/q_auto/v1740000000/common/f1/2026/racingbulls/arvlin01/2026racingbullsarvlin01right.webp', 'Reino Unido', NULL, 6, TRUE),

('Fernando', 'Alonso', 'ALO', 14, 'https://media.formula1.com/image/upload/c_lfill,w_440/q_auto/v1740000000/common/f1/2025/astonmartin/feralo01/2025astonmartinferalo01right.webp', 'España', 'alo_oficial', 7, TRUE),
('Lance', 'Stroll', 'STR', 18, 'https://media.formula1.com/image/upload/c_lfill,w_440/q_auto/v1740000000/common/f1/2025/astonmartin/lanstr01/2025astonmartinlanstr01right.webp', 'Canadá', 'lance_stroll', 7, TRUE),

('Esteban', 'Ocon', 'OCO', 31, 'https://media.formula1.com/image/upload/c_lfill,w_440/q_auto/v1740000000/common/f1/2025/haas/estoco01/2025haasestoco01right.webp', 'Francia', 'OconEsteban', 8, TRUE),
('Oliver', 'Bearman', 'OBE', 87, 'https://media.formula1.com/image/upload/c_lfill,w_440/q_auto/v1740000000/common/f1/2025/haas/olibea01/2025haasolibea01right.webp', 'Reino Unido', 'OllieBearman', 8, TRUE),

('Pierre', 'Gasly', 'GAS', 10, 'https://media.formula1.com/image/upload/c_lfill,w_440/q_auto/v1740000000/common/f1/2025/alpine/piegas01/2025alpinepiegas01right.webp', 'Francia', 'PierreGASLY', 9, TRUE),
('Franco', 'Colapinto', 'COL', 43, 'https://media.formula1.com/image/upload/c_lfill,w_440/q_auto/v1740000000/common/f1/2025/alpine/fracol01/2025alpinefracol01right.webp', 'Argentina', 'FranColapinto', 9, TRUE),

('Nico', 'Hülkenberg', 'HUL', 27, 'https://media.formula1.com/image/upload/c_lfill,w_440/q_auto/v1740000000/common/f1/2026/audi/nichul01/2026audinichul01right.webp', 'Alemania', 'HulkHulkenberg', 10, TRUE),
('Gabriel', 'Bortoleto', 'BOR', 5, 'https://media.formula1.com/image/upload/c_lfill,w_440/q_auto/v1740000000/common/f1/2026/audi/gabbor01/2026audigabbor01right.webp', 'Brasil', 'gabortoleto85', 10, TRUE),

('Sergio', 'Pérez', 'PER', 11, 'https://media.formula1.com/image/upload/c_lfill,w_440/q_auto/v1740000000/common/f1/2026/cadillac/serper01/2026cadillacserper01right.webp', 'México', 'SChecoPerez', 11, TRUE),
('Valtteri', 'Bottas', 'BOT', 77, 'https://media.formula1.com/image/upload/c_lfill,w_440/q_auto/v1740000000/common/f1/2026/cadillac/valbot01/2026cadillacvalbot01right.webp', 'Finlandia', 'ValtteriBottas', 11, TRUE);

-- ============================================
-- 6. CIRCUITOS
-- ============================================
INSERT INTO circuitos (nombre, ciudad, pais, calendario, trazado, numero_vueltas, longitud, curvas_lentas, curvas_media, curvas_rapidas, fecha_carrera) VALUES
('Albert Park', 'Melbourne', 'Australia', true, 'https://media.formula1.com/image/upload/c_fit,h_704/q_auto/v1740000000/common/f1/2026/track/2026trackmelbournedetailed.webp', 58, 5278, 3, 5, 6, '2026-03-08'),
('Shanghai International Circuit', 'Shanghai', 'China', true, 'https://media.formula1.com/image/upload/c_fit,h_704/q_auto/v1740000000/common/f1/2026/track/2026trackshanghaidetailed.webp', 56, 5451, 5, 7, 4, '2026-03-15'),
('Suzuka Circuit', 'Suzuka', 'Japón', true, 'https://media.formula1.com/image/upload/c_fit,h_704/q_auto/v1740000000/common/f1/2026/track/2026tracksuzukadetailed.webp', 53, 5807, 2, 8, 8, '2026-03-29'),
('Bahrain International Circuit', 'Sakhir', 'Bahrain', true, 'https://media.formula1.com/image/upload/c_fit,h_704/q_auto/v1740000000/common/f1/2026/track/2026tracksakhirdetailed.webp', 57, 5412, 3, 8, 4, '2026-04-12'),
('Jeddah Corniche Circuit', 'Jeddah', 'Arabia Saudí', true, 'https://media.formula1.com/image/upload/c_fit,h_704/q_auto/v1740000000/common/f1/2026/track/2026trackjeddahdetailed.webp', 50, 6174, 2, 10, 15, '2026-04-19'),
('Miami International Autodrome', 'Miami Gardens', 'EE. UU.', true, 'https://media.formula1.com/image/upload/c_fit,h_704/q_auto/v1740000000/common/f1/2026/track/2026trackmiamidetailed.webp', 57, 5412, 5, 8, 6, '2026-05-03'),
('Circuit Gilles Villeneuve', 'Montreal', 'Canadá', true, 'https://media.formula1.com/image/upload/c_fit,h_704/q_auto/v1740000000/common/f1/2026/track/2026trackmontrealdetailed.webp', 70, 4361, 4, 8, 2, '2026-05-24'),
('Circuit de Monaco', 'Mónaco', 'Mónaco', true, 'https://media.formula1.com/image/upload/c_fit,h_704/q_auto/v1740000000/common/f1/2026/track/2026trackmontecarlodetailed.webp', 78, 3337, 10, 9, 0, '2026-06-07'),
('Circuit de Barcelona-Catalunya', 'Montmeló', 'España', true, 'https://media.formula1.com/image/upload/c_fit,h_704/q_auto/v1740000000/common/f1/2026/track/2026trackcatalunyadetailed.webp', 66, 4657, 4, 6, 4, '2026-06-14'),
('Red Bull Ring', 'Spielberg', 'Austria', true, 'https://media.formula1.com/image/upload/c_fit,h_704/q_auto/v1740000000/common/f1/2026/track/2026trackspielbergdetailed.webp', 71, 4326, 3, 3, 4, '2026-06-28'),
('Silverstone Circuit', 'Silverstone', 'Reino Unido', true, 'https://media.formula1.com/image/upload/c_fit,h_704/q_auto/v1740000000/common/f1/2026/track/2026tracksilverstonedetailed.webp', 52, 5891, 4, 5, 9, '2026-07-05'),
('Circuit de Spa-Francorchamps', 'Spa', 'Bélgica', true, 'https://media.formula1.com/image/upload/c_fit,h_704/q_auto/v1740000000/common/f1/2026/track/2026trackspafrancorchampsdetailed.webp', 44, 7004, 3, 8, 8, '2026-07-19'),
('Hungaroring', 'Budapest', 'Hungría', true, 'https://media.formula1.com/image/upload/c_fit,h_704/q_auto/v1740000000/common/f1/2026/track/2026trackhungaroringdetailed.webp', 70, 4381, 6, 6, 2, '2026-07-26'),
('Circuit Zandvoort', 'Zandvoort', 'Países Bajos', true, 'https://media.formula1.com/image/upload/c_fit,h_704/q_auto/v1740000000/common/f1/2026/track/2026trackzandvoortdetailed.webp', 72, 4259, 4, 6, 4, '2026-08-23'),
('Autodromo Nazionale di Monza', 'Monza', 'Italia', true, 'https://media.formula1.com/image/upload/c_fit,h_704/q_auto/v1740000000/common/f1/2026/track/2026trackmonzadetailed.webp', 53, 5793, 3, 5, 3, '2026-09-06'),
('Madrid Street Circuit', 'Madrid', 'España', true, 'https://media.formula1.com/image/upload/c_fit,h_704/q_auto/v1740000000/common/f1/2026/track/2026trackmadringdetailed.webp', 57, 5474, 7, 8, 5, '2026-09-13'),
('Baku City Circuit', 'Baku', 'Azerbaiyán', true, 'https://media.formula1.com/image/upload/c_fit,h_704/q_auto/v1740000000/common/f1/2026/track/2026trackbakudetailed.webp', 51, 6003, 8, 8, 4, '2026-09-26'),
('Marina Bay Street Circuit', 'Singapur', 'Singapur', true, 'https://media.formula1.com/image/upload/c_fit,h_704/q_auto/v1740000000/common/f1/2026/track/2026tracksingaporedetailed.webp', 62, 4927, 9, 8, 2, '2026-10-11'),
('Circuit of The Americas', 'Austin', 'EE. UU.', true, 'https://media.formula1.com/image/upload/c_fit,h_704/q_auto/v1740000000/common/f1/2026/track/2026trackaustindetailed.webp', 56, 5513, 5, 8, 7, '2026-10-25'),
('Autódromo Hermanos Rodríguez', 'Ciudad de México', 'México', true, 'https://media.formula1.com/image/upload/c_fit,h_704/q_auto/v1740000000/common/f1/2026/track/2026trackmexicocitydetailed.webp', 71, 4304, 8, 5, 4, '2026-11-01'),
('Autódromo José Carlos Pace', 'São Paulo', 'Brasil', true, 'https://media.formula1.com/image/upload/c_fit,h_704/q_auto/v1740000000/common/f1/2026/track/2026trackinterlagosdetailed.webp', 71, 4309, 5, 6, 4, '2026-11-08'),
('Las Vegas Street Circuit', 'Las Vegas', 'EE. UU.', true, 'https://media.formula1.com/image/upload/c_fit,h_704/q_auto/v1740000000/common/f1/2026/track/2026tracklasvegasdetailed.webp', 50, 6201, 5, 8, 4, '2026-11-21'),
('Lusail International Circuit', 'Lusail', 'Catar', true, 'https://media.formula1.com/image/upload/c_fit,h_704/q_auto/v1740000000/common/f1/2026/track/2026tracklusaildetailed.webp', 57, 5419, 1, 8, 7, '2026-11-29'),
('Yas Marina Circuit', 'Abu Dhabi', 'EAU', true, 'https://media.formula1.com/image/upload/c_fit,h_704/q_auto/v1740000000/common/f1/2026/track/2026trackyasmarinacircuitdetailed.webp', 58, 5281, 5, 7, 4, '2026-12-06');

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
  'mercedes-se-blinda-ante-la-fia',
  'Mercedes se blinda ante la FIA y no descarta acciones legales si se altera el reglamento',
  'https://soymotor.com/sites/default/files/styles/watermark_wide_960/public/2026-02/mercedes-test-barcelona-soymotor.jpg.webp?itok=15bXVwEQ',
  'La nueva unidad de potencia de Mercedes ha generado una fuerte controversia técnica antes del inicio de la temporada 2026 de Fórmula 1. El debate surge tras confirmarse que la FIA considera legal un innovador sistema basado en una microcámara de combustión adicional en cada cilindro, pese a las dudas expresadas por otros fabricantes.

	El punto clave es que el motor puede operar con una relación de compresión efectiva de hasta 18:1 en condiciones de funcionamiento, aunque el reglamento fija un límite de 16:1 durante las verificaciones en frío. La solución de Mercedes permite cumplir el reglamento a temperatura ambiente y, una vez alcanzada la temperatura óptima, anular el efecto de esa microcámara para trabajar con mayores presiones internas.

	La FIA ha validado oficialmente esta arquitectura tras revisar la documentación técnica, reforzando la posición legal del fabricante alemán. Toto Wolff ha defendido con firmeza la legalidad del sistema y ha instado a los rivales a centrarse en mejorar su rendimiento en lugar de buscar polémicas. Mercedes cuenta además con respaldo jurídico y no descarta acciones legales si se intenta reinterpretar la normativa con la temporada ya iniciada.

	En términos de rendimiento, la ventaja no se limita a un aumento estimado de unos diez caballos, sino que podría ampliarse gracias a una mejor integración con el nuevo combustible sostenible, permitiendo también una posible reducción de peso. Esto ha encendido las alarmas en Honda, Ferrari, Audi y RBPT Ford, que estudian presentar objeciones desde la primera carrera en Australia.

	Aunque el margen para cambios reglamentarios inmediatos es reducido, la FIA y la F1 buscan evitar una guerra de motores. Mientras tanto, los rivales ya trabajan en respuestas técnicas, incluyendo la posible adopción de soluciones similares en los próximos años.',
  1
),
(
  'un-pasado-que-puede-decidir-el-futuro',
  'Un pasado que puede decidir el futuro: ¿por qué Alonso parte con ventaja en la F1 de 2026?',
  'https://soymotor.com/sites/default/files/inline-images/alonso-shakedown-barna-soymotor%20%281%29%20%281%29%20%281%29.jpg',
  'La Fórmula 1 de 2026 supondrá mucho más que un cambio técnico: exigirá a los pilotos una nueva forma de pilotar basada en la gestión energética, la lectura de carrera y la sensibilidad con el acelerador. En este contexto, Fernando Alonso parte con una ventaja clara gracias a su experiencia previa en un entorno híbrido muy similar.

	Entre 2018 y 2019, Alonso ganó dos veces las 24 Horas de Le Mans y el Mundial de Resistencia con el Toyota TS050 Hybrid, un coche con una entrega de potencia casi equilibrada entre motor térmico y eléctrico y una gestión de hasta 8 MJ de energía por vuelta. Ese concepto es prácticamente un anticipo directo de la Fórmula 1 de 2026, donde el peso del sistema eléctrico será mucho mayor y el motor de combustión perderá protagonismo.

	El nuevo reglamento hará que el lift and coast deje de ser una técnica puntual para convertirse en una herramienta estructural, incluso en clasificación. Las vueltas rápidas ya no consistirán sólo en atacar al máximo, sino en “construir” el tiempo mediante una gestión precisa de la energía. Algo que para muchos pilotos será antinatural, pero que Alonso domina desde su etapa en el WEC.

	Mientras la mayoría de la parrilla se ha formado en una F1 orientada al sprint y a la agresividad pura, Alonso ha competido y ganado gestionando exactamente los valores energéticos que serán clave en 2026. En un reglamento donde la interpretación del sistema puede marcar diferencias desde las primeras carreras, su experiencia puede traducirse en una ventaja inmediata.

	Lejos de ser un hándicap, la edad y el bagaje del asturiano podrían convertirse en un activo decisivo en una Fórmula 1 donde la eficiencia, la inteligencia y la adaptación serán tan importantes como la velocidad.',
  1
),
(
  'nuevo-motor-ferrari',
  'Ferrari ya trabaja en un motor de compresión aumentada',
  'https://soymotor.com/sites/default/files/styles/watermark_wide_960/public/2026-02/ferrari-test2-soymotor.jpg.webp?itok=ZcN5wdvQ',
  'Ferrari ha decidido reaccionar con rapidez ante la validación por parte de la FIA del innovador motor de Mercedes y ya trabaja en una solución similar basada en la llamada compresión variable, conocida en el paddock como la de los “pistones mutantes” o “expandibles”.

	Según informaciones procedentes de Italia y reveladas por Leo Turrini en Profondo Rossa, en Maranello han asumido que la legalidad del sistema de Mercedes y la imposibilidad de medir la compresión más allá de las verificaciones en frío dejan poco margen para la protesta. Aunque Ferrari no renuncia al debate político, ha optado por acelerar el desarrollo técnico para no quedarse atrás.

	La situación recuerda a lo ocurrido en 2014, cuando Mercedes sorprendió con un motor muy superior al resto y su ventaja tardó tiempo en ser comprendida. En el paddock se especula sobre el origen del sistema alemán, que podría basarse en pistones forjados mediante impresión 3D o en canales alrededor de la bujía que se sellan por dilatación térmica.

	Ferrari, sin embargo, estaría explorando una de las primeras hipótesis planteadas: el uso de una biela fabricada con un material de alto coeficiente de dilatación que permita mantener o incluso aumentar la relación de compresión cuando el motor alcanza temperatura de funcionamiento.

	Este desarrollo no llegará a corto plazo. No se espera que pueda probarse en banco antes de mitad de temporada, por lo que su aplicación real se situaría en 2027. Mientras tanto, el paddock observa con atención si Mercedes explotará desde el inicio todo el potencial de su motor o si dosificará su ventaja para evitar que los rivales accedan a las ayudas reglamentarias del ADUO destinadas a los fabricantes rezagados.',
  1
),
(
  'newey-avisa',
  'Newey avisa: "El AMR26 que corra en Australia va a ser muy diferente al de Barcelona"',
  'https://soymotor.com/sites/default/files/inline-images/alonso-amr26-soymotor.jpg',
  'Adrian Newey ha dejado claro que el AMR26 visto en los test de Barcelona es sólo un punto de partida. El jefe técnico de Aston Martin ha asegurado que el coche cambiará de forma notable antes del GP de Australia y continuará evolucionando durante toda la temporada, hasta el punto de que el monoplaza de Abu Dabi será muy distinto al que arranque el año.

	El AMR26 ha generado una gran expectación en el paddock por ser el primer Aston Martin diseñado bajo la dirección de Newey. Dentro del equipo se habla de un coche “a otro nivel”, con una personalidad propia y soluciones diferentes, lo que ha puesto muchos focos sobre el proyecto.

	Newey ha explicado que el objetivo no es tener el coche más rápido desde la primera carrera, sino uno con un alto potencial de desarrollo. La filosofía recuerda a la aplicada por Red Bull en 2022: empezar con una base sólida y dejar margen para evolucionar con éxito a lo largo del año, evitando un diseño demasiado optimizado que se estanque pronto.

	En este enfoque, Aston Martin ha priorizado los fundamentos del coche, asumiendo que muchos apéndices aerodinámicos cambiarán durante la temporada. Newey insiste en la importancia de mantener la mente abierta y adaptar el monoplaza según se vaya entendiendo mejor el reglamento.

	Entre las características clave del AMR26 destaca su diseño mucho más compacto que el de anteriores Aston Martin, fruto de una estrecha colaboración entre los departamentos aerodinámico y mecánico. Aunque reconoce que el concepto puede parecer agresivo por incorporar soluciones poco habituales, Newey prefiere definirlo simplemente como el camino que consideran correcto para maximizar el potencial a largo plazo.',
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