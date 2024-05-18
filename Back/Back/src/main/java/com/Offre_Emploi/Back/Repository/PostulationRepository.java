package com.Offre_Emploi.Back.Repository;

import com.Offre_Emploi.Back.Entity.Postulation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PostulationRepository extends JpaRepository<Postulation,Long> {
}
