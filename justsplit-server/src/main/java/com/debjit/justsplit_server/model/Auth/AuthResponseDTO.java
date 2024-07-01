package com.debjit.justsplit_server.model.Auth;

import com.debjit.justsplit_server.model.UserDTO;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AuthResponseDTO {
    private String token;
    private UserDTO user;

    public AuthResponseDTO(String token, UserDTO userDTO) {
        this.token = token;
        this.user = userDTO;
    }
}
