package com.debjit.justsplit_server.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;

import com.debjit.justsplit_server.model.GroupDTO;
import com.debjit.justsplit_server.service.GroupService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

@RestController
@RequestMapping(path = "/api")
@CrossOrigin(origins = "*")
public class GroupController {
    @Autowired
    private GroupService groupService;

    @GetMapping("/group/{id}")
    public ResponseEntity<?> getGroupById(@PathVariable String id) {
        try {
            Optional<GroupDTO> groupDTO = groupService.getGroupById(id);
            if (groupDTO != null) {
                return new ResponseEntity<>(groupDTO, HttpStatus.OK);
            }
            return new ResponseEntity<>("No group found.", HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/group")
    public ResponseEntity<?> cerateGroup(@RequestBody GroupDTO groupDTO) {
        try {
            groupDTO = groupService.createGroup(groupDTO, "");
            return new ResponseEntity<>(groupDTO, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
