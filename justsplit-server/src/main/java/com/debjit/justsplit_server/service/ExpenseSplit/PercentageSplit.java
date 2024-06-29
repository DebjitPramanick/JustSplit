package com.debjit.justsplit_server.service.ExpenseSplit;

import java.util.List;

import com.debjit.justsplit_server.model.Split;

public class PercentageSplit implements ExpenseSplit {
    @Override
    public boolean isSplitRequestValid(List<Split> splits, double totalAmount) {
        double curTotalPercentage = 0;
        for (Split split : splits) {
            curTotalPercentage += split.getPercentage();
        }
        if (curTotalPercentage != 100) {
            return false;
        }
        return true;
    }
}
