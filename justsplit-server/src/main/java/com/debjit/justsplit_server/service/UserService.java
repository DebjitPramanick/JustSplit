package com.debjit.justsplit_server.service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.function.Predicate;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.debjit.justsplit_server.model.BalanceSheetDTO;
import com.debjit.justsplit_server.model.ExpenseDTO;
import com.debjit.justsplit_server.model.UserDTO;
import com.debjit.justsplit_server.respository.UserRepository;

@Component
public class UserService {
    @Autowired
    private UserRepository userRepo;

    @Autowired
    private BalanceSheetService balanceSheetService;

    @Autowired
    private ExpenseService expenseService;

    public UserDTO getUserById(String id) throws Exception {
        try {
            return userRepo.findById(id).get();
        } catch (Exception e) {
            return null;
        }
    }

    public UserDTO getUserByEmail(String email) throws Exception {
        try {
            return userRepo.findOneByEmail(email).get();
        } catch (Exception e) {
            return null;
        }
    }

    public List<UserDTO> getUsersByGroupId(String groupId) throws Exception {
        try {
            return userRepo.findByGroupIdsContaining(groupId);
        } catch (Exception e) {
            return null;
        }
    }

    public List<UserDTO> getUserFriends(String userId) throws Exception {
        try {

            List<ExpenseDTO> expenses = expenseService.getExpensesByUserId(userId);
            Set<String> friendIds = new HashSet<>();
            for (ExpenseDTO expenseDTO : expenses) {
                friendIds.addAll(expenseDTO.getParticipants());
                friendIds.add(expenseDTO.getPaidBy());
            }
            friendIds.removeIf(friendId -> friendId.equals(userId));
            return userRepo.findByIdIn(new ArrayList<>(friendIds));
        } catch (Exception e) {
            return new ArrayList<>();
        }
    }

    public UserDTO createUser(UserDTO userDTO) throws Exception {
        try {
            userDTO.setCreatedAt(new Date(System.currentTimeMillis()));
            userRepo.save(userDTO);
            BalanceSheetDTO balanceSheetDTO = new BalanceSheetDTO();
            balanceSheetDTO.setUserId(userDTO.getId());
            balanceSheetDTO = balanceSheetService.createBalanceSheet(balanceSheetDTO);
            userDTO.setBalanceSheetId(balanceSheetDTO.getId());
            userRepo.save(userDTO);
            return userDTO;
        } catch (Exception e) {
            throw new Exception("Failed to create user.");
        }
    }

    public UserDTO updateUser(UserDTO userDTO) throws Exception {
        try {
            userDTO = userRepo.save(userDTO);
            return userDTO;
        } catch (Exception e) {
            throw new Exception("Failed to create user.");
        }
    }
}
