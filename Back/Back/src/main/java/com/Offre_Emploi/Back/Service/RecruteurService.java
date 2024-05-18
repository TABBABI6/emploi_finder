package com.Offre_Emploi.Back.Service;

import com.Offre_Emploi.Back.Entity.Question;
import com.Offre_Emploi.Back.Entity.Recruteur;
import com.Offre_Emploi.Back.Entity.TestNiveau;
import com.Offre_Emploi.Back.Repository.RecruteurRepository;
import com.Offre_Emploi.Back.Repository.TestNiveauRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class RecruteurService {

    @Autowired
    private RecruteurRepository recruteurRepository;
    @Autowired
    private TestNiveauRepository testNiveauRepository;

    public Recruteur addRecruteur(Recruteur recruteur){
        recruteur.setRole("Recruteur");
        return recruteurRepository.save(recruteur);
    }

    public List<Recruteur> getRecruteurs(){
        return (List<Recruteur>) recruteurRepository.findAll();
    }

    public void deleteRecruteur(Long id){
        recruteurRepository.deleteById(id);
    }

    @Transactional
    public Recruteur updateRecruteur(Recruteur recruteur) {
        Recruteur recruteurUpdate = recruteurRepository.findById(recruteur.getId()).orElse(null);
        recruteurUpdate.setNom(recruteur.getNom());
        recruteurUpdate.setPrenom(recruteur.getPrenom());
        recruteurUpdate.setMdp(recruteur.getMdp());
        recruteurUpdate.setDate_naissance(recruteur.getDate_naissance());
        recruteurUpdate.setMail(recruteur.getMail());
        recruteurUpdate.setNum_tel(recruteur.getNum_tel());
        recruteurUpdate.setAdresse(recruteur.getAdresse());
        return recruteurUpdate;
    }

    @Transactional
    public Recruteur updateRecruteurImage(Recruteur recruteur) {
        Recruteur recruteurUpdate = recruteurRepository.findById(recruteur.getId()).orElse(null);
        recruteurUpdate.setImage(recruteur.getImage());
        return recruteurUpdate;
    }

    public Recruteur findRecruteurByIdOffre(Long id){
        return recruteurRepository.getRecruteurByOffresId(id);
    }

    public Recruteur findRecruteurById(Long id){
        return recruteurRepository.findById(id).orElse(null);
    }

    @Transactional
    public Recruteur addTestToRecruteur(Long idrecruteur, Long idtest){
        TestNiveau testNiveau = testNiveauRepository.findById(idtest).orElse(null);
        Recruteur recruteur = recruteurRepository.findById(idrecruteur).orElse(null);

        if (testNiveau != null && recruteur != null){
            recruteur.getTestNiveaus().add(testNiveau);
        }
        return recruteur;
    }

}