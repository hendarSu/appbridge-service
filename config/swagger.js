module.exports = {
    swaggerOption: {
        definition: {
            openapi: "3.1.0",
            info: {
                title: "AppBridge API",
                version: "0.1.0",
                description:
                    "The AppBridge project is an open-source tool created to simplify the process of connecting external applications to your webstore and generating the required authentication to access store data. It is a powerful and flexible solution that enables developers to integrate with your webstore.",
                license: {
                    name: "MIT",
                    url: "https://spdx.org/licenses/MIT.html",
                },
                contact: {
                    name: "Hendar",
                    url: "https://github.com/hendarSu",
                    email: "hendar@clodeo.com",
                    phone: "+6281394449218"
                },
            },
            servers: [
                {
                    url: "http://localhost:" + process.env.PORT,
                },
                {
                    url: "https://api.student.literacode.com",
                },
            ],
            security: [{
                bearerAuth: []
            }],
            components: {
                securitySchemes: {
                    bearerAuth: {
                        type: 'http',
                        scheme: 'bearer',
                        bearerFormat: 'JWT',
                    }
                },
                schemas: {
                    UserRegistration: {
                        required: ["email", "password", "confimationPassword"],
                        type: "object",
                        properties: {
                            name: {
                                type: "string",
                                description: "User name",
                                example: "Hendar"
                            },
                            email: {
                                type: "string",
                                description: "User email",
                                example: "hendar@clodeo.com"
                            },
                            password: {
                                type: "string",
                                description: "User password",
                                example: "12345"
                            },
                            confimationPassword: {
                                type: "string",
                                description: "User confimation password",
                                example: "12345"
                            },
                        }
                    }
                }
            }
        },
        apis: ["./routers/*.js", "./routers/**/*.js"],
    }
};
