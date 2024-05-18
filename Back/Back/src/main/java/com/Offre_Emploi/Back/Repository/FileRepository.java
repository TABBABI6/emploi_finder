package com.Offre_Emploi.Back.Repository;

import com.Offre_Emploi.Back.Entity.File;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FileRepository extends JpaRepository<File,Long> {
}
