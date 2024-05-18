package com.Offre_Emploi.Back.Service;

import com.Offre_Emploi.Back.Entity.*;
import com.Offre_Emploi.Back.Repository.*;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@AllArgsConstructor
public class CandidatService {

    private CandidatRepository candidatRepository;
    private CompetanceRepository competanceRepository;
    private FormationRepository formationRepository;
    private OffrePriveRepository offrePriveRepository;

    private PostulationRepository postulationRepository;
    private TestNiveauRepository testNiveauRepository;
    private ScoreRepository scoreRepository;

    public Candidat addCondidat(Candidat candidat){
        candidat.setRole("Condidat");
        return candidatRepository.save(candidat);
    }

    public List<Candidat> getCondidats(){
        return candidatRepository.findAll();
    }

    @Transactional
    public void deleteCandidat(Long id){
        List<ScoreTest> scoreTests = scoreRepository.getScoreTestsByCandidat_Id(id);
        for (ScoreTest scoreTest: scoreTests){
            TestNiveau testNiveau = testNiveauRepository.getTestNiveauByScoreTests_Id(scoreTest.getId());
            testNiveau.getScoreTests().remove(scoreTest);
            scoreRepository.delete(scoreTest);
        }

        candidatRepository.deleteById(id);
    }

    public Candidat findCandidatById(Long id){
        return candidatRepository.findById(id).orElse(null);
    }

    @Transactional
    public Candidat updateCandidat(Candidat candidat) {
        Candidat candidatUpdate = candidatRepository.findById(candidat.getId()).orElse(null);
        candidatUpdate.setNom(candidat.getNom());
        candidatUpdate.setPrenom(candidat.getPrenom());
        candidatUpdate.setMdp(candidat.getMdp());
        candidatUpdate.setDate_naissance(candidat.getDate_naissance());
        candidatUpdate.setMail(candidat.getMail());
        candidatUpdate.setFonction(candidat.getFonction());
        candidatUpdate.setAdresse(candidat.getAdresse());
        return candidatUpdate;
    }


    public void addCompetanceToCandidat(Long idCandidat, Long idCompetance){
        Candidat candidat = candidatRepository.findById(idCandidat).orElse(null);
        Competance competance = competanceRepository.findById(idCompetance).orElse(null);

        if (candidat!=null && competance!=null){
            candidat.getCompetances().add(competance);
            candidatRepository.save(candidat);
        }
    }

    public void addFormationToCandidat(Long idCandidat, Long idFormation){
        Candidat candidat = candidatRepository.findById(idCandidat).orElse(null);
        Formations formations = formationRepository.findById(idFormation).orElse(null);

        if (candidat!=null && formations!=null){
            candidat.getFormations().add(formations);
            candidatRepository.save(candidat);
        }
    }


    public void addPostulationToCandidat(Long idCandidat, Long idOffre, Long idPostulation){
        Candidat candidat = candidatRepository.findById(idCandidat).orElse(null);
        Offres offres = offrePriveRepository.findById(idOffre).orElse(null);
        Postulation postulation = postulationRepository.findById(idPostulation).orElse(null);

        if (candidat!=null && offres !=null && postulation != null){
            candidat.getPostulations().add(postulation);
            offres.getPostulations().add(postulation);
            offrePriveRepository.save(offres);
            candidatRepository.save(candidat);
        }
    }

    public Candidat findCandidatByIdPostulation(Long id){
        return candidatRepository.getCandidatsByPostulationsId(id);
    }

    @Transactional
    public Candidat updateCandidatImage(Candidat candidat) {
        Candidat candidatUpdate = candidatRepository.findById(candidat.getId()).orElse(null);
        candidatUpdate.setImage(candidat.getImage());
        return candidatUpdate;
    }

    @Transactional
    public Candidat updateCandidatCV(Candidat candidat) {
        Candidat candidatUpdate = candidatRepository.findById(candidat.getId()).orElse(null);
        candidatUpdate.setCv(candidat.getCv());
        return candidatUpdate;
    }


    @Transactional
    public Candidat updateCandidatLm(Candidat candidat) {
        Candidat candidatUpdate = candidatRepository.findById(candidat.getId()).orElse(null);
        candidatUpdate.setLettre_motivation(candidat.getLettre_motivation());
        return candidatUpdate;
    }

    @Transactional
    public Candidat updateCandidatNotification(Long id) {
        Candidat candidat = candidatRepository.findById(id).orElse(null);
        candidat.setMailNotifications(!candidat.getMailNotifications());
        return candidat;
    }


}