package com.debjit.justsplit_server.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.debjit.justsplit_server.model.UserDTO;
import com.debjit.justsplit_server.model.Auth.AuthRequestDTO;
import com.debjit.justsplit_server.model.Auth.AuthResponseDTO;
import com.debjit.justsplit_server.service.UserService;
import com.debjit.justsplit_server.service.AuthService.CustomUserDetailsService;
import com.debjit.justsplit_server.service.AuthService.JwtUtils;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping(path = "/api")
@CrossOrigin(origins = "*")
public class AuthController {

    @Autowired
    UserService userService;

    @Autowired
    private CustomUserDetailsService userDetailsService;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtUtils jwtUtils;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@RequestBody AuthRequestDTO authRequestDTO) {
        try {
            UserDTO userDTO = new UserDTO();
            userDTO.setName(authRequestDTO.getName());
            userDTO.setEmail(authRequestDTO.getEmail());
            userDTO.setPassword(passwordEncoder.encode(authRequestDTO.getPassword()));

            String token = jwtUtils.generateToken(userDTO.getEmail());
            userDTO.setAuthToken(token);

            userDTO = userService.createUser(userDTO);
            AuthResponseDTO response = new AuthResponseDTO(token, userDTO);
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return new ResponseEntity<>("Failed to register user.", HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody AuthRequestDTO authRequestDTO) { // TODO: Change
        try {
            authenticateUser(authRequestDTO.getEmail(), authRequestDTO.getPassword());
            UserDetails userDetails = userDetailsService.loadUserByUsername(authRequestDTO.getEmail());
            String token = jwtUtils.generateToken(userDetails.getUsername());
            Optional<UserDTO> userDTO = userService.getUserByEmail(authRequestDTO.getEmail());
            AuthResponseDTO response = new AuthResponseDTO(token, userDTO.get());
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }

    private void authenticateUser(String email, String password) throws Exception {
        UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(email,
                password);
        try {
            authenticationManager.authenticate(authentication);
        } catch (BadCredentialsException e) {
            throw new BadCredentialsException("Invalid Username or Password!");
        } catch (AuthenticationException e) {
            throw new Exception(e);
        }
    }

}
