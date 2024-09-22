import swaggerJsdoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Technical Test",
      version: "1.0.0",
      description: "[/api/v3/api-docs](http://localhost:5003/api/v3/api-docs)",
    },
    servers: [
      {
        url: "http://localhost:5001",
      },
      {
        url: "http://localhost:5003",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ["src/routes/*.js"],
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;
