package com.Offre_Emploi.Back.Controller;

import com.Offre_Emploi.Back.Entity.Question;
import com.Offre_Emploi.Back.Service.QuestionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/question")
public class QuestionController {

    @Autowired
    private QuestionService questionService;
    @PostMapping("/add")
    public Question addQuestion(@RequestBody Question question){
        return questionService.addQuestion(question);
    }
}
