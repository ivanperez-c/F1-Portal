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
 core/
    services/    # Comunicación con el backend
       auth.service.ts       # Autenticación
       simulation.service.ts # Simulaciones
    guards/      # Protección de rutas
        admin-guard.ts        # Solo admins
        team-guard.ts         # Solo equipos

 features/        # Módulos principales
    public/      # Sección póblica (acceso libre)
       home/           # Noticias y votaciones
       login/          # Formulario de login
       register/        # Registro de usuarios
       circuit-list/    # Lista de circuitos
       news-list/       # Lista de noticias
   
    team/        # Sección privada para equipos
       car-management/  # CRUD de coches y pilotos
       team-dashboard/  # Dashboard del equipo
   
    admin/       # Sección restringida para admins
        circuit-management/  # Gestión de circuitos
        dashboard/           # Dashboard admin
        user-validation/     # Validar usuarios

 shared/          # Componentes reutilizables
     header/      # Menú dinámico (cambia según rol)
     footer/      # Pie de página
```

## Cómo Ejecutar el Proyecto

### Opción A: Modo Desarrollo (Separado)

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

### Opción B: Generar el Entregable único (Producciún)

Para fusionar Angular dentro de Spring Boot y tener un solo archivo:

1. **Compila el Frontend**: Desde `frontend`:
   ```bash
   ng build --configuration production
   ```
   Esto crea una carpeta `dist/frontend` con archivos optimizados.

2. **Mueve los archivos al Backend**: Copia el contenido de `dist/frontend/browser` (o similar) a `backend/src/main/resources/static/`.

3. **Empaqueta el Backend**: Desde `backend`:
   ```bash
   mvn clean package
   ```
   Genera un `.jar` en `backend/target/`.

### Comando Final para Ejecutar Todo

Para arrancar la aplicación completa (frontend + backend + BD) con un solo comando:
```bash
java -jar backend/target/f1-backend-0.0.1-SNAPSHOT.jar
```

Abre tu navegador en `http://localhost:8080` y listo! Verás la interfaz de Angular servida por Spring Boot.

