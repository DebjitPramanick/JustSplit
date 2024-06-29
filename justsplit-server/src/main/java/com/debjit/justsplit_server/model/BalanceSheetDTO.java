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
@Document(collection = "balancesheets")
public class BalanceSheetDTO {
    private String id;
    private String userId;
    private Double totalExpense;
    private Double totalPayment;
    private Double totalOwe;
    private Double totalGetBack;
    private Date createdAt;
    private Date updatedAt;
}