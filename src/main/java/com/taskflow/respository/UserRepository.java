package com.taskflow.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.taskflow.entity.User;
@Repository
public interface UserRepository extends JpaRepository<User, Long> {
}