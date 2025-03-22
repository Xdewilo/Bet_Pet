package com.example.backend.dto;


import com.example.backend.model.Animal;
import com.example.backend.model.Category;
import com.example.backend.model.Product;
import com.example.backend.repository.AnimalRepository;
import com.example.backend.repository.CategoryRepository;

public class ProductMapper {

    public static ProductDTO toDTO(Product product) {
        return new ProductDTO(
                product.getId(),
                product.getName(),
                product.getPrice(),
                product.getStock(),
                product.getDescription(),
                product.getImage(),
                product.getDetail(),
                product.getAnimal().getId(),
                product.getCategory().getId()
        );
    }

    public static Product toEntity(ProductDTO productDTO, AnimalRepository animalRepository, CategoryRepository categoryRepository) {

        Animal animal = animalRepository.findById(productDTO.getAnimalId())
                .orElseThrow(() -> new RuntimeException("Animal no encontrado"));
        Category category = categoryRepository.findById(productDTO.getCategoryId())
                .orElseThrow(() -> new RuntimeException("Categoría no encontrada"));

        Product product = new Product();
        product.setId(productDTO.getId());
        product.setName(productDTO.getName());
        product.setPrice(productDTO.getPrice());
        product.setStock(productDTO.getStock());
        product.setDescription(productDTO.getDescription());
        product.setImage(productDTO.getImage());
        product.setDetail(productDTO.getDetail());
        product.setAnimal(animal);
        product.setCategory(category);

        return product;
    }
}
