package com.Offre_Emploi.Back.Service;

import com.Offre_Emploi.Back.Entity.Candidat;
import com.Offre_Emploi.Back.Entity.Formations;
import com.Offre_Emploi.Back.Repository.FormationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class FormationService {

    @Autowired
    private FormationRepository formationRepository;
    @Autowired
    private CandidatService candidatService;


    public Formations addFormation(Formations formations){
        return formationRepository.save(formations);
    }

    public List<Formations> getFormations(){
       return formationRepository.findAll();
    }

    @Transactional
    public void deleteFormation(Long id, Long idCandidat){
        Candidat candidat = candidatService.findCandidatById(idCandidat);
        Formations formations = findFormationById(id);
        candidat.getFormations().remove(formations);
        formationRepository.deleteById(id);
    }
    @Transactional
    public Formations updateFormation(Formations formations){
        Formations formationUpdate = formationRepository.findById(formations.getId()).orElse(null);
        formationUpdate.setCentre_formation(formations.getCentre_formation());
        formationUpdate.setDate(formations.getDate());
        formationUpdate.setTitre(formations.getTitre());
        return formationUpdate;
    }

    public Formations findFormationById(Long id){
        return formationRepository.findById(id).orElse(null);
    }
}
