package com.Offre_Emploi.Back.Service;

import com.Offre_Emploi.Back.Entity.OffresPublic;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;


@Service
public class OffrePublicService {

    List<OffresPublic> offresPublics = new ArrayList<>();

    public List<OffresPublic> getPrivateOffre() throws IOException {
        return Jsoup.connect("https://www.keejob.com/").get()
                .getElementsByClass("block_white")
                .stream()
                .filter(o -> o.getElementsByTag("a").size() > 2)
                .map(o -> {
                    try {
                        return extractInfo(o);
                    } catch (IOException e) {
                        throw new RuntimeException(e);
                    }
                })
                .toList();
    }

    private OffresPublic extractInfo(Element offer) throws IOException {

        OffresPublic o = new OffresPublic();
        //title
        Elements elements = offer.getElementsByTag("a");
        String title = elements.get(1).text();
        o.setTitle(title);

        //link
        Element link = offer.getElementsByTag("a").get(1);
        String linkHref = link.attr("href");
        linkHref = "https://www.keejob.com" + linkHref;
        o.setLink(linkHref);
        //company
        Elements elements1 = offer.getElementsByTag("a");

        String companyName = elements.get(2).text();
        o.setCompany(companyName);

        //image
        Element imageElement = offer.getElementsByTag("img").get(0);
        String absoluteUrl = imageElement.absUrl("src");  //absolute URL on src
        o.setImage(absoluteUrl);
        //link recruteur

        Element linkr = offer.getElementsByTag("a").get(0);
        String linkHrefr = link.attr("href");
        linkHrefr = "https://www.keejob.com" + linkHrefr;

        var det = Jsoup.connect(linkHrefr).get();

        var details = det.getElementsByClass("block_a span12");
        for (Element detail : details){
            var sector =detail.getElementsByClass("span9 content").get(0).text();
            if (sector.contains("Secteur")) {
                var first = sector.indexOf(':');
                var second=sector.indexOf(':',first+1);
                o.setSector(sector.substring(first+1,second));
            }
        }
        setDetails_kj(o);
        o.setSource("keejob");
        return o;
    }

    public void setDetails_kj(OffresPublic o) throws IOException {

        String link = o.getLink();

        var det = Jsoup.connect(link).get();

        var details = det.getElementsByClass("span3 post no-margin-left");
        var descriptions=det.getElementsByClass("block_a span12 no-margin-left");
        for (Element desc:descriptions)
        {
            var description=desc.text();
            o.setDescription(description);

        }
        //  System.out.println(details);

        for (Element detail : details) {

            var details_offre =detail.text();
            o.setDetails_offre(details_offre);
            var taille= detail.getElementsByClass("meta").size();
//
            for (var i=0;i<taille;i++) {
                var trouve = detail.getElementsByClass("meta").get(i).text();
                if (trouve.contains("Type")) {
                    var type = trouve.substring(14);
                    o.setType(type);
                }
                if (trouve.contains("Lieu")) {
                    var location = trouve.substring(16);
                    o.setLocation(location);
                }
                if (trouve.contains("Disponibilité")) {
                    var availablity = trouve.substring(15);
                    o.setAvailablity(availablity);
                }

            }
        }
    }

    public List<OffresPublic> getPrivateOffreFromOtionCarriere() throws IOException {
        return Jsoup.connect("https://www.optioncarriere.tn/recherche/emplois?s=&l=Tunisie")
                .get()
                .getElementsByTag("article")
                .stream()
                .map(o -> {
                    try {
                        return extractInfoFromOtionCarriere(o);
                    } catch (IOException e) {
                        throw new RuntimeException(e);
                    }
                })
                .toList();

    }


    private OffresPublic extractInfoFromOtionCarriere(Element offer) throws IOException {
        OffresPublic o = new OffresPublic();
        //link
        var title = offer.getElementsByTag("a").get(0).text();
        o.setTitle(title);
        var company = offer.getElementsByTag("p").text();
        o.setCompany(company);
        Element link = offer.getElementsByTag("a").get(0);
        String linkHref = link.attr("href");
        linkHref = "https://www.optioncarriere.tn" + linkHref;
        o.setLink(linkHref);
        o.setSource("OtionCarriere");
        setDetails_oc(o);
        return o;
    }

    public void setDetails_oc(OffresPublic o) throws IOException {

        String link=o.getLink();
        String availablity;
        var det = Jsoup.connect(link).get();
        var  details= det.getElementsByClass("container");
        for (Element detail: details) {
            var description=detail.getElementsByClass("content").text();
            o.setDescription(description);
            var sector = detail.getElementsByTag("p").get(0).text();
            var location = detail.getElementsByTag("li").get(0).text();
            var type = detail.getElementsByTag("li").get(1).text();

            availablity=detail.getElementsByTag("li").get(3).text();
            if  (availablity.contains("-"))
            {o.setAvailablity(availablity);}
            else
            {
                availablity=detail.getElementsByTag("li").get(2).text();
                o.setAvailablity(availablity);

            }
            o.setSector(sector);
            o.setLocation(location);

            if (type.length() < 8)
                o.setType(type);

        }
    }

    public List<OffresPublic> getPrivateOffreFromLinkedin() throws IOException {
        return Jsoup.connect("https://www.linkedin.com/jobs/search?keywords=&location=Tunisie&geoId=102134353&trk=public_jobs_jobs-search-bar_search-submit&position=1&pageNum=0").get()
                .getElementsByClass("base-card relative w-full hover:no-underline focus:no-underline base-card--link base-search-card base-search-card--link job-search-card")
                .stream()
                .map(o-> {
                    try {
                        return extractInfoFromLinkedin(o);
                    } catch (IOException e) {
                        throw new RuntimeException(e);
                    }
                })
                .toList();
    }

    private OffresPublic extractInfoFromLinkedin(Element offer) throws IOException {
        OffresPublic  o=new OffresPublic();

        //link
        Element link = offer.getElementsByTag("a").get(0);
        String linkHref = link.attr("href");
        o.setLink(linkHref);
        //image
        Element  imageElement=offer.getElementsByTag("img").get(0);
        String absoluteUrl = imageElement.absUrl("data-delayed-url");  //absolute URL on src
        o.setImage(absoluteUrl);
        //title

        var title =offer.getElementsByTag("h3").text();
        o.setTitle(title);
        // company
        Elements elements = offer.getElementsByTag("a");
        String companyName = elements.get(1).text();
        o.setCompany(companyName);
        o.setSource("Linkedin");
        //  setDetails_li(o);
        return o;
    }
    public void setDetails_li(OffresPublic o) throws IOException {

        String link = o.getLink();

        var det = Jsoup.connect(link).get();
        var details = det.getElementsByClass("container");
        for (Element detail : details) {
            var sector = detail.getElementsByTag("p").get(0).text();
            var location = detail.getElementsByTag("li").get(0).text();
            var type = detail.getElementsByTag("li").get(1).text();
            o.setSector(sector);
            o.setLocation(location);
            if (type.length() < 8)
                o.setType(type);
        }


    }

}
