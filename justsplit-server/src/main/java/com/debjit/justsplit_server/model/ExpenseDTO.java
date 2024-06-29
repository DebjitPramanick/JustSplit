package com.debjit.justsplit_server.model;

import java.util.Date;
import java.util.List;

import org.springframework.data.mongodb.core.mapping.Document;

import com.debjit.justsplit_server.enums.SplitType;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "expenses")
public class ExpenseDTO {
    private String id;
    private String description;
    private Double amount;
    private String paidBy;
    private String participant;
    private String groupId;
    private SplitType splitType;
    private List<Split> splits;
    private Date createdAt;
    private Date updatedAt;
}