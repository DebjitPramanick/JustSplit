package com.debjit.justsplit_server.service;

import java.util.Date;
import java.util.List;

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
