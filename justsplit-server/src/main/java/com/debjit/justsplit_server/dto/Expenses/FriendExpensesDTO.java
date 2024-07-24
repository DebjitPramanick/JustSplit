package com.debjit.justsplit_server.dto.Expenses;

import java.util.List;

import com.debjit.justsplit_server.model.ExpenseDTO;
import com.debjit.justsplit_server.model.UserDTO;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class FriendExpensesDTO {
    List<ExpenseDTO> expenses;
    UserDTO friend;
}
