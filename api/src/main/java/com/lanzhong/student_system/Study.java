package com.lanzhong.student_system;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Study {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    Long id;
    private String studyname;

    public Study() {
    }

    public Study(String studyname) {
        this.studyname = studyname;
    }

    public Study(Long id, String studyname) {
        this.id = id;
        this.studyname = studyname;
    }

    /**
     * 获取
     * @return studyname
     */
    public String getStudyname() {
        return studyname;
    }

    /**
     * 设置
     * @param studyname
     */
    public void setStudyname(String studyname) {
        this.studyname = studyname;
    }

    public String toString() {
        return "Study{studyname = " + studyname + "}";
    }

    /**
     * 获取
     * @return id
     */
    public Long getId() {
        return id;
    }

    /**
     * 设置
     * @param id
     */
    public void setId(Long id) {
        this.id = id;
    }
}
