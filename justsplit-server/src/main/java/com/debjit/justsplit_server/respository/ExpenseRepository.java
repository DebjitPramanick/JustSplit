package com.debjit.justsplit_server.respository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.debjit.justsplit_server.model.ExpenseDTO;

@Repository
public interface ExpenseRepository extends MongoRepository<ExpenseDTO, String> {
    List<ExpenseDTO> findByPaidByAndParticipant(String paidBy, String participant);

    List<ExpenseDTO> findByGroupId(String groupId);
}