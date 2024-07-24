package com.debjit.justsplit_server.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.debjit.justsplit_server.dto.Expenses.FriendExpensesDTO;
import com.debjit.justsplit_server.model.ExpenseDTO;
import com.debjit.justsplit_server.model.UserDTO;
import com.debjit.justsplit_server.service.ExpenseService;
import com.debjit.justsplit_server.service.UserService;

import jakarta.servlet.http.HttpServletRequest;

@RestController
@RequestMapping(path = "/api")
@CrossOrigin(origins = "http://localhost:8081/", allowCredentials = "true")
public class ExpenseController {
    @Autowired
    private ExpenseService expenseService;

    @Autowired
    private UserService userService;

    @GetMapping("/expenses/friends/{friendId}")
    public ResponseEntity<?> getExpensesByParticipants(HttpServletRequest request,
            @PathVariable(name = "friendId", required = true) String friendId) {
        try {
            String loggedInUserId = request.getAttribute("user_id").toString();
            List<ExpenseDTO> expenses = expenseService.getExpensesByBetweenTwoFriends(loggedInUserId, friendId);
            UserDTO friend = userService.getUserById(friendId);
            FriendExpensesDTO friendExpensesDTO = new FriendExpensesDTO();
            friendExpensesDTO.setExpenses(expenses);
            friendExpensesDTO.setFriend(friend);
            return new ResponseEntity<FriendExpensesDTO>(friendExpensesDTO, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/expenses/groups/{groupId}")
    public ResponseEntity<?> getExpensesByGroup(@PathVariable(name = "groupId", required = true) String groupId) {
        try {
            List<ExpenseDTO> expenses = expenseService.getExpensesByGroupId(groupId);
            return new ResponseEntity<List<ExpenseDTO>>(expenses, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/expenses")
    public ResponseEntity<?> createExpense(@RequestBody ExpenseDTO expenseDTO) {
        try {
            expenseDTO = expenseService.createExpense(expenseDTO);
            return new ResponseEntity<ExpenseDTO>(expenseDTO, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/expenses/{id}")
    public ResponseEntity<?> updateExpense(@PathVariable(name = "id", required = true) String id,
            @RequestBody ExpenseDTO expenseDTO) {
        try {
            expenseDTO = expenseService.updateExpense(id, expenseDTO);
            return new ResponseEntity<>(expenseDTO, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/expenses/{id}")
    public ResponseEntity<?> deleteExpense(@PathVariable(name = "id", required = true) String id) {
        try {
            expenseService.deleteExpense(id);
            return new ResponseEntity<>("Expense is deleted successfully.", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
