package edu.escuelaing.arsw.proyecto.entities;

import java.util.ArrayList;
import java.util.List;

public class Board {

    private List<String> userList = new ArrayList<String>();
    private List<Point> pointList = new ArrayList<Point>();
    private static final Board instance = new Board();

    public static Board getInstance(){
        return instance;
    }

    public void addUser(String user){
        userList.add(user);
    }

    public void addPoint(Point point){
        if(!pointList.contains(point)){
            pointList.add(point);
        }

    }

    public void restart(){
        pointList.clear();
    }

    public List<String> getUserList() {
        return userList;
    }

    public void setUserList(List<String> userList) {
        this.userList = userList;
    }

    public List<Point> getPointList() {
        return pointList;
    }

    public void setPointList(List<Point> pointList) {
        this.pointList = pointList;
    }

    public void eraseLast(){
        pointList.remove(pointList.size()-1);
    }

    public boolean isValid(int x, int y){
        boolean isValid = true;
        for (Point i: pointList){
            if (i.getX() == x && i.getY() == y){ 
                isValid = false;
                break;
            }
        }
        return isValid;
    }


}