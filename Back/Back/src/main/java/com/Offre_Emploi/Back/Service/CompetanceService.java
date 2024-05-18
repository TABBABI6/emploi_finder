package com.Offre_Emploi.Back.Service;

import com.Offre_Emploi.Back.Entity.Candidat;
import com.Offre_Emploi.Back.Entity.Competance;
import com.Offre_Emploi.Back.Repository.CompetanceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class CompetanceService {

    @Autowired
    private CompetanceRepository competanceRepository;
    @Autowired
    private CandidatService candidatService;

    public Competance addCompetance(Competance competance){
        return competanceRepository.save(competance);
    }

    public List<Competance> getAllCompetances(){
        return competanceRepository.findAll();
    }

    public Competance findCompetanceById(Long id){
        return competanceRepository.findById(id).orElse(null);
    }

    @Transactional
    public Competance updateCompetance(Competance competance) {
        Competance competanceUpdate = competanceRepository.findById(competance.getId()).orElse(null);
        competanceUpdate.setNom(competance.getNom());
        competanceUpdate.setNiveau(competance.getNiveau());
        return competanceUpdate;
    }

    @Transactional
    public void deleteCompetance(Long id, Long idCandidat){
        Candidat candidat = candidatService.findCandidatById(idCandidat);
        Competance competance = findCompetanceById(id);
        candidat.getCompetances().remove(competance);
        competanceRepository.deleteById(id);
    }}
