require("dotenv").config();
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const pg = require('pg');
const PORT = 8080;

const SchemeTemplate = require("./makeSchema");

const pool = new pg.Pool({
    port: process.env.PGHPORT,
    password: process.env.PGPASSWORD,
    database: process.env.PGDATABASE,
    host: process.env.PGHOST,
    user: process.env.PGUSER
});

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(morgan('dev'));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// Запросы на схему
app.get("/connections/:schema", (req, res) => {
    const queryParams = {
        text: `select distinct bas."InnSender",vas."InnReceiver" from (select distinct "InnReceiver","InnSender" from public."transactions" where "InnReceiver"=$1) as bas inner join (select distinct "InnReceiver","InnSender" from public."transactions" where "InnSender"=$1) as vas on bas."InnReceiver"=vas."InnSender"`,
        values: [req.params.schema]
    }
    pool.connect((err, db, done) => {
        if (err) {
            return res.sendStatus(400).send({ message: err });
        } else {
            db.query(queryParams, (err, table) => {
                let arr1 = [],
                    arr2 = [];
                // Цикл для разбора ответа
                for (let i = 0; i < table.rows.length; i++) {
                    arr1.push(table.rows[i]['InnSender']);
                    arr2.push(table.rows[i]['InnReceiver']);
                }
                // Параметры для фильтрации на уникальность массива
                const unique = (value, index, self) => {
                    return self.indexOf(value) === index
                }
                arr1 = arr1.filter(unique);
                arr2 = arr2.filter(unique);
                // BPMN-js-xml-teplater
                // console.log(arr1, arr2);
                res.json(SchemeTemplate(arr1, [req.params.schema], arr2));
            });
        }
        done();
    });
});

app.get("/transactions", (req, res) => {
    pool.connect((err, db, done) => {
        if (err) {
            return res.sendStatus(400).send({ message: err });
        } else {
            db.query('select * from public."transactions"', (err, table) => {
                if (err) {
                    return res.sendStatus(400).send(err);
                } else {
                    res.json(table.rows);
                }
            });
            done();
        }
    });
});

app.get("/connections", (req, res) => {
    pool.connect((err, db, done) => {
        if (err) {
            return res.sendStatus(400).send({ message: err });
        } else {
            db.query('select * from public."TransactionRisk"', (err, table) => {
                if (err) {
                    return res.sendStatus(400).send(err);
                } else {
                    res.json(table.rows);
                }
            });
            done();
        }
    });
});

app.post("/inherent-factors/:id", (req, res) => {
    pool.connect((err, db, done) => {
        if (err) {
            return res.sendStatus(400).send({ message: err });
        } else {
            db.query(`UPDATE public."InherentFactors" 
        SET "FactorWeight" = '${req.body.value}' WHERE "Factor_Inh_Id" = '${Number(req.params.id)}'`, (err, table) => {
                done();
                if (err) {
                    return console.log(err);
                } else {
                    db.end();
                    return console.log('Data inserted');
                }
            });
        }
    });
});

app.get("/customers", (req, res) => {
    pool.connect((err, db, done) => {
        if (err) {
            return res.sendStatus(400).send({ message: err });
        } else {
            db.query(`select * from public."Customers"`, (err, table) => {
                if (err) {
                    return res.sendStatus(400).send(err);
                } else {
                    res.json(table.rows);
                }
            });
            done();
        }
    });
});

app.get("/modal-params", (req, res) => {
    pool.connect((err, db, done) => {
        if (err) {
            return res.sendStatus(400).send({ message: err });
        } else {
            db.query(`select * from public."Subcategories_Inherent"`, (err, table) => {
                if (err) {
                    return res.sendStatus(400).send(err);
                } else {
                    res.json(table.rows);
                }
            });
            done();
        }
    });
});

app.get("/transaction-risk", (req, res) => {
    pool.connect((err, db, done) => {
        if (err) {
            return res.sendStatus(400).send({ message: err });
        } else {
            db.query(`select * from public."TransactionRisk"`, (err, table) => {
                if (err) {
                    return res.sendStatus(400).send(err);
                } else {
                    res.json(table.rows);
                }
            });
            done();
        }
    });
});

