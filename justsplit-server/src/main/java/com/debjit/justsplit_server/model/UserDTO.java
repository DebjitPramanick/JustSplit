package com.debjit.justsplit_server.model;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "users")
public class UserDTO {
    private String id;
    private String name;
    private String email;
    private String password;
    private List<String> groupIds = new ArrayList<>();
    private String balanceSheetId;
    private Date createdAt;
    private Date updatedAt;
    private String authToken;
}