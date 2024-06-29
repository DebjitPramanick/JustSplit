package com.debjit.justsplit_server.service.ExpenseSplit;

import java.util.List;

import com.debjit.justsplit_server.model.Split;

public class EqualSplit implements ExpenseSplit {

    @Override
    public boolean isSplitRequestValid(List<Split> splits, double totalAmount) {
        double amountShouldBePresent = totalAmount / splits.size();
        for (Split split : splits) {
            if (split.getAmount() != amountShouldBePresent) {
                return false;
            }
        }
        return true;
    }

}
