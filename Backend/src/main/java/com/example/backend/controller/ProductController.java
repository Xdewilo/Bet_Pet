package com.example.backend.controller;


import com.example.backend.dto.ProductDTO;
import com.example.backend.dto.ProductMapper;
import com.example.backend.service.ProductService;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/products")
@CrossOrigin(origins = "http://localhost:4200")
public class ProductController {

    private ProductService productService;

    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @GetMapping("/all")
    public List<ProductDTO> getAllProducts() {
        return productService.findAll().stream()
                .map(ProductMapper::toDTO)
                .toList();
    }
    @GetMapping("/category/{id_category}")
    public List<ProductDTO> getAllByCategory(@PathVariable Long id_category){
        return productService.findByCategoryId(id_category).stream()
                .map(ProductMapper::toDTO)
                .toList();
    }
    @GetMapping("/{id}")
    public ResponseEntity<ProductDTO> getProductById(@PathVariable Long id) {
        return productService.findById(id)
                .map(product -> ResponseEntity.ok(ProductMapper.toDTO(product)))
                .orElse(ResponseEntity.notFound().build());

    }

    @PostMapping("/create")
    public ResponseEntity<?> createProduct(@RequestBody ProductDTO productDTO) {
        productService.save(productDTO);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body("Creado exitosamente");
    }

    @PutMapping("/{id}")
    public ResponseEntity<ProductDTO> update(@PathVariable Long id, @RequestBody ProductDTO productDTO) {
        return productService.update(id , productDTO)
                .map(ProductMapper::toDTO)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());

    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        productService.delete(id);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).body("Eliminado exitosamente");
    }


}
