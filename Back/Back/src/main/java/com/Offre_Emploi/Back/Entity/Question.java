package com.Offre_Emploi.Back.Entity;

import lombok.Data;

import javax.persistence.*;
import java.util.List;


@Entity
@Data
public class Question {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String enance;
    @ElementCollection()
    private List<String> rep_vrai;
    @ElementCollection()
    private List<String> rep_faux;
}
