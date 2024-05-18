package com.Offre_Emploi.Back.Controller;
import com.Offre_Emploi.Back.Entity.Article;
import com.Offre_Emploi.Back.Entity.File;
import com.Offre_Emploi.Back.Service.ArticleService;
import com.Offre_Emploi.Back.Service.FileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/articles")
public class ArticleController {
    @Autowired
    private ArticleService articleService;
    @Autowired
    private FileService fileService;

    @PostMapping(value = "/add", consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
    public Article addArticle (@RequestPart("article") Article article,
                               @RequestPart("imageFile") MultipartFile file) {
        try {
            File images = uploadImage(file);
            article.setImage(images);
            Article newArticle= articleService.addArticle(article);
            return  newArticle;
        }catch (Exception e){
            System.out.println(e.getMessage());
            return null;
        }
    }

    @PutMapping("/update")
    public Article updateArticle(@RequestBody Article article) {
        return articleService.updateArticle(article);
    }

    @GetMapping("/{id}")
    public Article findById(@PathVariable("id") Long id) {
        return articleService.findArticleById(id);
    }

    @DeleteMapping("/delete/{id}")
    public void deleteArticle(@PathVariable("id") Long id) {
        articleService.deleteArticle(id);
    }

    @GetMapping("/all")
    public List<Article> getAllArticle() {
        return articleService.getAllArticle();
    }

    public File uploadImage(MultipartFile multipartFiles) throws IOException {
        File file = new File(
                multipartFiles.getOriginalFilename(),


                multipartFiles.getContentType(),
                multipartFiles.getBytes()
        );
        fileService.addFile(file);
        return file;
    }
}
