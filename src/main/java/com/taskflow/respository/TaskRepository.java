// TaskRepository.java
package com.taskflow.respository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.taskflow.entity.Task;
import com.taskflow.entity.Task;
import com.taskflow.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {
    List<Task> findByAssignedTo(User user);
}