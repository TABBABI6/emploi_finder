package com.Offre_Emploi.Back.Controller;

import com.Offre_Emploi.Back.Service.FileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/image")
public class FileController {


    @Autowired
    private FileService fileService;


    @DeleteMapping("/delete/{id}")
    public void deleteImage(@PathVariable("id") Long id) {
        fileService.deleteFile(id);
    }

}
