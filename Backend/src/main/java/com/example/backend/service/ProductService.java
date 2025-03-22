package com.example.backend.service;

import com.example.backend.model.Product;
import com.example.backend.model.Animal;
import com.example.backend.model.Category;
import com.example.backend.repository.ProductRepository;
import com.example.backend.repository.AnimalRepository;
import com.example.backend.repository.CategoryRepository;
import com.example.backend.dto.ProductDTO;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProductService {

    private final ProductRepository productRepository;
    private final AnimalRepository animalRepository;
    private final CategoryRepository categoryRepository;

    public ProductService(ProductRepository productRepository, AnimalRepository animalRepository, CategoryRepository categoryRepository) {
        this.productRepository = productRepository;
        this.animalRepository = animalRepository;
        this.categoryRepository = categoryRepository;
    }


    public List<Product> findAll() {
        return productRepository.findAll();
    }

    public Optional<Product> findById(Long id) {
        return productRepository.findById(id);
    }

    public List<Product> findByCategoryId(Long id) {
        return productRepository.findByCategoryId(id);
    }

    public void save(ProductDTO productDTO) {
        Animal animal = animalRepository.findById(productDTO.getAnimalId())
                .orElseThrow(() -> new RuntimeException("Animal no encontrado"));
        Category category = categoryRepository.findById(productDTO.getCategoryId())
                .orElseThrow(() -> new RuntimeException("Categoría no encontrada"));

        Product product = new Product();
        product.setName(productDTO.getName());
        product.setDescription(productDTO.getDescription());
        product.setPrice(productDTO.getPrice());
        product.setStock(productDTO.getStock());
        product.setImage(productDTO.getImage());
        product.setDetail(productDTO.getDetail());
        product.setAnimal(animal);
        product.setCategory(category);




        productRepository.save(product);
    }

    public Optional<Product> update(Long id, ProductDTO productDTO) {
        return productRepository.findById(id).map(existingProduct -> {

            Animal animal = animalRepository.findById(productDTO.getAnimalId())
                    .orElseThrow(() -> new RuntimeException("Animal no encontrado"));
            Category category = categoryRepository.findById(productDTO.getCategoryId())
                    .orElseThrow(() -> new RuntimeException("Categoría no encontrada"));


            existingProduct.setName(productDTO.getName());
            existingProduct.setDescription(productDTO.getDescription());
            existingProduct.setPrice(productDTO.getPrice());
            existingProduct.setStock(productDTO.getStock());
            existingProduct.setImage(productDTO.getImage());
            existingProduct.setDetail(productDTO.getDetail());
            existingProduct.setAnimal(animal);
            existingProduct.setCategory(category);


            return productRepository.save(existingProduct);
        });
    }

    public void delete(Long id) {
        productRepository.deleteById(id);
    }

    public List<Product> search(String keyword) {
        return productRepository.findAll().stream()
                .filter(product -> product.getName().toLowerCase().contains(keyword.toLowerCase()) ||
                        product.getDescription().toLowerCase().contains(keyword.toLowerCase()))
                .toList();
    }
}
