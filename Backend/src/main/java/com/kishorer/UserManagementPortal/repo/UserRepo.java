package com.kishorer.UserManagementPortal.repo;

import com.kishorer.UserManagementPortal.UserInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
@EnableJpaRepositories
public interface UserRepo extends JpaRepository<UserInfo,Integer> {
    @Query("select s from UserInfo s where s.email=?1")
    Optional<UserInfo> findByEmail(String email);

//    @Query("select s from UserInfo s where s.eid=?1")
//    UserInfo findById(int i);
}
