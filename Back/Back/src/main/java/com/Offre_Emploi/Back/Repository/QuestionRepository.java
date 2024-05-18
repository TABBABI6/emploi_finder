package com.Offre_Emploi.Back.Repository;

import com.Offre_Emploi.Back.Entity.Question;
import org.springframework.data.jpa.repository.JpaRepository;

public interface QuestionRepository extends JpaRepository<Question,Long> {
}
