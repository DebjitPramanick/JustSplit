package com.debjit.justsplit_server.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.debjit.justsplit_server.model.ExpenseDTO;
import com.debjit.justsplit_server.service.ExpenseService;

@RestController
@CrossOrigin(origins = "*")
public class ExpenseController {
    @Autowired
    private ExpenseService expenseService;

    @GetMapping("/api/expense/private")
    public ResponseEntity<?> getExpensesByParticipants(@RequestParam(name = "paidBy", required = true) String paidBy,
            @RequestParam(name = "participantId", required = true) String participantId) {
        try {
            List<ExpenseDTO> expenses = expenseService.getExpensesByParticipants(paidBy, participantId);
            return new ResponseEntity<List<ExpenseDTO>>(expenses, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/api/expense/group")
    public ResponseEntity<?> getExpensesByGroup(@RequestParam(name = "groupId", required = true) String groupId) {
        try {
            List<ExpenseDTO> expenses = expenseService.getExpensesByGroup(groupId);
            return new ResponseEntity<List<ExpenseDTO>>(expenses, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/api/expense")
    public ResponseEntity<?> createExpense(@RequestBody ExpenseDTO expenseDTO) {
        try {
            expenseDTO = expenseService.createExpense(expenseDTO);
            return new ResponseEntity<ExpenseDTO>(expenseDTO, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
