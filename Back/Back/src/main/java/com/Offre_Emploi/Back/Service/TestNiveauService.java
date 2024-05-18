package com.Offre_Emploi.Back.Service;

import com.Offre_Emploi.Back.Entity.*;
import com.Offre_Emploi.Back.Repository.CandidatRepository;
import com.Offre_Emploi.Back.Repository.QuestionRepository;
import com.Offre_Emploi.Back.Repository.ScoreRepository;
import com.Offre_Emploi.Back.Repository.TestNiveauRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@AllArgsConstructor
public class TestNiveauService {

    private TestNiveauRepository testNiveauRepository;
    private QuestionRepository questionRepository;
    private ScoreRepository scoreRepository;
    private CandidatRepository candidatRepository;

    public TestNiveau addTest(TestNiveau testNiveau){
        return testNiveauRepository.save(testNiveau);
    }

    public List<TestNiveau> allTests(){
        return testNiveauRepository.findAll();
    }

    @Transactional
    public TestNiveau addQuestionToTest(Long idtest, Long idquestion){
        TestNiveau testNiveau1 = testNiveauRepository.findById(idtest).orElse(null);
        Question question1 = questionRepository.findById(idquestion).orElse(null);

        if (question1 != null && testNiveau1 != null){
            testNiveau1.getQuestions().add(question1);
        }
        return testNiveau1;
    }

    public TestNiveau findTestById(Long id){
        return testNiveauRepository.findById(id).get();
    }

    @Transactional
    public ScoreTest addScoreToTest(Long idTest, Long idScore, Long idCandiidat){
        TestNiveau testNiveau = testNiveauRepository.findById(idTest).orElse(null);
        ScoreTest scoreTest = scoreRepository.findById(idScore).orElse(null);
        Candidat candidat = candidatRepository.findById(idCandiidat).orElse(null);

        if (testNiveau != null && scoreTest != null && candidat != null){
            scoreTest.setCandidat(candidat);
            testNiveau.getScoreTests().add(scoreTest);
        }
        return scoreTest;
    }


    @Transactional
    public void deleteTest(Long id){
        TestNiveau testNiveau = testNiveauRepository.findById(id).orElse(null);
        List<Offres> offres = testNiveau.getOffres();
        for (Offres offres1:offres) {
            offres1.getTestNiveaus().remove(testNiveau);
        }
        testNiveauRepository.deleteById(id);
    }

}
