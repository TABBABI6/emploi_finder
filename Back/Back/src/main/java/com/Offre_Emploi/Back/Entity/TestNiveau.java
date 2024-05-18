package com.Offre_Emploi.Back.Entity;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import lombok.Data;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Data
public class TestNiveau {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private int score_min;
    private int nb_questions;
    private float duree;
    private String titre;
    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "test_id", referencedColumnName = "id")
    private List<Question> questions;

    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "test_id", referencedColumnName = "id")
    private List<ScoreTest> scoreTests = new ArrayList<>();
    @ManyToMany(mappedBy = "testNiveaus",fetch = FetchType.EAGER)
    private List<Offres> offres = new ArrayList<>();

}
