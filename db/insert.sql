-- insert new transaction
INSERT INTO transactions 
    (did, operation_type, operation_size, sender_inn, recipient_inn, status, risk_level)
    VALUES (1, 'Покупка квартиры', 340500, 500100732259, 3002300732259, 'Заблокирована', 'Высокий');
-- insert new scheme
insert into Shema (schemaID, CustomerID, Schema)
    values (1, 1, !xml!);