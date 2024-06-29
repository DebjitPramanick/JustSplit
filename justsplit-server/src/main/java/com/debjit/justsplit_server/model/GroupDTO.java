package com.debjit.justsplit_server.model;

import java.util.Date;

import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "groups")
public class GroupDTO {
    private String id;
    private String name;
    private String createdBy;
    private Date createdAt;
    private Date updatedAt;
}