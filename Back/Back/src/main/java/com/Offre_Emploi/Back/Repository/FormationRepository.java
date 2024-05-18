package com.Offre_Emploi.Back.Repository;

import com.Offre_Emploi.Back.Entity.Formations;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FormationRepository extends JpaRepository<Formations,Long> {
}
