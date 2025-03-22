package com.example.backend.controller;

import com.example.backend.model.Favorite;
import com.example.backend.service.FavoriteService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/favorites")
@CrossOrigin(origins = "http://localhost:4200")
public class FavoriteController {

    private final FavoriteService favoriteService;

    public FavoriteController(FavoriteService favoriteService) {
        this.favoriteService = favoriteService;
    }

    @GetMapping("/{userEmail}")
    public List<Favorite> getFavoritesByUser(@PathVariable String userEmail) {
        return favoriteService.getFavoritesByUser(userEmail);
    }

    @PostMapping("/add")
    public ResponseEntity<?> addToFavorites(@RequestBody Favorite favorite) {
        favoriteService.addToFavorites(favorite);
        return ResponseEntity.ok("Added to favorites");
    }

    @DeleteMapping("/{id_favorite}")
    public ResponseEntity<?> removeFromFavorites(@PathVariable Long id_favorite) {
        favoriteService.removeFromFavorites(id_favorite);
        return ResponseEntity.ok("Removed from favorites");
    }
}
