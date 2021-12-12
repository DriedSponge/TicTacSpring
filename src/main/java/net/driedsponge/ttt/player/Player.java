package net.driedsponge.ttt.player;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.Random;

public class Player {
    private final Long id;
    private String name;


    public Player(@JsonProperty("name") String name) {
        Long id1;
        this.name = name;
        long id = new Random().nextLong();
        if(id < 0L){
            id = id * (-1L);
        }
        this.id = id;
    }

    @Override
    public String toString() {
        return String.format("%s (%s)",this.name, this.id);
    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
