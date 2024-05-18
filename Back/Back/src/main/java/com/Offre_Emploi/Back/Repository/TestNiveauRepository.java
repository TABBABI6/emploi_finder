package com.Offre_Emploi.Back.Repository;

import com.Offre_Emploi.Back.Entity.TestNiveau;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TestNiveauRepository extends JpaRepository<TestNiveau,Long> {

    TestNiveau getTestNiveauByScoreTests_Id(Long id);
}
