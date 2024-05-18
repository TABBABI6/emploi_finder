package com.Offre_Emploi.Back.Repository;

import com.Offre_Emploi.Back.Entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User,Long> {

    User findByMail(String email);
}
