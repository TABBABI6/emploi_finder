package com.Offre_Emploi.Back.Entity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Neurone {
    private double w1;
    private double w2;
    private double w3;
    private double seuil;

    public double somme(int e1, int e2, int e3) {
        var result = w1 * e1 + w2 * e2 + w3 * e3;
        return result;//
    }

    public boolean evaluer(int e1, int e2, int e3) {
        return somme(e1, e2, e3) >= seuil;
    }
}
