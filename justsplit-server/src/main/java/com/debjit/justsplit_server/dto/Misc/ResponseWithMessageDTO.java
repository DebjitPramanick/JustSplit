package com.debjit.justsplit_server.dto.Misc;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ResponseWithMessageDTO {
    String message;

    public ResponseWithMessageDTO(String message) {
        this.message = message;
    }
}
