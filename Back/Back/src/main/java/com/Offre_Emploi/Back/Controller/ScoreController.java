package com.Offre_Emploi.Back.Controller;

import com.Offre_Emploi.Back.Entity.Candidat;
import com.Offre_Emploi.Back.Entity.Recruteur;
import com.Offre_Emploi.Back.Entity.ScoreTest;
import com.Offre_Emploi.Back.Repository.ScoreRepository;
import com.Offre_Emploi.Back.Service.ScoreService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/scoretest")
public class ScoreController {

    @Autowired
    private ScoreService scoreService;
    @Autowired
    private ScoreRepository scoreRepository;

    @PostMapping( "/add")
    public ScoreTest addRecruteur(@RequestBody ScoreTest scoreTest) {
       return scoreService.addScoreTest(scoreTest);
    }

    @GetMapping("/candidat/{id}")
    public List<ScoreTest> findByIdCandidat(@PathVariable("id") Long id){
        return scoreRepository.getScoreTestsByCandidat_Id(id);
    }

}