app.get("/update-transactionrisk", (req, res) => {
    pool.connect((err, db, done) => {
        if (err) {
            return res.sendStatus(400).send({ message: err });
        } else {
            db.query(`select * from public."TransactionRisk"`, (err, table) => {
                if (err) {
                    return res.sendStatus(400).send(err);
                } else {
                    for (let i = 0; i < table.rows.length; i++) {
                        let EfficiencyLevel = table.rows[i].EfficiencyLevel;
                        let mlrisk = '';

                        if ((EfficiencyLevel >= 90) && (EfficiencyLevel <= 100)) {
                            mlrisk = "Высокий";
                        } else if ((EfficiencyLevel >= 80) && (EfficiencyLevel <= 89)) {
                            mlrisk = "Умеренный";
                        } else {
                            mlrisk = "Низкий";
                        }

                        db.query(`update public."TransactionRisk"
                        SET "MLRISK" = '${mlrisk}' WHERE "TransactionId" = '${i + 1}'`);
                    }
                    res.json("Hello");
                }
            });
            done();
        }
    });
});

app.get("/inherent-factors", (req, res) => {
    pool.connect((err, db, done) => {
        if (err) {
            return res.sendStatus(400).send({ message: err });
        } else {
            db.query('SELECT * FROM public."InherentFactors"', (err, table) => {
                if (err) {
                    return res.sendStatus(400).send(err);
                } else {
                    res.json(table.rows);
                }
            });
            done();
        }
    });
});

app.get("/efficiency-factors", (req, res) => {
    pool.connect((err, db, done) => {
        if (err) {
            return res.sendStatus(400).send({ message: err });
        } else {
            db.query('SELECT * FROM public."EfficiencyFactors"', (err, table) => {
                if (err) {
                    return res.sendStatus(400).send(err);
                } else {
                    res.json(table.rows);
                }
            });
            done();
        }
    });
});

app.post("/efficiency-factors/:id", (req, res) => {
    pool.connect((err, db, done) => {
        if (err) {
            return res.sendStatus(400).send({ message: err });
        } else {
            db.query(`UPDATE public."EfficiencyFactors" 
                SET "FactorWeight" = '${req.body.value}' WHERE "Factor_Ef_Id" = '${Number(req.params.id)}'`, (err) => {
                done();
                if (err) {
                    return console.log(err);
                } else {
                    return console.log('Data inserted');
                }
            });
        }
    });
});

app.get("/transactions-id", (req, res) => {
    pool.connect((err, db, done) => {
        if (err) {
            return res.sendStatus(400).send({ message: err });
        } else {
            new Promise((response) => {
                db.query('select "TransactionId" from public."transactions"', (err, table1) => {
                    if (err) {
                        return res.sendStatus(400).send(err);
                    } else {
                        response(table1.rows);
                    }
                })
            }).then((table1) => {
                db.query('select "TransactionId" from public."TransactionRisk"', (err, table2) => {
                    if (err) {
                        return res.sendStatus(400).send(err);
                    } else {
                        uniqueIdCalculating(isEvalArrays(table1, table2.rows), db, res);
                        res.json('uniqueIdCalculating is done');
                    }
                });
            });
            done();
        }
    });
});

function isEvalArrays(obj1, obj2) {
    const arr1 = addElementsInArray(obj1);
    const arr2 = addElementsInArray(obj2);

    return arr1.filter(i => !arr2.includes(i))
        .concat(arr2.filter(i => !arr1.includes(i)));

    function addElementsInArray(obj) {
        const arr = [];

        obj.map(el => {
            arr.push(Number(el['TransactionId']));
        });
        return arr;
    }
}

// 1)
async function riskCalculating(uniqueId, db, res, isEff) {
    let query = isEff ? `select "Factor_Ef_Id" from public."EfficiencyFactors"` :
        `select "InherentFactors"."Factor_Inh_Id","InherentFactors"."FactorWeight" from public."InherentFactors"`;
    // находим все id факторов и веса для каждого из факторов
    return new Promise((resolve, reject) => {
        resolve(db.query(query).then((table) => {
            return new Promise((resolve1, rej) => {
                if (isEff) {
                    resolve1(getTableRows(table, null, uniqueId, db, res, isEff));
                } else {
                    resolve1(getTableRows(table, table.rows['FactorWeight'], uniqueId, db, res, isEff));
                }
            });
        }));
    });
}

