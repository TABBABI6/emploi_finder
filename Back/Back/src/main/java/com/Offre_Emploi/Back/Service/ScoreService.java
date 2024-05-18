package com.Offre_Emploi.Back.Service;

import com.Offre_Emploi.Back.Entity.ScoreTest;
import com.Offre_Emploi.Back.Repository.ScoreRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ScoreService {

    @Autowired
    private ScoreRepository scoreRepository;


    public ScoreTest addScoreTest(ScoreTest scoreTest){
        return scoreRepository.save(scoreTest);
    }

}
