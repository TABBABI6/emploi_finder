package com.Offre_Emploi.Back.Entity;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import lombok.Data;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@Data
@JsonIdentityInfo(property = "id",generator = ObjectIdGenerators.PropertyGenerator.class)
public class Notification {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private Boolean vu;
    private LocalDate date;
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "offre_id", referencedColumnName = "id")
    private Offres offres;
    @ManyToOne
    private Candidat candidat;
}
