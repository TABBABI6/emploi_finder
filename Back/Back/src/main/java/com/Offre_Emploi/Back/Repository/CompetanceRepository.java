package com.Offre_Emploi.Back.Repository;

import com.Offre_Emploi.Back.Entity.Competance;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CompetanceRepository extends JpaRepository<Competance,Long> {
}