// 2)
async function getTableRows(table, weight, uniqueId, db, res, isEff) {
    const tableRowsArray = [];
    for (const el of table.rows) {
        tableRowsArray.push(await tableRowsLoop(el, uniqueId, db, res, isEff));
    }

    if (isEff) {
        return calculateEffFactorsLevel(tableRowsArray, getRandomWeight(), getRandomCategories());
    } else {
        return calculateRiskLevel(tableRowsArray, weight);
    }
}

function getRandomCategories() {
    let array = [];

    for (let i = 0; i < 12; i++) {
        array.push(Math.floor(Math.random() * Math.floor(3)) + 1);
    }

    return array;
}

function getRandomWeight() {
    let array = [];

    for (let i = 0; i < 12; i++) {
        array.push(Math.random() * (0.1 - 0.01));
    }

    return array;
}

async function calculateEffFactorsLevel(tableRowsArray, weight, cats) {
    // console.log(await tableRowsArray);
    // let factors = await tableRowsArray;
    // let weightArray = await weight;
    let factor = 0;

    for (let i = 0; i < 12; i++) {
        factor += (tableRowsArray[i] * weight[i] * cats[i]);
    }

    return factor.toFixed(0);
};

// 3)
async function tableRowsLoop(el, uniqueId, db, res, isEff) {
    let query = isEff ? `select "Categories_Efficiency"."CategoryId" from public."Categories_Efficiency" where "Categories_Efficiency"."FactorId"='${el['Factor_Ef_Id']}'` :
        `select "Categories_Inherent"."CategoryId" from public."Categories_Inherent" where "Categories_Inherent"."FactorId"='${el['Factor_Inh_Id']}'`;
    return new Promise((resolve, reject) => {
        resolve(db.query(query).then((factors) => {
            let summOfTitles = getScoreByTitle(factors.rows, uniqueId, db, res, isEff);

            if (isEff) {
                return efficientlyLevelCalculating(summOfTitles);
            } else {
                return calculateFactors(summOfTitles);
            }
        }));
    });
}

// 4)
async function getScoreByTitle(factors, uniqueId, db, res, isEff) {
    const factorsArray = [];

    for (const el of factors) {
        factorsArray.push(await factorsArrayLoop(el, uniqueId, db, res, isEff));
    }

    async function factorsArrayLoop(el, uniqueId, db, res, isEff) {
        let query = isEff ? `select "Categories_Efficiency"."Title" from public."Categories_Efficiency" where "Categories_Efficiency"."CategoryId"='${el['CategoryId']}'` :
            `select "Categories_Inherent"."Title" from public."Categories_Inherent" where "Categories_Inherent"."CategoryId"='${el['CategoryId']}'`;
        return new Promise((resolve, reject) => {
            resolve(
                db.query(query)
                .then(title => {
                    return new Promise((resolve1, rej) => {
                        resolve1(factorsFilterByTitle(title.rows[0]['Title'], uniqueId, db, res, isEff));
                    });
                })
            );
        });
    }
    // console.log(factorsArray);
    return factorsArray;
}

