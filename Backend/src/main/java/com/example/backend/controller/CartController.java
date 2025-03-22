package com.example.backend.controller;

import com.example.backend.model.Cart;
import com.example.backend.service.CartService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/cart")
@CrossOrigin(origins = "http://localhost:4200")
public class CartController {


    private final CartService cartService;

    public CartController(CartService cartService) {
        this.cartService = cartService;
    }



    @GetMapping("/{userEmail}")
    public List<Cart> getCartByUser(@PathVariable String userEmail){
        return cartService.getCartByUser(userEmail);
    }



    @PostMapping("/add")
    public ResponseEntity<?> addToCart(@RequestBody Cart cart) {
        cartService.addToCart(cart);
        return ResponseEntity.ok("Added to cart");
    }


    @DeleteMapping("/{idCart}")
    public ResponseEntity<?> removeFromCart(@PathVariable Long idCart) {
        cartService.deleteByIdCart(idCart);
        return ResponseEntity.ok("Removed from cart");
    }
}
