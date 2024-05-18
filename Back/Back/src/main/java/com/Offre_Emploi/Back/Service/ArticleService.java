package com.Offre_Emploi.Back.Service;

import org.springframework.stereotype.Service;

import com.Offre_Emploi.Back.Entity.*;
import com.Offre_Emploi.Back.Repository.ArticleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class ArticleService {

    @Autowired
    private ArticleRepository articleRepository;

    public Article addArticle(Article article){
        return articleRepository.save(article);
    }
    public List<Article> getAllArticle(){
        return articleRepository.findAll();
    }
    public Article findArticleById(Long id){
        return articleRepository.findById(id).orElse(null);
    }
    @Transactional
    public void deleteArticle(Long articleId){
        articleRepository.deleteById(articleId);
    }

    @Transactional
    public Article updateArticle(Article article) {
        Article articleUpdate = articleRepository.findById(article.getId()).orElse(null);
        articleUpdate.setTitre(article.getTitre());
        articleUpdate.setDescription(article.getDescription());
        articleUpdate.setDate_creation(article.getDate_creation());
        articleUpdate.setSous_titre1(article.getSous_titre1());
        articleUpdate.setDescription1(article.getDescription1());
        articleUpdate.setSous_titre2(article.getSous_titre2());
        articleUpdate.setDescription2(article.getDescription2());
        articleUpdate.setSous_titre3(article.getSous_titre3());
        articleUpdate.setDescription3(article.getDescription3());
        articleUpdate.setSous_titre4(article.getSous_titre4());
        articleUpdate.setDescription4(article.getDescription4());
        articleUpdate.setSous_titre5(article.getSous_titre5());
        articleUpdate.setDescription5(article.getDescription5());
        return articleUpdate;
    }
}