// 5
async function factorsFilterByTitle(title, uniqueId, db, res, isEff) {
    let answer = '';
    switch (title) {
        case 'Тип клиента':
            await db.query(`select "Customers"."CustomerType" from public."Customers" inner join "transactions" on 
                "Customers"."CustomerId"="transactions"."CustomerId" where "transactions"."TransactionId"='${uniqueId}'`)
                .then((clientType) => {
                    let title = clientType.rows[0]['CustomerType'];
                    answer = getFinishScore(title, db, isEff);
                });
            break;
        case 'Тип транзакций':
            await db.query(`select "transactions"."TransactionType" from public."transactions" where "transactions"."TransactionId"='${uniqueId}'`)
                .then((transactionType) => {
                    let title = transactionType.rows[0]['TransactionType'];
                    answer = getFinishScore(title, db, isEff);
                });
            break;
        case 'Местонахождение клиента':
            await db.query(`select "Customers"."CustomerType" from public."Customers" inner join "transactions" on 
                        "Customers"."CustomerId"="transactions"."CustomerId" where "transactions"."TransactionId"='${uniqueId}'`)
                .then((type) => {
                    if (type.rows[0]['CustomerType'] === 'Физическое лицо') {
                        answer = new Promise((resolve, reject) => {
                            db.query(`select "NaturalPersons"."Citizenship" from public."NaturalPersons"
                                    inner join (select "Customers"."CustomerId" from public."Customers"
                                    inner join "transactions" on "Customers"."CustomerId"="transactions"."CustomerId"
                                    where "transactions"."TransactionId"='${uniqueId}') as "a1"
                                    on "NaturalPersons"."CustomerId"=a1."CustomerId"`, (err, score) => {
                                resolve(getFinishScore(score.rows[0]['Citizenship'], db, isEff));
                            });
                        });
                    } else {
                        answer = new Promise((resolve, reject) => {
                            db.query(`
                                    select "LegalPersons"."Address" from public."LegalPersons"
                                    inner join (select "Customers"."CustomerId" from public."Customers"
                                    inner join "transactions" on "Customers"."CustomerId"="transactions"."CustomerId" 
                                    where "transactions"."TransactionId"='${uniqueId}') as "a1"
                                    on "LegalPersons"."CustomerId"=a1."CustomerId"`, (err, score) => {
                                resolve(getFinishScore(score.rows[0]['Address'], db, isEff));
                            });
                        });
                    }

                });
            break;
        case 'Тип открытия счёта':
            await db.query(`select "Customers"."TypeAccount" from public."Customers" inner join "transactions" on 
                                "Customers"."CustomerId"="transactions"."CustomerId" where "transactions"."TransactionId"='${uniqueId}'`).then((scoreType) => {
                let title = scoreType.rows[0]['TypeAccount'];

                answer = getFinishScore(title, db, isEff);
            });
            break;
        case 'Ожидаемый рост доходов':
            await db.query(`select "Customers"."ExpectedGrowth" from public."Customers" inner join "transactions" on 
                    "Customers"."CustomerId"="transactions"."CustomerId" where "transactions"."TransactionId"='${uniqueId}'`).then((growingType) => {
                let title = growingType.rows[0]['ExpectedGrowth'];

                answer = getFinishScore(title, db, isEff);
            });
            break;
        case 'Идентификация клиента':
            await db.query(`select "CategoryScore","CategoryWeight" from public."Categories_Efficiency" where "Title" = 'Идентификация клиента'`).then(type => {
                let title = type.rows[0]['CategoryScore'];

                answer = [getFinishScore(title, db, isEff), type.rows[0]['CategoryWeight']];
            });
            break;
        case 'Определение типа действий':
            await db.query(`select "CategoryScore","CategoryWeight" from public."Categories_Efficiency" where "Title" = 'Определение типа действий'`).then(type => {
                let title = type.rows[0]['CategoryScore'];

                answer = [getFinishScore(title, db, isEff), type.rows[0]['CategoryWeight']];
            });
            break;
        case 'Проверка действий клиента':
            await db.query(`select "CategoryScore","CategoryWeight" from public."Categories_Efficiency" where "Title" = 'Проверка действий клиента'`).then(type => {
                let title = type.rows[0]['CategoryScore'];

                answer = [getFinishScore(title, db, isEff), type.rows[0]['CategoryWeight']];
            });
            break;
        case 'Рассмотрение результатов проверок':
            await db.query(`select "CategoryScore","CategoryWeight" from public."Categories_Efficiency" where "Title" = 'Рассмотрение результатов проверок'`).then(type => {
                let title = type.rows[0]['CategoryScore'];

                answer = [getFinishScore(title, db, isEff), type.rows[0]['CategoryWeight']];
            });
            break;
        case 'Осуществление пересмотра':
            await db.query(`select "CategoryScore","CategoryWeight" from public."Categories_Efficiency" where "Title" = 'Осуществление пересмотра'`).then(type => {
                let title = type.rows[0]['CategoryScore'];

                answer = [getFinishScore(title, db, isEff), type.rows[0]['CategoryWeight']];
            });
            break;
        case 'Определение типа клиента':
            await db.query(`select "CategoryScore","CategoryWeight" from public."Categories_Efficiency" where "Title" = 'Определение типа клиента'`).then(type => {
                let title = type.rows[0]['CategoryScore'];

                answer = [getFinishScore(title, db, isEff), type.rows[0]['CategoryWeight']];
            });
            break;
        case 'Определение внешних и внутренних риск-факторов':
            await db.query(`select "CategoryScore","CategoryWeight" from public."Categories_Efficiency" where "Title" = 'Определение внешних и внутренних риск-факторов'`).then(type => {
                let title = type.rows[0]['CategoryScore'];

                answer = [getFinishScore(title, db, isEff), type.rows[0]['CategoryWeight']];
            });
            break;
        case 'Оценка на локальном/глобальном уровне':
            await db.query(`select "CategoryScore","CategoryWeight" from public."Categories_Efficiency" where "Title" = 'Оценка на локальном/глобальном уровне'`)
                .then(type => {
                    let title = type.rows[0]['CategoryScore'];

                    answer = [getFinishScore(title, db, isEff), type.rows[0]['CategoryWeight']];
                });
            break;
        case 'Наличие достаточных полномочий':
            await db.query(`select "CategoryScore","CategoryWeight" from public."Categories_Efficiency" where "Title" = 'Наличие достаточных полномочий'`)
                .then(type => {
                    let title = type.rows[0]['CategoryScore'];

                    answer = [getFinishScore(title, db, isEff), type.rows[0]['CategoryWeight']];
                });
            break;
        case 'Наличие достаточных ресурсов':
            await db.query(`select "CategoryScore","CategoryWeight" from public."Categories_Efficiency" where "Title" = 'Наличие достаточных ресурсов'`)
                .then(type => {
                    let title = type.rows[0]['CategoryScore'];

                    answer = [getFinishScore(title, db, isEff), type.rows[0]['CategoryWeight']];
                });
            break;
        case 'Ведение отчётности':
            await db.query(`select "CategoryScore","CategoryWeight" from public."Categories_Efficiency" where "Title" = 'Ведение отчётности'`)
                .then(type => {
                    let title = type.rows[0]['CategoryScore'];

                    answer = [getFinishScore(title, db, isEff), type.rows[0]['CategoryWeight']];
                });
            break;
        case 'Предоставление отчётности':
            await db.query(`select "CategoryScore","CategoryWeight" from public."Categories_Efficiency" where "Title" = 'Предоставление отчётности'`)
                .then(type => {
                    let title = type.rows[0]['CategoryScore'];

                    answer = [getFinishScore(title, db, isEff), type.rows[0]['CategoryWeight']];
                });
            break;
        case 'Соблюдение сроков хранения':
            await db.query(`select "CategoryScore","CategoryWeight" from public."Categories_Efficiency" where "Title" = 'Соблюдение сроков хранения'`)
                .then(type => {
                    let title = type.rows[0]['CategoryScore'];

                    answer = [getFinishScore(title, db, isEff), type.rows[0]['CategoryWeight']];
                });
            break;
        case 'Надлежащее хранение':
            await db.query(`select "CategoryScore","CategoryWeight" from public."Categories_Efficiency" where "Title" = 'Надлежащее хранение'`)
                .then(type => {
                    let title = type.rows[0]['CategoryScore'];

                    answer = [getFinishScore(title, db, isEff), type.rows[0]['CategoryWeight']];
                });
            break;
        case 'Проверка клиентов на наличие в санкционных листах':
            await db.query(`select "CategoryScore","CategoryWeight" from public."Categories_Efficiency" where "Title" = 'Проверка клиентов на наличие в санкционных листах'`)
                .then(type => {
                    let title = type.rows[0]['CategoryScore'];

                    answer = [getFinishScore(title, db, isEff), type.rows[0]['CategoryWeight']];
                });
            break;
        case 'Наличие уполномоченного сотрудника':
            await db.query(`select "CategoryScore","CategoryWeight" from public."Categories_Efficiency" where "Title" = 'Наличие уполномоченного сотрудника'`)
                .then(type => {
                    let title = type.rows[0]['CategoryScore'];

                    answer = [getFinishScore(title, db, isEff), type.rows[0]['CategoryWeight']];
                });
            break;
        case 'Направление сообщений':
            await db.query(`select "CategoryScore","CategoryWeight" from public."Categories_Efficiency" where "Title" = 'Направление сообщений'`)
                .then(type => {
                    let title = type.rows[0]['CategoryScore'];

                    answer = [getFinishScore(title, db, isEff), type.rows[0]['CategoryWeight']];
                });
            break;
        case 'Блокирование подозрительных операций':
            await db.query(`select "CategoryScore","CategoryWeight" from public."Categories_Efficiency" where "Title" = 'Блокирование подозрительных операций'`)
                .then(type => {
                    let title = type.rows[0]['CategoryScore'];

                    answer = [getFinishScore(title, db, isEff), type.rows[0]['CategoryWeight']];
                });
            break;
        case 'Проведение специальной подготовки':
            await db.query(`select "CategoryScore","CategoryWeight" from public."Categories_Efficiency" where "Title" = 'Проведение специальной подготовки'`)
                .then(type => {
                    let title = type.rows[0]['CategoryScore'];

                    answer = [getFinishScore(title, db, isEff), type.rows[0]['CategoryWeight']];
                });
            break;
        case 'Наличие документации об обучении':
            await db.query(`
                    select "CategoryScore","CategoryWeight" from public."Categories_Efficiency" where "Title" = 'Наличие документации об обучении'
                `).then(type => {
                let title = type.rows[0]['CategoryScore'];

                answer = [getFinishScore(title, db, isEff), type.rows[0]['CategoryWeight']];
            });
            break;
        case 'Актуализация риск-аппетита':
            await db.query(`select "CategoryScore","CategoryWeight" from public."Categories_Efficiency" where "Title" = 'Актуализация риск-аппетита'`)
                .then(type => {
                    let title = type.rows[0]['CategoryScore'];

                    answer = [getFinishScore(title, db, isEff), type.rows[0]['CategoryWeight']];
                });
            break;
        case 'Актуальные результаты внутреннего аудита':
            await db.query(`select "CategoryScore","CategoryWeight" from public."Categories_Efficiency" where "Title" = 'Актуальные результаты внутреннего аудита'`)
                .then(type => {
                    let title = type.rows[0]['CategoryScore'];

                    answer = [getFinishScore(title, db, isEff), type.rows[0]['CategoryWeight']];
                });
            break;
        case 'Использование специального ПО':
            await db.query(`select "CategoryScore","CategoryWeight" from public."Categories_Efficiency" where "Title" = 'Использование специального ПО'`)
                .then(type => {
                    let title = type.rows[0]['CategoryScore'];

                    answer = [getFinishScore(title, db, isEff), type.rows[0]['CategoryWeight']];
                });
            break;
        case 'Наличие каналов информирования по вопросам ПОД/ФТ':
            await db.query(`select "CategoryScore","CategoryWeight" from public."Categories_Efficiency" where "Title" = 'Наличие каналов информирования по вопросам ПОД/ФТ'`)
                .then(type => {
                    let title = type.rows[0]['CategoryScore'];

                    answer = [getFinishScore(title, db, isEff), type.rows[0]['CategoryWeight']];
                });
            break;
    }

    return answer;
}

