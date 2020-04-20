import React from "react";
import "./modalAddParams.css";
import { AddCoefModal } from './addCoefModal';

export class ModalAddParams extends React.Component {
  constructor(props) {
    super();
    this.state = {
      factorModalvisible: false,
      categories: [],
      catList: props.isRiskModal ? {
        1: 1,
        2: 1,
        3: 1,
        4: 1,
        5: 1,
      } : {
        1: 1,
        2: 1,
        3: 1,
        4: 1,
        5: 1,
        6: 1,
        7: 1,
        8: 1,
        9: 1,
        10: 1,
        11: 1,
        12: 1,
      }
    }

    if (props.isRiskModal) {
      this.headers = ['Тип клиента', 'Тип транзакции', 'Местонахождение клиента',
        'Тип открытия счета', 'Ожидаемый рост доходов'
      ];
    } else {
      this.bigListStyle = {
        overflowY: 'scroll'
      }
      this.headers = ["Управление", "НПК", "Управленческая информация", "Служба ПОД",
      "Мониторинг и контроль", "Принципы и процедуры", "Прочение оценки рисков",
      "Сроки хранения", "Направление СПО", "Инструменты контроля"];
    }

    this.changeFactorVisible = this.changeFactorVisible.bind(this);
    this.categoriesSorting = this.categoriesSorting.bind(this);
    this.changeCatData = this.changeCatData.bind(this);
  }

  componentDidMount() {
    this.calculateCategoriesSum(this.state.catList);
  }

  categoriesSorting(id) {
    let sortedArray = [];
    for (let i = 0; i < this.state.categories.length; i++) {
      if (Number(this.state.categories[i].CategoryId) === id) {
        sortedArray.push(this.state.categories[i]);
      }
    }
    return sortedArray;
  }

  changeFactorVisible() {
    this.setState({ factorModalvisible: false });
  }

  changeCatData(data) {
    this.setState({ catList: data });
    this.calculateCategoriesSum(data);
  }

  calculateCategoriesSum(catData) {
    let sum = 0;

    for (let i in catData) {
      sum += Number(catData[i]);
    }

    let obj = this.props.allCategories;

    if (sum < 0.25 * 3 * Object.keys(catData).length) {
      obj[this.props.id] = 1;
    } else if (sum >= 0.25 * 3 * Object.keys(catData).length
      && sum < 0.75 * 3 * Object.keys(catData).length) {
      obj[this.props.id] = 2;
    } else /*if (sum >= 0.75 * 3 * Object.keys(catData).length
      && sum <= 1 * 3 * Object.keys(catData).length)*/ {
      obj[this.props.id] = 3;
    }

    this.props.changeAllCats(obj);
  }

  render() {
    return (
      <div className="modalAddParams_wrapper" style={{ display: this.props.modalStyle ? 'block' : 'none'}}>
        {this.state.factorModalvisible && <AddCoefModal changeFactorVisible={this.changeFactorVisible} />}
        <h3>Оценка клиентской базы</h3>
        <div className="modalAddParams_close" onClick={() => {
          this.props.visibleChanger();
        }}>
          <img src={require("../assets/plus_cross.png")} alt="" />
        </div>
        <div className="modalAddParams_content" style={this.bigListStyle}>
          {this.props.modalStyle && this.headers.map((el, index) => {
            return <ModalAddParamsEl id={index} 
              catData={this.state.catList} changeCatData={this.changeCatData} key={index} 
              header={el} isRiskModal={this.props.isRiskModal} />
          })}
        </div>
        <div className="modalAddParams_btn"
          onClick={() => {
            this.changeFactorVisible(true);
          }}>Добавить фактор</div>
      </div>
    )
  }
};

class ModalAddParamsEl extends React.Component {
  constructor(props) {
    super();

    this.state = {
      catData: null,
    }

    if (props.isRiskModal) {
      this.cats = [
        ['Физическое лицо', 'Юридическое лицо'],
        ['Payment', 'Refund'],
        ['РФ', 'ЕС'],
        ['Высокий', 'Средний', 'Низкий'],
        ['Расчетный', 'Сберегательный']
      ];
    } else {
      this.cats = [
        ["Идентификация клиента", "Определение типа действий"],
        ["Проверка действий клиента", "Рассмотрение результатов проверок"],
        ["Осуществление пересмотра", "Наличие утвеждённых процедур"],
        ["Определение внешних и внутренних риск-факторов", "Оценка на локальном/глобальном уровне"],
        ["Наличие достаточных полномочий", "Наличие достаточных ресурсов"],
        ["Введение отчетности", "Предоставление отчётности"],
        ["Соблюдение сроков хранения", "Надлежащее хранение"],
        ["Проверка клиентов на наличие в санкционных листах", "Наличие уполномоченного сотрудника"],
        ["Направление сообщений", "Блокирование подозрительных операций"],
        ["Проверка специальной подготовки", "Наличие документации об обучении"],
        ["Актуализация риск-аппетита", "Актуальные результаты внутреннего аудита"],
        ["Использование специального ПО", "Наличие каналов информирования по вопросам ПОД/ФТ"]
      ]
    }

    this.subCats = ['Низкий', 'Умеренный', 'Высокий'];

    this.changeCatData = this.changeCatData.bind(this);
  }

  changeCatData(data) {
    let obj = this.props.catData;

    obj[this.props.id] = data;
    this.props.changeCatData(obj);
  }

  render() {
    return (
      <div className="modalAddParams_el">    
        <div className="modalAddParams_el_row">
          <label htmlFor="">{this.props.header}</label>
          <select name="" id="">
            {this.cats[this.props.id].map((el, i) =>
              <option key={i} value={el}>{el}</option>)}
          </select>
        </div>
        <div className="modalAddParams_el_row">
          <label htmlFor="">Оценка риска</label>
          <select name="" id=""
            onChange={(el) => {
              this.changeCatData(el.target.value);
            }}>
            {this.subCats.map((el, i) =>
              <option key={i} value={i + 1}>{el}</option>)}
          </select>
        </div>
        <div className="modalAddParams_el_row">
          <button>Удалить фактор</button>
          <button>Сохранить</button>
        </div>
      </div>
    );
  }
};