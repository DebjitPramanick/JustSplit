package com.debjit.justsplit_server.service.ExpenseSplit;

import java.util.List;

import com.debjit.justsplit_server.model.Split;

public interface ExpenseSplit {
    public boolean isSplitRequestValid(List<Split> splits, double totalAmount);
}
