package com.debjit.justsplit_server.service;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.debjit.justsplit_server.model.ExpenseDTO;
import com.debjit.justsplit_server.model.GroupDTO;
import com.debjit.justsplit_server.model.UserDTO;
import com.debjit.justsplit_server.respository.GroupRepository;

@Component
public class GroupService {
    @Autowired
    private GroupRepository groupRepo;

    @Autowired
    private UserService userService;

    @Autowired
    private ExpenseService expenseService;

    public GroupDTO getGroupById(String groupId) throws Exception {
        try {
            return groupRepo.findById(groupId).get();
        } catch (Exception e) {
            throw new Exception("Failed to find group.");
        }
    }

    public GroupDTO createGroup(GroupDTO groupDTO, String ownerUserId) throws Exception {
        try {
            groupDTO.setCreatedBy(ownerUserId);
            groupDTO.setCreatedAt(new Date(System.currentTimeMillis()));
            groupDTO = groupRepo.save(groupDTO);
            addToGroup(groupDTO.getId(), ownerUserId);
            return groupDTO;
        } catch (Exception e) {
            throw new Exception("Failed to create group.");
        }
    }

    public void addToGroup(String groupId, String userId) throws Exception {
        try {
            UserDTO userDTO = userService.getUserById(userId);
            List<String> groupIds = userDTO.getGroupIds();
            groupIds.add(groupId);
            userDTO.setGroupIds(groupIds);
            userDTO.setUpdatedAt(new Date(System.currentTimeMillis()));
            userService.updateUser(userDTO);
        } catch (Exception e) {
            throw new Exception("Failed to add user to group.");
        }
    }

    public void removeFromGroup(String groupId, String userId) throws Exception {
        try {
            UserDTO userDTO = userService.getUserById(userId);
            List<String> groupIds = userDTO.getGroupIds();
            groupIds.remove(groupId);
            userDTO.setGroupIds(groupIds);
            userDTO.setUpdatedAt(new Date(System.currentTimeMillis()));
            userService.updateUser(userDTO);
        } catch (Exception e) {
            throw new Exception("Failed to remove user from group.");
        }
    }

    public GroupDTO updateGroup(String groupId, GroupDTO groupDTO) throws Exception {
        try {
            GroupDTO existingGroupDTO = getGroupById(groupId);
            if (groupDTO.getName() != null) {
                existingGroupDTO.setName(groupDTO.getName());
            }
            existingGroupDTO.setUpdatedAt(new Date(System.currentTimeMillis()));
            return groupRepo.save(existingGroupDTO);
        } catch (Exception e) {
            throw new Exception("Failed to delete group.");
        }
    }

    public void deleteGroup(String groupId) throws Exception {
        try {
            List<UserDTO> users = userService.getUsersByGroupId(groupId);
            List<ExpenseDTO> expenses = expenseService.getExpensesByGroupId(groupId);

            for (UserDTO user : users) {
                removeFromGroup(groupId, user.getId());
            }

            for (ExpenseDTO expense : expenses) {
                expenseService.deleteExpense(expense.getId());
            }

            groupRepo.deleteById(groupId);
        } catch (Exception e) {
            throw new Exception("Failed to delete group.");
        }
    }
}