// 6
async function getFinishScore(title, db, isEff) {
    if (isEff) {
        if ((title >= 90) && (title <= 100)) {
            return 3;
        } else if ((title >= 80) && (title <= 89)) {
            return 2;
        } else {
            return 1;
        }
    } else {
        return new Promise((resolve, reject) => {
            db.query(`select "SubcategoryScore" from public."Subcategories_Inherent" where "Title"='${title}'`)
                .then((score) => {
                    if (score.rows[0]['SubcategoryScore'] === 'Высокий') {
                        resolve(3);
                    } else if (score.rows[0]['SubcategoryScore'] === 'Умеренный' ||
                        score.rows[0]['SubcategoryScore'] === 'Средний') {
                        resolve(2);
                    } else if (score.rows[0]['SubcategoryScore'] === 'Низкий') {
                        resolve(1);
                    } else {
                        resolve(0);
                    }
                });
        });
    }
}

async function uniqueIdCalculating(uniqueArray, db, res) {
    for (const el of uniqueArray) {
        let values = [];
        let riskLevel = await riskCalculating(el, db, res, false);
        let efficiencyLevel = await riskCalculating(el, db, res, true);
        values.push(el);
        values.push(riskLevel);
        //values.push(Number(efficiencyLevel)); // 95
        values.push(95);
        values.push(await calculateMLRisk(riskLevel, db));
        db.query(`insert into public."TransactionRisk" values ($1,$1,$2,$3,$4)`, [...values]);
        console.log(...values);
    }
}

