package com.Offre_Emploi.Back.Controller;

import com.Offre_Emploi.Back.Entity.Candidat;
import com.Offre_Emploi.Back.Entity.File;
import com.Offre_Emploi.Back.Entity.Offres;
import com.Offre_Emploi.Back.Service.CandidatService;
import com.Offre_Emploi.Back.Service.FileService;
import com.Offre_Emploi.Back.Service.OffresPriveService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/candidat")
public class CandidatController {

    @Autowired
    private CandidatService candidatService;
    @Autowired
    private FileService fileService;
    @Autowired
    private OffresPriveService offresPriveService;

    @PostMapping("/add")
    public Candidat addCandidat(@RequestBody Candidat candidat){
        return candidatService.addCondidat(candidat);
    }

    @GetMapping("/all")
    public List<Candidat> getAllCandidat(){
        return candidatService.getCondidats();
    }

    @GetMapping("/{id}")
    public Candidat findById(@PathVariable("id") Long id){
        return candidatService.findCandidatById(id);
    }

    @PutMapping("/update")
    public Candidat updateCandidat(@RequestBody Candidat candidat) {
        return candidatService.updateCandidat(candidat);
    }

    @DeleteMapping("/delete/{id}")
    public void deleteCandidat(@PathVariable("id") Long id) {
        candidatService.deleteCandidat(id);
    }

    @GetMapping("/offre_rec/{id}")
    public List<Offres> findByIdOFR(@PathVariable("id") Long id) {
        return offresPriveService.getlist_offre_recommande(id);
    }

    @PostMapping(value = "/add", consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
    public Candidat addCandidat(@RequestPart("candidat") Candidat candidat,
                             @RequestPart("imageFile") MultipartFile file) {
        try {
            File images = uploadFile(file);
            candidat.setImage(images);
            Candidat newCandidat = candidatService.addCondidat(candidat);
            return newCandidat;
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

    @PutMapping(value = "/update/image", consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
    public Candidat updateCandidatImage(@RequestPart("user") Candidat candidat,
                                          @RequestPart("imageFile") MultipartFile file) {
        try {
            File images = uploadFile(file);
            candidat.setImage(images);
            return candidatService.updateCandidatImage(candidat);
        }catch (Exception e){
            System.out.println(e.getMessage());
            return null;
        }
    }


    @PutMapping(value = "/update/cv", consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
    public Candidat updateCandidatCv(@RequestPart("user") Candidat candidat,
                                        @RequestPart("cv") MultipartFile file) {
        try {
            File cv = uploadFile(file);
            candidat.setCv(cv);
            return candidatService.updateCandidatCV(candidat);
        }catch (Exception e){
            System.out.println(e.getMessage());
            return null;
        }
    }

    @PutMapping(value = "/update/lm", consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
    public Candidat updateCandidatLm(@RequestPart("user") Candidat candidat,
                                     @RequestPart("lm") MultipartFile file) {
        try {
            File lm = uploadFile(file);
            candidat.setLettre_motivation(lm);
            return candidatService.updateCandidatLm(candidat);
        }catch (Exception e){
            System.out.println(e.getMessage());
            return null;
        }
    }

    @GetMapping("/competance/{candidatId}/{competanceId}")
    public ResponseEntity<Candidat> addCompetanceToCandidat(@PathVariable("candidatId") long candidatId, @PathVariable("competanceId") long competanceId) {
        candidatService.addCompetanceToCandidat(candidatId, competanceId);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/formation/{candidatId}/{formationId}")
    public ResponseEntity<Candidat> addFormationToCandidat(@PathVariable("candidatId") long candidatId, @PathVariable("formationId") long formationId) {
        candidatService.addFormationToCandidat(candidatId, formationId);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/postulation/{candidatId}/{offreId}/{postulationId}")
    public void addOffreToCandidat(@PathVariable("candidatId") long candidatId,
                                   @PathVariable("offreId") long offreId,
                                   @PathVariable("postulationId") Long postulationId) {
        candidatService.addPostulationToCandidat(candidatId, offreId, postulationId);
    }

   /* @GetMapping("/postulation/{id}")
    public List<Long> findByIdPostulation(@PathVariable("id") Long id){
        List<Candidat> candidats = candidatService.findCandidatByIdPostulation(id);
        List<Long> ids = new ArrayList<>();
        for (int i= 0; i<candidats.size(); i++){
            ids.add(candidats.get(i).getId());
        }
        return ids;
    }*/

    @GetMapping("/postulations/{id}")
    public Candidat findCandidatByIdPostulation(@PathVariable("id") Long id){
        return candidatService.findCandidatByIdPostulation(id);
    }

    @GetMapping("/notification/{id}")
    public Candidat updateNotificationMail(@PathVariable("id") Long id){
        return candidatService.updateCandidatNotification(id);
    }


}