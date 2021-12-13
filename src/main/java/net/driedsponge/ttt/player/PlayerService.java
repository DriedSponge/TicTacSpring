package net.driedsponge.ttt.player;

import org.springframework.stereotype.Service;

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
        if(player.getToken().endsWith(token)) return player;
        return null;
    }
}
