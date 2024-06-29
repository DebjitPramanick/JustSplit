package com.debjit.justsplit_server.respository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import com.debjit.justsplit_server.model.UserDTO;

@Repository
public interface UserRepository extends MongoRepository<UserDTO, String> {
    @Query("{ 'groupIds' :?0 }")
    List<UserDTO> findUsersByGroupId(List<String> groupIds);
}