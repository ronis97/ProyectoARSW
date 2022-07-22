package edu.escuelaing.arsw.proyecto;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.util.Collections;

/**
 * Clase inicializadora
 */
@SpringBootApplication
public class DrawingFigurinesAppStarter {

    /**
     * Inicializador
     * @param args parametro java
     */
    public static void main(String[] args){
        SpringApplication app = new SpringApplication(DrawingFigurinesAppStarter.class);
        app.setDefaultProperties(Collections
                .singletonMap("server.port", getPort()));
        app.run(args);
    }

    /**
     * Retorna el puerto al que se realizara la conexion TCP, predeterminado es el 8080
     * @return numero del puerto
     */
    static int getPort() {
        if (System.getenv("PORT") != null) {
            return Integer.parseInt(System.getenv("PORT"));
        }
        return 8080; //returns default port if heroku-port isn't set (i.e. on localhost)
    }
}
