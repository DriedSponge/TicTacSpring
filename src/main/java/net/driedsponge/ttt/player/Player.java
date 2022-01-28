package net.driedsponge.ttt.player;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.Random;
import java.util.UUID;

public class Player {
    private String name;
    private UUID token;

    public Player(@JsonProperty("name") String name) {
        this.name = name;
        this.token = UUID.randomUUID();
    }

    @Override
    public String toString() {
        return this.name;
    }


    public String getName() {
        return name;
    }
    public String getToken() {
        return token.toString();
    }

    public void setName(String name) {
        this.name = name;
    }
}
