package com.Offre_Emploi.Back.Entity;

import lombok.Data;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Element;

import java.io.IOException;


@Data
public class OffresPublic {


    private String title;
    private String link;
    private String company;
    private String image;
    private String location;
    private String type;
    private String sector;
    private String source;
    private String availablity;
    private String description;
    private String details_offre;


}