async function calculateMLRisk(riskLevel, db) {
    let EfficiencyLevel = 95;
    let mlrisk = '';

    switch (riskLevel) {
        case 'Низкий':
            if ((EfficiencyLevel >= 90) && (EfficiencyLevel <= 100)) {
                mlrisk = "Низкий";
            } else if ((EfficiencyLevel >= 80) && (EfficiencyLevel <= 89)) {
                mlrisk = "Низкий";
            } else {
                mlrisk = "Умеренный";
            }
            break;
        case 'Умеренный':
            if ((EfficiencyLevel >= 90) && (EfficiencyLevel <= 100)) {
                mlrisk = "Умеренный";
            } else if ((EfficiencyLevel >= 80) && (EfficiencyLevel <= 89)) {
                mlrisk = "Умеренный";
            } else {
                mlrisk = "Высокий";
            }
            break;
        case 'Высокий':
            if ((EfficiencyLevel >= 90) && (EfficiencyLevel <= 100)) {
                mlrisk = "Умеренный";
            } else if ((EfficiencyLevel >= 80) && (EfficiencyLevel <= 89)) {
                mlrisk = "Высокий";
            } else {
                mlrisk = "Высокий";
            }
            break;
    }

    return mlrisk;
}

async function efficientlyLevelCalculating(factors) {
    // let array = await factors;
    // console.log(array['Promise']);
    let sum = 0;

    for (let i = 0; i < 12; i++) {
        sum += Math.floor(Math.random() * Math.floor(3)) + 1;
    }

    // for (const i in array) {
    //     sum += array[i];
    // }

    return sum;
}

