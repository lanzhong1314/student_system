package com.lanzhong.student_system;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayList;
import java.util.Optional;

@RestController
public class StudyController {
    @Autowired
    private StudyRepository studyRepository;
    @GetMapping("/study")
    public ArrayList<Study> getAllstudy() {
        return (ArrayList<Study>) this.studyRepository.findAll();
    }

    @GetMapping("/study/{id}")
    public Study getstudy(@PathVariable Long id) {
        Optional<Study> sttOptional = this.studyRepository.findById(Math.toIntExact(id));
        if (sttOptional.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "班级不存在，删除失败");

        }
        return sttOptional.get();
    }
    @PostMapping("/study")
    public Study createstudy(@RequestBody Study study) {
        return studyRepository.save(study);
    }

    @DeleteMapping("/study/{id}")
    public void deletestudy(@PathVariable Long id) {
        this.studyRepository.deleteById(Math.toIntExact(id));
    }

    @PutMapping("/study/{id}")
    public Study setstudy(@PathVariable Long id, @RequestBody Study study) {
        Optional<Study> sttOptional = this.studyRepository.findById(Math.toIntExact(id));
        if (sttOptional.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "不存在，删除失败");

        }
        Study stt = sttOptional.get();
        stt.setStudyname(study.getStudyname());
        return this.studyRepository.save(stt);
    }

}
