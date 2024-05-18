package com.Offre_Emploi.Back.Entity;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import lombok.Data;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

@Entity
@Data
@JsonIdentityInfo(property = "id",generator = ObjectIdGenerators.PropertyGenerator.class)
public class Offres {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String titre;
    private LocalDate date_ajout;
    private LocalDate date_expiration;
    @Column(length = 5000)
    private String description;
    private String domaine;
    private String type_poste;
    private String lieu;
    private String experience;
    private String etude;
    private Double salaire;
    private String disponibilite;
    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "offre_id", referencedColumnName = "id")
    private Set<Postulation> postulations = new HashSet<>();

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
            name = "offre_test",
            joinColumns =  @JoinColumn(name = "offre_id"),
            inverseJoinColumns =  @JoinColumn(name = "test_niveau_id"))
    private Set<TestNiveau> testNiveaus = new HashSet<>();

}
