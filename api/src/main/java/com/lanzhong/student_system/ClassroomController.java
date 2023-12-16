package com.lanzhong.student_system;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayList;
import java.util.Optional;

@RestController
public class ClassroomController {
    @Autowired
    private ClassroomRepository classroomRepository;
    @GetMapping("/classroom")
    public ArrayList<Classroom> getAllClassroom() {
        return (ArrayList<Classroom>) this.classroomRepository.findAll();
    }

    @GetMapping("/classroom/{id}")
    public Classroom getClassroom(@PathVariable Long id) {
        Optional<Classroom> klassOptional = this.classroomRepository.findById(Math.toIntExact(id));
        if (klassOptional.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "班级不存在，删除失败");

        }
        return klassOptional.get();
    }
    @PostMapping("/classroom")
    public Classroom createClassroom(@RequestBody Classroom classroom) {
        return classroomRepository.save(classroom);
    }

    @DeleteMapping("/classroom/{id}")
    public void deleteClassroom(@PathVariable Long id) {
        this.classroomRepository.deleteById(Math.toIntExact(id));
    }

    @PutMapping("/classroom/{id}")
    public Classroom setClassroom(@PathVariable Long id, @RequestBody Classroom classroom) {
        Optional<Classroom> klassOptional = this.classroomRepository.findById(Math.toIntExact(id));
        if (klassOptional.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "班级不存在，删除失败");

        }
        Classroom klass = klassOptional.get();
        klass.setName(classroom.getName());
        return this.classroomRepository.save(klass);
    }

}
