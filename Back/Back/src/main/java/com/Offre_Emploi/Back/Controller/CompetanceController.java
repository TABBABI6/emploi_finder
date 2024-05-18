package com.Offre_Emploi.Back.Controller;

import com.Offre_Emploi.Back.Entity.Competance;
import com.Offre_Emploi.Back.Service.CompetanceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/competance")
public class CompetanceController {

    @Autowired
    private CompetanceService competanceService;

    @PostMapping("/add")
    public Competance addCompetance(@RequestBody Competance competance){
        return competanceService.addCompetance(competance);
    }

    @GetMapping("/all")
    public List<Competance> getAllCompetance(){
        return competanceService.getAllCompetances();
    }

    @GetMapping("/{id}")
    public Competance findById(@PathVariable("id") Long id){
        return competanceService.findCompetanceById(id);
    }

    @PutMapping("/update")
    public Competance updateCompetance(@RequestBody Competance competance) {
        return competanceService.updateCompetance(competance);
    }

    @DeleteMapping("/delete/{id}/{idc}")
    public void deleteCompetance(@PathVariable("id") Long id, @PathVariable("idc") Long idc) {
        competanceService.deleteCompetance(id, idc);
    }
}
