package com.springframework.frommyeyes.service;

import com.springframework.frommyeyes.model.dto.CategoriesDto;
import com.springframework.frommyeyes.model.entity.Categories;
import com.springframework.frommyeyes.model.mapper.CategoriesMapper;
import com.springframework.frommyeyes.repository.CategoriesRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CategoriesService {

    private final CategoriesRepository categoriesRepository;

    public Page<CategoriesDto> getAllCategories(Pageable pageable) {

        Page<Categories> categories = categoriesRepository.findAll(pageable);

        return categories.map(CategoriesMapper::mapTo);
    }

}
