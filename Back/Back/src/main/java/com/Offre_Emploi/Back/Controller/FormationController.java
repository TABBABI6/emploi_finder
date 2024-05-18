package com.Offre_Emploi.Back.Controller;

import com.Offre_Emploi.Back.Entity.Competance;
import com.Offre_Emploi.Back.Entity.Formations;
import com.Offre_Emploi.Back.Service.FormationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/formation")
public class FormationController {

    @Autowired
    private FormationService formationService;


    @PostMapping("/add")
    public Formations addFormation(@RequestBody Formations formations){
        return formationService.addFormation(formations);
    }

    @PutMapping("/update")
    public Formations updateFormation(@RequestBody Formations formations) {
        return formationService.updateFormation(formations);
    }

    @GetMapping("/{id}")
    public Formations findById(@PathVariable("id") Long id){
        return formationService.findFormationById(id);
    }


    @DeleteMapping("/delete/{id}/{idf}")
    public void deleteFormation(@PathVariable("id") Long id, @PathVariable("idf") Long idf) {
        formationService.deleteFormation(id, idf);
    }


}
