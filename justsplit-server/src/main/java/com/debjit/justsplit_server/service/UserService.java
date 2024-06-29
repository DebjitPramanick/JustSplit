package com.debjit.justsplit_server.service;

import java.util.Date;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.debjit.justsplit_server.model.BalanceSheetDTO;
import com.debjit.justsplit_server.model.UserDTO;
import com.debjit.justsplit_server.respository.UserRepository;

@Component
public class UserService {
    @Autowired
    private UserRepository userRepo;

    @Autowired
    private BalanceSheetService balanceSheetService;

    public Optional<UserDTO> getUserById(String id) throws Exception {
        try {
            return userRepo.findById(id);
        } catch (Exception e) {
            throw new Exception("Failed to find user.");
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
}