async function calculateFactors(catData) {
    let array = await catData;
    let sum = 0;

    for (let i in array) {
        sum += Number(array[i]);
    }

    let rating = 0;

    if (sum < 0.25 * 3 * Object.keys(array).length) {
        rating = 1;
    } else if (sum >= 0.25 * 3 * Object.keys(array).length &&
        sum < 0.75 * 3 * Object.keys(array).length) {
        rating = 2;
    } else if (sum >= 0.75 * 3 * Object.keys(array).length &&
        sum <= 1 * 3 * Object.keys(array).length) {
        rating = 3;
    }

    return rating;
}

async function calculateRiskLevel(factors, factorsMark) {
    let factorsData = await factors;
    let score = 0;

    for (let i in factorsData) {
        for (let j in factorsMark) {
            if (factorsData[i]["Factor_Inh_Id"] === j) {
                score += Number(factorsData[i]["FactorWeight"]) * Number(factorsMark[j]);
            }
        }
    }

    score = score.toFixed(3);

    let rating = 'Неопределенный';

    if (score < 0.75) {
        rating = "Низкий";
    } else if (score >= 0.75 && score < 2.25) {
        rating = "Умеренный";
    } else if (score >= 2.25 && score <= 3) {
        rating = "Высокий";
    }

    return rating;
}

app.listen(PORT, () => console.log('Listening on port ' + PORT));