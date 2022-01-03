package net.driedsponge.ttt.player;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "v1/player")
public class PlayerController {

    private final PlayerService playerService;

    @Autowired
    public PlayerController(PlayerService playerService) {
        this.playerService = playerService;
    }

    @GetMapping("/")
    public List<Player> getPlayer(@RequestParam(value = "name", defaultValue = "World") String name) {
        return playerService.getPlayers();
    }

    @GetMapping("/me")
    public Player getPlayer(@RequestHeader("Authorization") String bearer, @RequestBody Player player) {
        System.out.println(bearer);
        return playerService.getPlayer(player.getId(), bearer);
    }


    @PostMapping
    public Player newPlayer(@RequestBody Player player){
        return player;
    }
}
