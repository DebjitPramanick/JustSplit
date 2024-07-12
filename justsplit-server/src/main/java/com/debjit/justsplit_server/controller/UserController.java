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

import com.debjit.justsplit_server.dto.Misc.ResponseWithMessageDTO;
import com.debjit.justsplit_server.model.UserDTO;
import com.debjit.justsplit_server.service.UserService;

import jakarta.servlet.http.HttpServletRequest;

@RestController
@RequestMapping(path = "/api")
@CrossOrigin(origins = "http://localhost:8081/", allowCredentials = "true")
public class UserController {
    @Autowired
    private UserService userService;

    @GetMapping("/users")
    public ResponseEntity<?> getLoggedInUser(HttpServletRequest request) {
        try {
            String userEmail = request.getAttribute("user_email").toString();
            UserDTO user = userService.getUserByEmail(userEmail);

            if (user != null) {
                return new ResponseEntity<>(user, HttpStatus.OK);
            }
            throw new Exception();
        } catch (Exception e) {
            String errorMsg = e.getMessage() != null ? e.getMessage() : "No user found.";
            return new ResponseEntity<>(new ResponseWithMessageDTO(errorMsg), HttpStatus.NO_CONTENT);
        }
    }

    @GetMapping("/users/{id}")
    public ResponseEntity<?> getUserById(@PathVariable(name = "id") String id) {
        try {
            UserDTO user = userService.getUserById(id);

            if (user != null) {
                return new ResponseEntity<>(user, HttpStatus.OK);
            }
            throw new Exception();
        } catch (Exception e) {
            String errorMsg = e.getMessage() != null ? e.getMessage() : "No user found.";
            return new ResponseEntity<>(new ResponseWithMessageDTO(errorMsg), HttpStatus.NO_CONTENT);
        }
    }

    @GetMapping("/users/groups/{groupId}")
    public ResponseEntity<?> getUsersByGroupId(@PathVariable(name = "groupId") String groupId) {
        try {
            List<UserDTO> users = userService.getUsersByGroupId(groupId);
            return new ResponseEntity<>(users, HttpStatus.OK);
        } catch (Exception e) {
            String errorMsg = e.getMessage() != null ? e.getMessage() : "No users found.";
            return new ResponseEntity<>(new ResponseWithMessageDTO(errorMsg), HttpStatus.NO_CONTENT);
        }
    }

    @GetMapping("/users/{userId}/friends")
    public ResponseEntity<?> getUserFriends(@PathVariable(name = "userId") String userId) {
        try {
            List<UserDTO> friends = userService.getUserFriends(userId);
            return new ResponseEntity<>(friends, HttpStatus.OK);
        } catch (Exception e) {
            String errorMsg = e.getMessage() != null ? e.getMessage() : "No friends found.";
            return new ResponseEntity<>(new ResponseWithMessageDTO(errorMsg), HttpStatus.NO_CONTENT);
        }
    }
}
