package com.debjit.justsplit_server.service.ExpenseSplit;

import org.springframework.stereotype.Component;

import com.debjit.justsplit_server.enums.SplitType;

@Component
public class ExpenseSplitFactory {
    public ExpenseSplit getSplitByType(SplitType type) {
        if (type == SplitType.EQUAL) {
            return new EqualSplit();
        } else if (type == SplitType.UNEQUAL) {
            return new UnequalSplit();
        }
        return new PercentageSplit();
    }
}
