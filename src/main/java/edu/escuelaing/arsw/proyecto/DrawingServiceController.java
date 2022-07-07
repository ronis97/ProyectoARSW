package edu.escuelaing.arsw.proyecto;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;

import edu.escuelaing.arsw.proyecto.entities.Point;
import edu.escuelaing.arsw.proyecto.entities.Board;

import java.util.List;
import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

@RestController
public class DrawingServiceController {

    @Resource
    private HttpServletRequest request;

    @GetMapping("/status")
    public String status() {
        return "{\"status\":\"Greetings from Spring Boot. " +
                java.time.LocalDate.now() + ", " +
                java.time.LocalTime.now() +
                ". " + "The server is Runnig!\"}";
    }

    @GetMapping("/setname")
    public String stringRequest(@RequestParam(value = "name", defaultValue = "World") String name){
        return null;
    }

    @GetMapping("/drawpoints")
    public List<Point> getAllPoints(){
        System.out.print(Board.getInstance().getPointList().size());
        //System.out.println(Board.getInstance().getPointList().get(0).getUserName());
        return Board.getInstance().getPointList();
    }

    @PostMapping("/drawpoints")
    public void addPoints(@RequestBody Point point){
        Board.getInstance().addPoint(point);
    }

    @PostMapping("/restart")
    public void restart(){
        Board.getInstance().restart();
    }

    @PostMapping("/eraseLast")
    public void eraseLastObject(){
        Board.getInstance().eraseLast();
    }

    

}
