package com.debjit.justsplit_server.respository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import com.debjit.justsplit_server.model.ExpenseDTO;

@Repository
public interface ExpenseRepository extends MongoRepository<ExpenseDTO, String> {
    @Query(value = "{ 'groupId' : null }")
    List<ExpenseDTO> findByPaidByAndParticipantsContaining(String paidBy, String participant);

    @Query(value = "{ 'groupId' : null }")
    List<ExpenseDTO> findByPaidByOrParticipantsContaining(String paidBy, String participant);

    List<ExpenseDTO> findByGroupId(String groupId);

}