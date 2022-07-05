package edu.escuelaing.arsw.proyecto.entities;

public class Point {
    private int x;
    private int y;
    private String type;
    private int size;
    private String nameuser;


    public int getX() {
        return x;
    }

    public void setX(int x) {
        this.x = x;
    }

    public int getY() {
        return y;
    }

    public void setY(int y) {
        this.y = y;
    }

    public String getType(){
        return this.type;
    }

    public void setType(String type){
        this.type = type;
    }

    public int getSize(){
        return this.size;
    }

    public void setSize(int size){
        this.size = size;
    }

    public String getnameuser(){
        return this.nameuser;
    }

    public void setnameuser(String nameuser){
        this.nameuser = nameuser;
    }

    
}