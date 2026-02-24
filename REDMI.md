GESTOR DE OPINIONES

Crear un archivo .env en la raiz del proyecto, copiar y pegar esto:

NODE_ENV=development
PORT=3005

DB_HOST=localhost
DB_PORT=5436
DB_NAME=gestionopiniones
DB_USER=root
DB_PASSWORD=admin
DB_LOGGING=true

JWT_SECRET=MyVerySecretKeyForJWTTokenAuthenticationWith256Bits
JWT_EXPIRES=30m
JWT_REFRESH=7d
JWT_ISSUER=AuthService
JWT_AUDIENCE=AuthService

# correo smtp gmail
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=dannym2407@gmail.com
SMTP_PASS=coffqxabtegnheio
MAIL_FROM=dannym2407@gmail.com
MAIL_NAME=Gestion Opiniones

# rutas y frontend
UPLOAD_PATH=./uploads
FRONTEND_URL=http://localhost:5173

# seguridad cors
ALLOWED_ORIGINS=http://localhost:5173,http://localhost:3000

# expiracion tokens
VERIFY_EMAIL_HOURS=24
RESET_PASSWORD_HOURS=1

-----------------------------------------------------------------------------------------------
En postgreSQL crear la base de datos con el nombre:
gestionopiniones

Las tablas se crean automáticamente al iniciar el servidor mediante Sequelize.
No es necesario crear tablas manualmente.

Abrir una terminal de visual y ejecutar el comando: 
pnpm install

y para correr el proyecto el comando:
pnpm run dev

--------------------------------------------------------------------------------------------------
Como usar la Api
FLUJO DE USO DE LA API

1. Registrar usuario → /api/auth/register
2. Verificar correo → link recibido en email
3. Iniciar sesión → /api/auth/login
4. Copiar el token recibido
5. Usar el token en headers: x-token
6. Crear posts y comentarios

Crear una nueva coleccion y crear dentro 

    AUTH

POST http://localhost:3005/api/auth/register → Registro
Headers: ninguno
Raw:
{
    "username": "juanperez",
    "email": "juan@gmail.com",
    "password": "123456",
    "name": "Juan",
    "surname": "Pérez"
}

GET http://localhost:3005/api/auth/verify-email?token= → Verificar Correo
Headers: ninguno
Raw: ninguno (el token va en la URL)

POST http://localhost:3005/api/auth/login → Login
Headers: ninguno
Raw:
{
    "emailOrUsername": "juanperez",
    "password": "123456"
}

---

     USUARIOS

GET http://localhost:3005/api/users/me → Ver Perfil
Headers: x-token: <tu_token>
Raw: ninguno

PUT http://localhost:3005/api/users/me → Actualizar Perfil
Headers: x-token: <tu_token>
Raw:
{
    "name": "Nuevo nombre",
    "surname": "Nuevo apellido",
    "username": "nuevousername",
    "email": "nuevo@gmail.com",
    "password": "contraseñaactual",
    "newPassword": "nuevacontraseña"
}

---

    POSTS

GET http://localhost:3005/api/posts → Ver Todos los Posts
Headers: ninguno
Raw: ninguno

GET http://localhost:3005/api/posts/1 → Ver Post por ID
Headers: ninguno
Raw: ninguno

POST http://localhost:3005/api/posts → Crear Post
Headers: x-token: <tu_token>
Raw:
{
    "title": "Título del post",
    "content": "Contenido del post"
}

PUT http://localhost:3005/api/posts/1 → Actualizar Post
Headers: x-token: <tu_token>
Raw:
{
    "title": "Título actualizado",
    "content": "Contenido actualizado"
}

DELETE http://localhost:3005/api/posts/1 → Eliminar Post
Headers: x-token: <tu_token>
Raw: ninguno

---

     COMENTARIOS

GET http://localhost:3005/api/comments/post/1 → Ver Comentarios de un Post
Headers: ninguno
Raw: ninguno

POST http://localhost:3005/api/comments → Crear Comentario
Headers: x-token: <tu_token>
Raw:
{
    "content": "Este es mi comentario",
    "postId": 1
}

PUT http://localhost:3005/api/comments/<id_del_comentario> → Actualizar Comentario
Headers: x-token: <tu_token>
Raw:
{
    "content": "Comentario actualizado"
}

DELETE http://localhost:3005/api/comments/<id_del_comentario> → Eliminar Comentario
Headers: x-token: <tu_token>
Raw: ninguno