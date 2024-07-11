package com.debjit.justsplit_server.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.debjit.justsplit_server.model.UserDTO;
import com.debjit.justsplit_server.service.UserService;

import jakarta.servlet.http.HttpServletRequest;

@RestController
@RequestMapping(path = "/api")
@CrossOrigin(origins = "http://localhost:8081/", allowCredentials = "true")
public class UserController {
    @Autowired
    private UserService userService;

    @GetMapping("/user")
    public ResponseEntity<?> getLoggedInUser(HttpServletRequest request) {
        try {
            String userEmail = request.getAttribute("user_email").toString();
            UserDTO user = userService.getUserByEmail(userEmail);

            if (user != null) {
                return new ResponseEntity<>(user, HttpStatus.OK);
            }
            throw new Exception();
        } catch (Exception e) {
            return new ResponseEntity<>("No user found.", HttpStatus.NO_CONTENT);
        }
    }

    @GetMapping("/user/{id}")
    public ResponseEntity<?> getUserById(@PathVariable(name = "id") String id) {
        try {
            UserDTO user = userService.getUserById(id);

            if (user != null) {
                return new ResponseEntity<>(user, HttpStatus.OK);
            }
            throw new Exception();
        } catch (Exception e) {
            return new ResponseEntity<>("No user found.", HttpStatus.NO_CONTENT);
        }
    }

    @GetMapping("/user/group/{groupId}")
    public ResponseEntity<?> getUserByGroupId(@PathVariable(name = "groupId") String groupId) {
        try {
            List<UserDTO> users = userService.getUsersByGroupId(groupId);
            return new ResponseEntity<>(users, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("No user found.", HttpStatus.NO_CONTENT);
        }
    }
}
