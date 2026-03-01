// ProjectRepository.java
package com.taskflow.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.taskflow.entity.Project;
@Repository
public interface ProjectRepository extends JpaRepository<Project, Long> {
}