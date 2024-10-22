# User Roles API

This is an API to handle users based on roles, built with [NestJS](https://nestjs.com) and [Prisma](https://www.prisma.io).

## Instructions to set up

Clone this repository and run the following commands:

```bash
# Install dependencies
npm install

# Run the app in development mode
npm run start:dev
```

### Testing the API

This API can be tested through `http://localhost:3000`.

To access Swagger documentation, go to `http://localhost:3000/api`.

An access token is required to perform basic CRUD operations, so it can be obtained by logging in with email and password with the endpoint `/auth/login`.

### Environment variables

The following environment variables are required:

- `DATABASE_URL`: The URL of the database to connect to.
- `JWT_SECRET`: The secret key used to sign the JWT tokens.

## Additional questions

● ¿Es necesario crear un endpoint logout?

No es necesario. Es una opción en algunos sistemas, en caso de que, por ejemplo, queramos guardar un tiempo de sesión en la base de datos. En ese caso, podemos marcar la sesión como expirada, y asegurarnos de que ese usuario no pueda acceder a la API sin volver a iniciar sesión. Esto puede ayudar a prevenir un robo de token y otros fallos de seguridad.

● La funcionalidad “Dar de baja” se puede hacer de varias formas, explica al menos 3 formas que se podría hacer.

- Eliminando el usuario de la base de datos. Se puede eliminar al usuario directamente para que su información no continúe en la base de datos. Puede ser algo útil de cara a ciertas normativas relacionadas con la protección de datos personales, pero generalmente perder información no es la práctica peferible.
- Marcando al usuario como inactivo. Esto nos ayuda a que el usuario no tenga accesso al sistema, sin embargo un administrador podría volver a activar al usuario eventualmente. Conservaríamos los datos de usuario, lo cual es importante, y preferible frente a la anterior opción.
- Marcando al usuario como eliminado. En este caso, los usuarios no aparecerían en los resultados de la API ni siquiera para los administradores. El usuario está en la base de datos, pero sería invisible. Solamente un acceso a la base de datos por parte de un técnico, o un endpoint específicos habilitado para ciertos administradores - o todos - permitiría la lectura de esta información.


