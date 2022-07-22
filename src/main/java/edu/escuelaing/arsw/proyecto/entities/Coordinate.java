package edu.escuelaing.arsw.proyecto.entities;

/**
 * Clase que maneja la informacion de los cambios
 * en las figuras, usa las coordenadas (x,y) de la figura
 * y su posicion en el array de figuras en el tablero
 */
public class Coordinate {
    private int x;
    private int y;
    private int position;
    public int getX(){
        return this.x;
    }
    
    public void setX(int x){
        this.x = x;
    }

    public int getY(){
        return this.y;
    }

    public void setY(int y){
        this.y = y;
    }

    public int getPosition() {
        return position;
    }

    public void setPosition(int position) {
        this.position = position;
    }
}
