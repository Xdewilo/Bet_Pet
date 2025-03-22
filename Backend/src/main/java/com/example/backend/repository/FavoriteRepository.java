package com.example.backend.repository;

import com.example.backend.model.Favorite;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface FavoriteRepository extends JpaRepository<Favorite,Long> {
List<Favorite> findByUserEmail(String userEmail);

boolean existsByUserEmailAndProductId(String userEmail, Long productId);

}
