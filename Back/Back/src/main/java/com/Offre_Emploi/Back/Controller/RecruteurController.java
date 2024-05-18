package com.Offre_Emploi.Back.Controller;

import com.Offre_Emploi.Back.Entity.File;
import com.Offre_Emploi.Back.Entity.Recruteur;
import com.Offre_Emploi.Back.Entity.TestNiveau;
import com.Offre_Emploi.Back.Service.FileService;
import com.Offre_Emploi.Back.Service.RecruteurService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/recruteur")
public class RecruteurController {

    @Autowired
    private RecruteurService recruteurService;
    @Autowired
    private FileService fileService;


    @PostMapping(value = "/add", consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
    public Recruteur addRecruteur(@RequestPart("recruteur") Recruteur recruteur,
                                @RequestPart("imageFile") MultipartFile file) {
        try {
            File images = uploadImage(file);
            recruteur.setImage(images);
            Recruteur newRecruteur = recruteurService.addRecruteur(recruteur);
            return newRecruteur;
        }catch (Exception e){
            System.out.println(e.getMessage());
            return null;
        }
    }
    public File uploadImage(MultipartFile multipartFiles) throws IOException {
        File file = new File(
                multipartFiles.getOriginalFilename(),
                multipartFiles.getContentType(),
                multipartFiles.getBytes()
        );
        fileService.addFile(file);
        return file;
    }

    @PutMapping(value = "/update/image", consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
    public Recruteur updateRecruteurImage(@RequestPart("user") Recruteur recruteur,
                                          @RequestPart("imageFile") MultipartFile file) {
        try {
            File images = uploadImage(file);
            recruteur.setImage(images);
            return recruteurService.updateRecruteurImage(recruteur);
        }catch (Exception e){
            System.out.println(e.getMessage());
            return null;
        }
    }

    @GetMapping("/all")
    public List<Recruteur> addRecruteur(){
        return recruteurService.getRecruteurs();
    }

    @PutMapping("/update")
    public Recruteur updateRecruteur(@RequestBody Recruteur recruteur) {
        return recruteurService.updateRecruteur(recruteur);
    }

    @DeleteMapping("/delete/{id}")
    public void deleteRecruteur(@PathVariable("id") Long id) {
        recruteurService.deleteRecruteur(id);
    }

    @GetMapping("/{id}")
    public Recruteur findById(@PathVariable("id") Long id){
        return recruteurService.findRecruteurById(id);
    }

    @GetMapping("/offre/{id}")
    public Recruteur findByIdOffer(@PathVariable("id") Long id){
        return recruteurService.findRecruteurByIdOffre(id);
    }


    @GetMapping("/{idrecruteur}/{idtest}")
    public Recruteur addTestToRecruteur(@PathVariable("idrecruteur") Long idrecruteur, @PathVariable("idtest") Long idtest) {
        return recruteurService.addTestToRecruteur(idrecruteur, idtest);
    }

}
