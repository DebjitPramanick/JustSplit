package com.debjit.justsplit_server.respository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.debjit.justsplit_server.model.BalanceSheetDTO;

@Repository
public interface BalanceSheetRepository extends MongoRepository<BalanceSheetDTO, String> {
}