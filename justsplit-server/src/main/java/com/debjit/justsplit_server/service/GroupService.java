package com.debjit.justsplit_server.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.debjit.justsplit_server.model.GroupDTO;
import com.debjit.justsplit_server.respository.GroupRepository;

@Component
public class GroupService {
    @Autowired
    private GroupRepository groupRepo;

    @Autowired
    private UserService userService;

    public Optional<GroupDTO> getGroupById(String groupId) throws Exception {
        try {
            return groupRepo.findById(groupId);
        } catch (Exception e) {
            throw new Exception("Failed to find group.");
        }
    }

    public GroupDTO createGroup(GroupDTO groupDTO, String ownerUserId) throws Exception {
        try {
            groupDTO.setCreatedBy(ownerUserId);
            groupDTO = groupRepo.save(groupDTO);
            return groupDTO;
        } catch (Exception e) {
            throw new Exception("Failed to create group.");
        }
    }
}
