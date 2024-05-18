package com.Offre_Emploi.Back.Controller;

import com.Offre_Emploi.Back.Entity.Candidat;
import com.Offre_Emploi.Back.Entity.Notification;
import com.Offre_Emploi.Back.Service.NotificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/notification")
public class NotificationController {

    @Autowired
    private NotificationService notificationService;

    @GetMapping("/candidat/{id}")
    public List<Notification> findByIdCandidat(@PathVariable("id") Long idCandidat){
        return notificationService.getNotificationsByIdCandidat(idCandidat);
    }

    @GetMapping("/vu/{id}")
    public void notificationVu(@PathVariable("id") Long id){
        notificationService.NotificationVu(id);
    }

    @GetMapping("/send/{id}")
    public void sendNotification(@PathVariable("id") Long id){
        notificationService.sendNotifications(id);
    }



}
