package net.driedsponge.ttt.player;

import org.apache.coyote.Response;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.UUID;

@Service
public class PlayerService {

    private HashMap<Long,Player> players = new HashMap<Long, Player>();

    public List<Player> getPlayers() {
        return List.of(
                new Player("Jordan")
        );
    }

    public void addPlayer(Player player){
        players.put(player.getId(),player);
    }

    public Player getPlayer(Long id, String token){

        Player player =  players.get(id);
        if(player != null && player.getToken().endsWith(token)) return player;
        throw new ResponseStatusException(
                HttpStatus.NOT_FOUND, "Player not found. Please login."
        );
    }
}
