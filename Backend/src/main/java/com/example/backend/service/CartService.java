package com.example.backend.service;

import com.example.backend.model.Cart;
import com.example.backend.repository.CartRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class CartService {


    private final CartRepository cartRepository;

    public CartService(CartRepository cartRepository) {
        this.cartRepository = cartRepository;
    }


    public List<Cart> getCartByUser(String userEmail){
        return cartRepository.findByUserEmail(userEmail);
    }

    public void addToCart(Cart cart) {
        cartRepository.save(cart);
    }

    @Transactional
    public void deleteByIdCart(Long idCart) {
        cartRepository.deleteById(idCart);
    }

}
