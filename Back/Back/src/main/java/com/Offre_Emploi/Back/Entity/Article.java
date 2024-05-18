package com.Offre_Emploi.Back.Entity;

import lombok.Data;

import javax.persistence.*;

@Entity
@Data
public class Article {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String titre;
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "image_id", referencedColumnName = "id")
    private File image;
    private String date_creation;
    @Column(columnDefinition="TEXT",length = 5000)
    private String description;
    @Column(columnDefinition="TEXT",length = 5000)
    private String sous_titre1;
    @Column(columnDefinition="TEXT",length = 5000)
    private String  description1;
    @Column(columnDefinition="TEXT",length = 5000)
    private String sous_titre2;
    @Column(columnDefinition="TEXT",length = 5000)
    private String description2;
    @Column(columnDefinition="TEXT",length = 5000)
    private String sous_titre3;
    @Column(columnDefinition="TEXT",length = 5000)
    private String description3;
    @Column(columnDefinition="TEXT",length = 5000)
    private String sous_titre4;
    @Column(columnDefinition="TEXT",length = 5000)
    private String description4;
    @Column(columnDefinition="TEXT",length = 5000)
    private String sous_titre5;
    @Column(columnDefinition="TEXT",length = 5000)
    private String description5;
}
