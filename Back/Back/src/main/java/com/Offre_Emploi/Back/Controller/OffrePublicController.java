package com.Offre_Emploi.Back.Controller;

import com.Offre_Emploi.Back.Entity.OffresPublic;
import com.Offre_Emploi.Back.Service.OffrePublicService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;


@RestController
@RequestMapping("/offres/public")
public class OffrePublicController {

    @Autowired
    private OffrePublicService offrePublicService;


    @GetMapping("/keejob")
    public List<OffresPublic> getkeejobOffres() throws IOException {
        return offrePublicService.getPrivateOffre();
    }

    @GetMapping("/optioncarrier")
    public List<OffresPublic> getOptioncarrierOffres() throws IOException {
        return offrePublicService.getPrivateOffreFromOtionCarriere();
    }

    @GetMapping("/linkedin")
    public List<OffresPublic> getLinkedinOffres() throws IOException {
        return offrePublicService.getPrivateOffreFromLinkedin();
    }


}
