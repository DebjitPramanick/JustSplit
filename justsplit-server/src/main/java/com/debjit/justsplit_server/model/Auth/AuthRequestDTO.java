package com.debjit.justsplit_server.model.Auth;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AuthRequestDTO {
    private String name;
    private String email;
    private String password;
}
