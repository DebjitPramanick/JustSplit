package com.debjit.justsplit_server.respository;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.debjit.justsplit_server.model.UserDTO;

@Repository
public interface UserRepository extends MongoRepository<UserDTO, String> {

    Optional<UserDTO> findOneByEmail(String email);
}