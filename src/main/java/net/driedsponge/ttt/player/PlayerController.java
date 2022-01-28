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
    public List<Player> getPlayers(@RequestParam(value = "name", defaultValue = "World") String name) {
        return playerService.getPlayers();
    }

    @CrossOrigin(origins = "http://localhost:3000/")
    @GetMapping("/me")
    public Player getPlayer(@RequestHeader("Authorization") String bearer) {
        return playerService.getPlayer(bearer);
    }


    @CrossOrigin(origins = "http://localhost:3000/")
    @PostMapping("login")
    public Player newPlayer(@RequestBody Player player){
        playerService.addPlayer(player);
        return player;
    }
}
