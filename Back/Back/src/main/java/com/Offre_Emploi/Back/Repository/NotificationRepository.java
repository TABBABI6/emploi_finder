package com.Offre_Emploi.Back.Repository;

import com.Offre_Emploi.Back.Entity.Candidat;
import com.Offre_Emploi.Back.Entity.Notification;
import org.aspectj.weaver.ast.Not;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NotificationRepository extends JpaRepository<Notification, Long> {

    List<Notification> getNotificationsByCandidat_Id(Long idCandidat);
    List<Notification> getNotificationsByOffres_Id(Long idOffre);
}
