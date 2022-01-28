package net.driedsponge.ttt.player;

import org.apache.coyote.Response;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.*;

@Service
public class PlayerService {

    private Map<String,Player> players = new HashMap<String, Player>();
    public List<Player> getPlayers() {
        return List.of(
                new Player("Jordan")
        );
    }

    public void addPlayer(Player player){
        players.put(player.getToken(),player);
    }

    public Player getPlayer(String token){
        Player player =  players.get(token.split(" ")[1]);
        if(player != null) return player;
        throw new ResponseStatusException(
                HttpStatus.NOT_FOUND, "Player not found. Please login."
        );
    }
}
