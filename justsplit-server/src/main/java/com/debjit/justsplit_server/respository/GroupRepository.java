package com.debjit.justsplit_server.respository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.debjit.justsplit_server.model.GroupDTO;

@Repository
public interface GroupRepository extends MongoRepository<GroupDTO, String> {
    List<GroupDTO> findByIdIn(List<String> ids);
}