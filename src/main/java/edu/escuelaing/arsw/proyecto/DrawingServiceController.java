package edu.escuelaing.arsw.proyecto;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;

import edu.escuelaing.arsw.proyecto.entities.Point;
import edu.escuelaing.arsw.proyecto.entities.Board;
import edu.escuelaing.arsw.proyecto.entities.Color;
import edu.escuelaing.arsw.proyecto.entities.Coordinate;

import java.util.List;
import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

@RestController
public class DrawingServiceController {


    @Resource
    private HttpServletRequest request;

    /**
     * Prueba del servidor corriendo exitosamente
     * @return una pagina web sencilla en la que notifica el momento actual de la consulta
     */
    @GetMapping("/status")
    public String status() {
        return "{\"status\":\"Greetings from Spring Boot. " +
                java.time.LocalDate.now() + ", " +
                java.time.LocalTime.now() +
                ". " + "The server is Runnig!\"}";
    }

    /**
     * Devuelve la lista de figuras hechas en el tablero
     * @return la lista con las figuras
     */
    @GetMapping("/drawpoints")
    public List<Point> getAllPoints(){
        return Board.getInstance().getPointList();
    }

    /**
     * Agrega una figura al tablero
     * @param point La figura que sera agregada, este
     *              objeto es un diccionario con cada dato especificado
     *              en el cliente.
     */
    @PostMapping("/drawpoints")
    public void addPoints(@RequestBody Point point){
        Board.getInstance().addPoint(point);
    }

    /**
     * Elimina todas las figuras guardadas en el tablero
     */
    @PostMapping("/restart")
    public void restart(){
        Board.getInstance().restart();
    }

    /**
     * Borra la ultima figura realizada
     */
    @PostMapping("/eraseLast")
    public void eraseLastObject(){
        Board.getInstance().eraseLast();
    }

    /**
     * Cambia las coordenadas (x,y) de una figura con el indice
     * especificado en el objeto coordinate
     * @param coordinate El objeto con la informacion de las coordenadas
     *                   y su posicion en el array de figuras
     */
    @PostMapping("/getNewCoordinates")
    public void changePointsPosition(@RequestBody Coordinate coordinate){
        Board.getInstance().changePointsPosition(coordinate);;
    }
}
