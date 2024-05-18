package com.Offre_Emploi.Back.Repository;

import com.Offre_Emploi.Back.Entity.Candidat;
import com.Offre_Emploi.Back.Entity.ScoreTest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ScoreRepository extends JpaRepository<ScoreTest, Long> {


    List<ScoreTest> getScoreTestsByCandidat_Id(Long candidatId);
}
