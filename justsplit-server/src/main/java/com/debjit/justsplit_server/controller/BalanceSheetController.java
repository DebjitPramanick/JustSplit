package com.debjit.justsplit_server.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.debjit.justsplit_server.model.BalanceSheetDTO;
import com.debjit.justsplit_server.service.BalanceSheetService;

@RestController
@RequestMapping(path = "/api")
@CrossOrigin(origins = "http://localhost:8081/", allowCredentials = "true")
public class BalanceSheetController {
    @Autowired
    private BalanceSheetService balanceSheetService;

    @GetMapping("/balancesheets/{id}")
    public ResponseEntity<?> getBalanceSheetId(@PathVariable(name = "id") String id) {
        try {
            Optional<BalanceSheetDTO> balanceSheetDTO = balanceSheetService.getBalanceSheetById(id);
            return new ResponseEntity<>(balanceSheetDTO, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
