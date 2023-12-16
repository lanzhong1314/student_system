package com.lanzhong.student_system;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayList;
import java.util.Optional;

@RestController
public class StudentController {
    @Autowired
    private StudentRepository studentRepository;
    @GetMapping("/student")
    public ArrayList<Student> getAllStudent() {
        return (ArrayList<Student>) this.studentRepository.findAll();
    }

    @GetMapping("/student/{id}")
    public Student getStudent(@PathVariable Long id) {
        Optional<Student> stuOptional = this.studentRepository.findById(Math.toIntExact(id));
        if (stuOptional.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "学生不存在，删除失败");

        }
        return stuOptional.get();
    }
    @PostMapping("/student")
    public Student createStudent(@RequestBody Student student) {
        return studentRepository.save(student);
    }

    @DeleteMapping("/student/{id}")
    public void deleteStudent(@PathVariable Long id) {
        this.studentRepository.deleteById(Math.toIntExact(id));
    }

    @PutMapping("/student/{id}")
    public Student setStudent(@PathVariable Long id, @RequestBody Student student) {
        Optional<Student> stuOptional = this.studentRepository.findById(Math.toIntExact(id));
        if (stuOptional.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "学生不存在，删除失败");

        }
        Student stu = stuOptional.get();
        stu.setName(student.getName());
        stu.setNumber(student.getNumber());
        stu.setSex(student.getSex());
        stu.setAddress(student.getAddress());
        return this.studentRepository.save(stu);
    }
}
