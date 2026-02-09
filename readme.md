# Proyecto Web F1 

## Arquitectura del Backend (Spring Boot)

El backend está construido con **Java y Spring Boot**, usando **Spring Data JPA** para conectar con una base de datos **MySQL**. En el patrón MVC, este backend actúa como el **Modelo** (manejo de datos y lógica) y el **Controlador** (API REST para comunicar con el frontend).

```
src/main/java/es/uah/f1/
 model/           # El Modelo - Entidades de la base de datos

 dao/             # Data Access Object - Repositorios

 service/         # Lógica de Negocio 

 controller/      # El Controlador - API REST - Reciben peticiones HTTP del frontend y devuelven JSON.
```

## Arquitectura del Frontend (Angular)

El frontend usa **Angular**. En MVC, es la **Vista**: se encarga de mostrar la interfaz y manejar la interacción del usuario.

La estructura está organizada en módulos funcionales:

```
src/app/
 ├── core/                      # Núcleo de la aplicación (Singletons)
 │    ├── guards/      
 │    │    ├── public.guard.ts  # Control de acceso al login      
 │    │    └── auth.guard.ts    # Control de acceso a secciones privadas
 │    │
 │    ├── models/               # Interfaces de TypeScript
 │    │    ├── admin.interface.ts
 │    │    ├── auth.interface.ts
 │    │    ├── car.interface.ts
 │    │    ├── circuit.interface.ts
 │    │    ├── driver.interface.ts
 │    │    ├── news.interface.ts
 │    │    ├── poll.interface.ts
 │    │    ├── team.interface.ts
 │    │    └── user.interface.ts
 │    │
 │    └── services/             # Lógica de negocio y comunicación HTTP
 │         ├── admin.service.ts      # Gestión de usuarios pendientes
 │         ├── auth.service.ts       # Login y Registro
 │         ├── circuit.service.ts    # CRUD Circuitos
 │         ├── news.service.ts       # CRUD Noticias
 │         ├── polls.service.ts      # Votaciones públicas y gestión
 │         ├── simulation.service.ts # Cálculos ERS y Fuel
 │         └── teams.service.ts      # Datos de escuderías y pilotos
 │
 ├── features/                  # Módulos funcionales
 │    ├── public/               # Acceso libre (Aficionados)
 │    │    ├── home/                 # Landing page
 │    │    ├── login/                # Inicio de sesión
 │    │    ├── register/             # Nuevo registro (nombre, usuario, email)
 │    │    ├── poll-voting/          # Zona de votación y resultados
 │    │    ├── news/                 # Vista pública de noticias
 │    │    ├── newsDetail/           # Vista pública de una única noticia
 │    │    ├── teams/                # Vista pública de equipos
 │    │    └── calendar/             # Calendario público
 │    │
 │    ├── team/                 # Zona Privada Escuderías (Role: TEAM)
 │    │    ├── layout/               # Layout específico de equipos
 │    │    ├── management/           # Gestión interna del equipo
 │    │    ├── fuel-calculator/      # Herramienta: Calculadora Gasolina
 │    │    └── ers-simulator/        # Herramienta: Simulador ERS
 │    │
 │    └── admin/                 # Zona Privada FIA (Role: ADMIN)
 │         ├── layout/               # Layout con Sidebar de administración
 │         ├── admin-users/          # Validación de registros pendientes
 │         ├── admin-circuits/       # CRUD Circuitos y Calendario
 │         ├── admin-news/           # CMS de Noticias
 │         ├── admin-teams/          # Monitorización y acceso datos de equipos
 │         └── admin-votes/          # Creación de votaciones
 │
 └── shared/                    # Componentes compartidos
      ├── header/               # Navbar principal (adapta enlaces según rol)
      └── footer/               # Pie de página
```

## Cómo Ejecutar el Proyecto

Si quieres modificar el código, abre dos terminales:

1. **Backend**: Ve a la carpeta `backend` y ejecuta:
   ```bash
   mvn spring-boot:run
   ```

2. **Frontend**: Ve a la carpeta `frontend` y ejecuta:
   ```bash
   ng serve
   ```

La web estará en `http://localhost:4200` y usará un proxy para conectar con el backend en el puerto 8080.


