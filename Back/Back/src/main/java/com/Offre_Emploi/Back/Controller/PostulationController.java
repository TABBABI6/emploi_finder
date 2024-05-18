package com.Offre_Emploi.Back.Controller;

import com.Offre_Emploi.Back.Entity.Candidat;
import com.Offre_Emploi.Back.Entity.File;
import com.Offre_Emploi.Back.Entity.Postulation;
import com.Offre_Emploi.Back.Service.FileService;
import com.Offre_Emploi.Back.Service.PostulationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;


@RestController
@RequestMapping("/postulation")
public class PostulationController {

    @Autowired
    private PostulationService postulationService;
    @Autowired
    private FileService fileService;

    @PostMapping("/add")
    public Postulation addPostulation(@RequestBody Postulation postulation){
        return postulationService.addPostulation(postulation);
    }

    @GetMapping("/{id}")
    public Postulation findPostulationById(@PathVariable("id") Long id){
        return postulationService.findPostulationById(id);
    }

    @DeleteMapping("/delete/{id}")
    public void deletePostulation(@PathVariable("id") Long id) {
        postulationService.deletePostulation(id);
    }

    @PutMapping("/update")
    public Postulation updatePostulation(@RequestBody Postulation postulation) {
        return postulationService.updatePostulation(postulation);
    }

    @PutMapping(value = "/update/cv", consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
    public Postulation updatePostulationCv(@RequestPart("postulation") Postulation postulation,
                                     @RequestPart("cv") MultipartFile file) {
        try {
            File cv = uploadFile(file);
            postulation.setCv(cv);
            return postulationService.updatePostulationCV(postulation);
        }catch (Exception e){
            System.out.println(e.getMessage());
            return null;
        }
    }

    @PutMapping(value = "/update/cv/candidat/cv")
    public Postulation updatePostulationCvCandidatCV(@RequestBody Postulation postulation) {
        return postulationService.updatePostulationCVUserCV(postulation);
    }

    @PutMapping(value = "/update/lm", consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
    public Postulation updatePostulationLm(@RequestPart("postulation") Postulation postulation,
                                           @RequestPart("lm") MultipartFile file) {
        try {
            File lm = uploadFile(file);
            postulation.setLettre_motivation(lm);
            return postulationService.updatePostulationLM(postulation);
        }catch (Exception e){
            System.out.println(e.getMessage());
            return null;
        }
    }

    public File uploadFile(MultipartFile multipartFiles) throws IOException {
        File file = new File(
                multipartFiles.getOriginalFilename(),
                multipartFiles.getContentType(),
                multipartFiles.getBytes()
        );
        fileService.addFile(file);
        return file;
    }
}
