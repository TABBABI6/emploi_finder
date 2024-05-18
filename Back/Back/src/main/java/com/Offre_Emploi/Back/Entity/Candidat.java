package com.Offre_Emploi.Back.Entity;

import lombok.Data;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Data
public class Candidat extends User{

    private String adresse;
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "image_id", referencedColumnName = "id")
    private File image;
    private String fonction;
    private String date_naissance;
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "cv_id", referencedColumnName = "id")
    private File cv;
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "lettre_id", referencedColumnName = "id")
    private File lettre_motivation;
    @ManyToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinTable(
            name = "condidat_Competance",
            joinColumns =  @JoinColumn(name = "user_id", referencedColumnName = "id"),
            inverseJoinColumns =  @JoinColumn(name = "competance_id", referencedColumnName = "id"))
    private Set<Competance> competances = new HashSet<>();
    @ManyToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinTable(
            name = "condidat_formation",
            joinColumns =  @JoinColumn(name = "user_id"),
            inverseJoinColumns =  @JoinColumn(name = "formation_id"))
    private Set<Formations> formations = new HashSet<>();
    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "candidat_id", referencedColumnName = "id")
    private Set<Postulation> postulations = new HashSet<>();

    @OneToMany(cascade = CascadeType.ALL,fetch = FetchType.EAGER)
    private List<Notification> notification = new ArrayList<>();

    private Boolean mailNotifications = true;

}
