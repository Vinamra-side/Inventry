# Roasted stock conversion

Apply the updated `schema.sql` before deploying this feature. It expands the
stock ledger's movement-type check to accept `roast_input` and `roast_output`.
It does not alter existing stock quantities. No production migration has been
run automatically.

Create two coffee catalog items with distinct names: one classified Green bean,
the other Roasted bean. In Inventory, use Add Roasted Beans below Add stock.
Select the source and its roasted counterpart, enter the green quantity, and
submit. Both items must use exactly the same unit; unit conversion is rejected.

100 kg input deducts 100 kg green and adds 85 kg roasted. Output is fixed at 85%
and rounded half-up to the database's two decimal places. Small batches can
therefore have an effective loss different from precisely 15% after rounding.
Select the correct counterpart: different varieties are not inferred from names.

Both rows are locked in ID order, sufficient green stock is checked, and both
balances plus history records are committed together. Failures roll back the
entire transaction. History entries share a unique roast batch reference.
The roasted increase is also recorded in inventory additions. This is not an
order and cannot be cancelled through the order cancellation flow.
