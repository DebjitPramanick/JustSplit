package com.debjit.justsplit_server.service;

import java.util.Date;
import java.util.List;
import java.util.Optional;

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

    public ExpenseDTO getExpenseById(String id) throws Exception {
        try {
            Optional<ExpenseDTO> expenseDTO = expenseRepo.findById(id);
            return expenseDTO.get();
        } catch (Exception e) {
            throw new Exception("Failed to find expenses.");
        }
    }

    public List<ExpenseDTO> getExpensesByParticipants(String paidBy, String participantId) throws Exception {
        try {
            List<ExpenseDTO> expenses = expenseRepo.findByPaidByAndParticipantsContaining(paidBy, participantId);
            return expenses;
        } catch (Exception e) {
            throw new Exception("Failed to find expenses.");
        }
    }

    public List<ExpenseDTO> getExpensesByGroupId(String groupId) throws Exception {
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

    public ExpenseDTO updateExpense(String id, ExpenseDTO expenseDTO) throws Exception {
        try {
            ExpenseDTO existingExpenseDTO = getExpenseById(id);
            existingExpenseDTO.setUpdatedAt(new Date(System.currentTimeMillis()));

            if (expenseDTO.getAmount() != null) {
                existingExpenseDTO.setAmount(expenseDTO.getAmount());
            }

            if (expenseDTO.getDescription() != null) {
                existingExpenseDTO.setDescription(expenseDTO.getDescription());
            }

            if (expenseDTO.getGroupId() != null) {
                existingExpenseDTO.setGroupId(expenseDTO.getGroupId());
            }

            if (expenseDTO.getPaidBy() != null) {
                existingExpenseDTO.setPaidBy(expenseDTO.getPaidBy());
            }

            if (expenseDTO.getParticipants() != null) {
                existingExpenseDTO.setParticipants(expenseDTO.getParticipants());
            }

            if (expenseDTO.getSplitType() != null) {
                if (expenseDTO.getSplits() == null) {
                    throw new Exception("Split values are missing.");
                }
                ExpenseSplit expenseSplit = expenseSplitFactory.getSplitByType(expenseDTO.getSplitType());
                if (expenseSplit.isSplitRequestValid(expenseDTO.getSplits(), existingExpenseDTO.getAmount())) {
                    existingExpenseDTO.setSplitType(expenseDTO.getSplitType());
                    existingExpenseDTO.setSplits(expenseDTO.getSplits());
                } else {
                    throw new Exception("Split values are wrong.");
                }
            }

            expenseDTO = expenseRepo.save(existingExpenseDTO);
            return expenseDTO;
        } catch (Exception e) {
            // String errorMessage = e.getMessage() != null ? e.getMessage() : "Failed to
            // update expense.";
            throw new Exception("Failed to update expense.");
        }
    }

    public void deleteExpense(String expenseId) throws Exception {
        try {
            expenseRepo.deleteById(expenseId);
        } catch (Exception e) {
            throw new Exception("Failed to delete expense.");
        }
    }
}
