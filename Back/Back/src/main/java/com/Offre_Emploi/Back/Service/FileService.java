package com.Offre_Emploi.Back.Service;

import com.Offre_Emploi.Back.Entity.File;
import com.Offre_Emploi.Back.Repository.FileRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class FileService {

    @Autowired
    private FileRepository fileRepository;

    public File addFile(File file){
        return fileRepository.save(file);
    }

    public void deleteFile(Long fileId){
        fileRepository.deleteById(fileId);
    }
}
