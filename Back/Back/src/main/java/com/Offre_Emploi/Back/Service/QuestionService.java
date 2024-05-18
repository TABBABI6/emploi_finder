package com.Offre_Emploi.Back.Service;

import com.Offre_Emploi.Back.Entity.Question;
import com.Offre_Emploi.Back.Repository.QuestionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class QuestionService {

    @Autowired
    private QuestionRepository questionRepository;


    public Question addQuestion(Question question){
        return questionRepository.save(question);
    }

    
}
