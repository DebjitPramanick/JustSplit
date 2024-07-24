package com.debjit.justsplit_server.respository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import com.debjit.justsplit_server.model.ExpenseDTO;

@Repository
public interface ExpenseRepository extends MongoRepository<ExpenseDTO, String> {
    @Query(value = "{ 'groupId' : null, paidBy: ?0, participants: ?1 }")
    List<ExpenseDTO> findByPaidByAndParticipantsIsContaining(String paidBy, String participantId);

    @Query(value = "{ 'groupId' : null}")
    List<ExpenseDTO> findByPaidByOrParticipantsContaining(String participantId);

    List<ExpenseDTO> findByGroupId(String groupId);

}