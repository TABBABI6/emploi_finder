package com.Offre_Emploi.Back.Controller;

import com.Offre_Emploi.Back.Entity.Admin;
import com.Offre_Emploi.Back.Service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/admin")
public class AdminController {

    @Autowired
    private AdminService adminService;

   /* @GetMapping("/{idadmin}/{idtest}")
    public Admin addTestToAdmin(@PathVariable("idadmin") Long idadmin, @PathVariable("idtest") Long idtest) {
        return adminService.addTestToAdmin(idadmin, idtest);
    }*/
}
