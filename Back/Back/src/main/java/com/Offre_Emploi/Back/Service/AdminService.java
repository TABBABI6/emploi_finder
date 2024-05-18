package com.Offre_Emploi.Back.Service;

import com.Offre_Emploi.Back.Entity.Admin;
import com.Offre_Emploi.Back.Entity.Recruteur;
import com.Offre_Emploi.Back.Entity.TestNiveau;
import com.Offre_Emploi.Back.Repository.AdminRepository;
import com.Offre_Emploi.Back.Repository.TestNiveauRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class AdminService {

    @Autowired
    private AdminRepository adminRepository;
    @Autowired
    private TestNiveauRepository testNiveauRepository;

    /*@Transactional
    public Admin addTestToAdmin(Long idadmin, Long idtest){
        TestNiveau testNiveau = testNiveauRepository.findById(idtest).orElse(null);
        Admin admin = adminRepository.findById(idadmin).orElse(null);

        if (testNiveau != null && admin != null){
            admin.getTestNiveaus().add(testNiveau);
        }
        return admin;
    }*/
}
