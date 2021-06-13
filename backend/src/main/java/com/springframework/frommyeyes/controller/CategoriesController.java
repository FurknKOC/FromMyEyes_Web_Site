package com.springframework.frommyeyes.controller;

import com.springframework.frommyeyes.model.dto.CategoriesDto;
import com.springframework.frommyeyes.model.dto.UserDto;
import com.springframework.frommyeyes.model.dto.UserRequest;
import com.springframework.frommyeyes.service.CategoriesService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class CategoriesController extends BaseController {

    private final CategoriesService categoriesService;

    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @GetMapping(value = GET_CATEGORIES)
    public Page<CategoriesDto> getUser(Pageable pageable) {
        return categoriesService.getAllCategories(pageable);
    }

}
