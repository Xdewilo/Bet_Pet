package com.example.backend.service;

import com.example.backend.model.Favorite;
import com.example.backend.repository.FavoriteRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class FavoriteService {


    private final FavoriteRepository favoriteRepository;

    public FavoriteService(FavoriteRepository favoriteRepository) {
        this.favoriteRepository = favoriteRepository;
    }

    public List<Favorite> getFavoritesByUser(String userEmail) {
        return favoriteRepository.findByUserEmail(userEmail);
    }

    public void addToFavorites(Favorite favorite) {
        boolean exists = favoriteRepository.existsByUserEmailAndProductId(
                favorite.getUserEmail(),
                favorite.getProduct().getId()
        );

        if (!exists) {
            favoriteRepository.save(favorite);
        } else {
            throw new IllegalArgumentException("Product already in favorites");
        }

    }

    @Transactional
    public void removeFromFavorites(Long id_favorite) {
        favoriteRepository.deleteById(id_favorite);
    }
}
