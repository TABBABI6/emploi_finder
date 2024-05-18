package com.Offre_Emploi.Back.Entity;

import lombok.Data;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@Data
public class Postulation {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private LocalDate date_postulation;
    private String decision_recruteur;
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "cv_id", referencedColumnName = "id")
    private File cv;
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "lettre_id", referencedColumnName = "id")
    private File lettre_motivation;
}
