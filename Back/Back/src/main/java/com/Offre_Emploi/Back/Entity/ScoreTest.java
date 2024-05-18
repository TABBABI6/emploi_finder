package com.Offre_Emploi.Back.Entity;

import lombok.Data;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.Date;

@Entity
@Data
public class ScoreTest {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private LocalDate dateTest;
    private float score;
    private boolean resultat;
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "candidat_id", referencedColumnName = "id")
    private Candidat candidat;
}
