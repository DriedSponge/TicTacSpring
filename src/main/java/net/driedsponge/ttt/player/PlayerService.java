package net.driedsponge.ttt.player;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PlayerService {
    public List<Player> getPlayers() {
        return List.of(
                new Player("Jordan")
        );
    }
}
