package com.Offre_Emploi.Back.Controller;

import com.Offre_Emploi.Back.Entity.Candidat;
import com.Offre_Emploi.Back.Entity.Offres;
import com.Offre_Emploi.Back.Entity.Recruteur;
import com.Offre_Emploi.Back.Entity.TestNiveau;
import com.Offre_Emploi.Back.Service.OffresPriveService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/offres")
public class OffrePriveController {



    @Autowired
    private OffresPriveService offresPriveService;


    @PostMapping("/add")
    public Offres addOffre(@RequestBody Offres offres){
         return offresPriveService.addOffre(offres);
    }

    @GetMapping("/all")
    public ResponseEntity<List<Offres>> getAllOffres(){
        List<Offres> offres1 = offresPriveService.getOffres();
        return new ResponseEntity<>(offres1, HttpStatus.OK);
    }

    @GetMapping("/all/cy")
    public ResponseEntity<List<Offres>> getAllOffresByYear(){
        List<Offres> offres1 = offresPriveService.getOffresAnneeCourante();
        return new ResponseEntity<>(offres1, HttpStatus.OK);
    }

    @GetMapping("/{recruteurId}/{offreId}")
    public ResponseEntity<Recruteur> addOffreToRecruteur(@PathVariable("recruteurId") long recruteurId, @PathVariable("offreId") long offreId) {
        offresPriveService.addOffreToRecruteur(recruteurId,offreId);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    public void deleteOffre(@PathVariable("id") Long id) {
        offresPriveService.deleteOffre(id);
    }

    @GetMapping("/{id}")
    public Offres findById(@PathVariable("id") Long id){
        return offresPriveService.findById(id);
    }

    @PutMapping("/update")
    public Offres updateOffre(@RequestBody Offres offres) {
        return offresPriveService.updateOffre(offres);
    }

    @GetMapping("/postulations/{id}")
    public Offres findOffresByIdPostulation(@PathVariable("id") Long id){
        return offresPriveService.findOffresByIdPostulation(id);
    }

    @GetMapping("/testadd/{idoffre}/{idtest}")
    public Offres addTestToOffre(@PathVariable("idoffre") Long idoffre, @PathVariable("idtest") Long idtest) {
        return offresPriveService.addTestToOffre(idoffre, idtest);
    }

    @GetMapping("/testrem/{idoffre}/{idtest}")
    public void deleteTestfromOffre(@PathVariable("idoffre") Long idoffre, @PathVariable("idtest") Long idtest) {
        offresPriveService.deleteTestFromOffre(idoffre, idtest);
    }
}
