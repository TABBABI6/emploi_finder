package com.Offre_Emploi.Back.Repository;

import com.Offre_Emploi.Back.Entity.Candidat;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CandidatRepository extends JpaRepository<Candidat,Long> {

    Candidat getCandidatsByPostulationsId(Long Id);

}
