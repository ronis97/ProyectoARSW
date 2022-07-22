package edu.escuelaing.arsw.proyecto.entities;

import java.util.ArrayList;
import java.util.List;

/**
 * Tablero del juego, guarda la informacion de todas las figuras dibujadas
 */
public class Board {

    private List<Point> pointList = new ArrayList<Point>();
    private static final Board instance = new Board();
    private Color currentColor;

    public static Board getInstance() {
        return instance;
    }

    public Color getCurrentColor() {
        return currentColor;
    }

    public void setCurrentColor(Color currentColor) {
        this.currentColor = currentColor;
    }

    public void addPoint(Point point) {
        if (!pointList.contains(point)) {
            pointList.add(point);
        }

    }

    public void changePointsPosition(Coordinate coordinate){
        int position = coordinate.getPosition();
        int x = coordinate.getX();
        int y = coordinate.getY();
        pointList.get(position).setX(x);
        pointList.get(position).setY(y);
    }

    public void restart() {
        pointList.clear();
    }

    public List<Point> getPointList() {
        return pointList;
    }

    public void setPointList(List<Point> pointList) {
        this.pointList = pointList;
    }

    public void eraseLast() {
        pointList.remove(pointList.size() - 1);
    }

    /**
     * Valida la posicion de una figura antes de ubicarla
     * @param x coordenada x
     * @param y coordenada y
     * @return si es posible ubicarla
     */
    public boolean isValid(int x, int y) {
        boolean isValid = true;
        for (Point i : pointList) {
            if (i.getX() == x && i.getY() == y) {
                isValid = false;
                break;
            }
        }
        return isValid;
    }

}