package com.debjit.justsplit_server.service;

import java.util.Date;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.debjit.justsplit_server.model.BalanceSheetDTO;
import com.debjit.justsplit_server.respository.BalanceSheetRepository;

@Component
public class BalanceSheetService {
    @Autowired
    private BalanceSheetRepository balanceSheetRepo;

    public Optional<BalanceSheetDTO> getBalanceSheetById(String id) throws Exception {
        try {
            return balanceSheetRepo.findById(id);
        } catch (Exception e) {
            throw new Exception("Failed to find balancesheet.");
        }
    }

    public BalanceSheetDTO createBalanceSheet(BalanceSheetDTO balanceSheet) throws Exception {
        try {
            balanceSheet.setCreatedAt(new Date(System.currentTimeMillis()));
            balanceSheetRepo.save(balanceSheet);
            return balanceSheet;
        } catch (Exception e) {
            throw new Exception("Error occurred when creating balancesheet.");
        }
    }
}
