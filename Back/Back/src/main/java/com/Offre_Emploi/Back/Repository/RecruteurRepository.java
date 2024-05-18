package com.Offre_Emploi.Back.Repository;

import com.Offre_Emploi.Back.Entity.Recruteur;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RecruteurRepository extends JpaRepository<Recruteur,Long> {

    public Recruteur getRecruteurByOffresId(Long Id);
}
