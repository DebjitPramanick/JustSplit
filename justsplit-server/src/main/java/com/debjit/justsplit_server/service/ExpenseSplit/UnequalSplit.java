package com.debjit.justsplit_server.service.ExpenseSplit;

import java.util.List;

import com.debjit.justsplit_server.model.Split;

public class UnequalSplit implements ExpenseSplit {
    @Override
    public boolean isSplitRequestValid(List<Split> splits, double totalAmount) {
        double curTotalAmount = 0;
        for (Split split : splits) {
            curTotalAmount += split.getAmount();
        }
        if (curTotalAmount != totalAmount) {
            return false;
        }
        return true;
    }
}
