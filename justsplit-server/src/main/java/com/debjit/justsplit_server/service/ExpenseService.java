package com.debjit.justsplit_server.service;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.debjit.justsplit_server.model.ExpenseDTO;
import com.debjit.justsplit_server.respository.ExpenseRepository;
import com.debjit.justsplit_server.service.ExpenseSplit.ExpenseSplit;
import com.debjit.justsplit_server.service.ExpenseSplit.ExpenseSplitFactory;

@Component
public class ExpenseService {
    @Autowired
    private ExpenseRepository expenseRepo;

    @Autowired
    private ExpenseSplitFactory expenseSplitFactory;

    public List<ExpenseDTO> getExpensesByParticipants(String paidBy, String participantId) throws Exception {
        try {
            List<ExpenseDTO> expenses = expenseRepo.findByPaidByAndParticipant(paidBy, participantId);
            return expenses;
        } catch (Exception e) {
            throw new Exception("Failed to find expenses.");
        }
    }

    public List<ExpenseDTO> getExpensesByGroup(String groupId) throws Exception {
        try {
            List<ExpenseDTO> expenses = expenseRepo.findByGroupId(groupId);
            return expenses;
        } catch (Exception e) {
            throw new Exception("Failed to find expenses.");
        }
    }

    public ExpenseDTO createExpense(ExpenseDTO expenseDTO) throws Exception {
        try {
            expenseDTO.setCreatedAt(new Date(System.currentTimeMillis()));
            ExpenseSplit expenseSplit = expenseSplitFactory.getSplitByType(expenseDTO.getSplitType());
            if (expenseSplit.isSplitRequestValid(expenseDTO.getSplits(), expenseDTO.getAmount())) {
                expenseRepo.save(expenseDTO);
                return expenseDTO;
            }
            throw new Exception("Split values are wrong.");
        } catch (Exception e) {
            String errorMessage = e.getMessage() != null ? e.getMessage() : "Failed to create expense.";
            throw new Exception(errorMessage);
        }
    }
}
