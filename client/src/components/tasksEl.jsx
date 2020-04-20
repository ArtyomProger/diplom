import React, { createRef } from 'react';
import './tasksEl.css';

export class TasksEl extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            text: '',
            members: [],
            marks: [],
            isModalVisible: false,
            isMarker1Visible: false,
            isMarker2Visible: false,
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.titleColor = {
            backgroundColor: this.props.bgcolor,
        };
        this.tagInput1 = createRef();
    }

    render() {
        return (
            <div className="tasksEl_wrapper">
                {this.state.isModalVisible && (
                    <div className="tasksEl_modal_wrapper"
                        onClick={(e) => {
                            if (e.target === document.querySelector('.tasksEl_modal_wrapper')) {
                                this.setState(() => {
                                    return {
                                        isModalVisible: false
                                    }
                                })
                            }
                        }}>
                        <form method="post" action="./" className="tasksEl_modal" onSubmit={this.handleSubmit}>
                            <div className="tasksEl_modal_close"
                                onClick={() => {
                                    this.setState(() => {
                                        return {
                                            isModalVisible: false
                                        }
                                    })
                                }}>
                                <img src={require('../assets/plus_cross.png')} alt="" />
                            </div>
                            <input type="text" className="tasksEl_modal_name"
                                placeholder='Заголовок задачи' />
                            <div className="tasksEl_modal_marks">
                                <div>
                                    <div>
                                        <p>Участники</p>
                                    </div>
                                    <div className="taskEl_modal_addTag">
                                        {this.state.members.length > 0
                                            ? <div className="taskEl_modal_tagList">
                                                {this.state.members.map((e, i)=>
                                                    <div key={i} style={{ position: 'relative' }}>
                                                        <p >{e}</p>
                                                        <img src={require('../assets/plus_cross.png')} alt="" />
                                                    </div>)}
                                                <img src={require('../assets/plus_cross.png')} alt="" />
                                            </div>
                                            : <></>}
                                        <div className="tasksEl_modal_marks_add"
                                            onClick={() => {
                                                this.setState(() => {
                                                    return {
                                                        isMarker1Visible: true
                                                    }
                                                })
                                            }}>
                                            <img src={require('../assets/plus.png')} alt="" />
                                        </div>
                                    </div>
                                    {this.state.isMarker1Visible && 
                                    <div className="taskEl_modal_addTagInput">
                                        <input ref={(el) => {this.tagInput1 = el}}/>
                                        <img src={require('../assets/plus.png')} alt="" 
                                        onClick={()=>{
                                            if (this.tagInput1.value === "") return;
                                            let lastState = this.state.members;
                                            lastState.push(this.tagInput1.value);
                                            this.setState({members: lastState});
                                        }}/>
                                    </div>}
                                </div>
                                <div>
                                    <div>
                                        <p>Метки</p>
                                    </div>
                                    <div className="taskEl_modal_addTag">
                                        {this.state.marks.length > 0
                                            ? <div className="taskEl_modal_tagList">
                                            {this.state.marks.map((e, i) => 
                                            <div key={i} style={{position: 'relative'}}>
                                                <p>{e}</p>
                                                <img src={require('../assets/plus_cross.png')} alt="" />
                                            </div>)}
                                                
                                            </div>
                                            : <></>}
                                        <div className="tasksEl_modal_marks_add"
                                            onClick={() => {
                                                this.setState(() => {
                                                    return {
                                                        isMarker2Visible: true
                                                    }
                                                })
                                            }}>
                                            <img src={require('../assets/plus.png')} alt="" />
                                        </div>
                                    </div>
                                    {this.state.isMarker2Visible && 
                                    <div className="taskEl_modal_addTagInput">
                                        <input ref={(el) => { this.tagInput2 = el }}/>
                                        <img src={require('../assets/plus.png')} alt="" 
                                        onClick={()=>{
                                            if (this.tagInput2.value === "") return;
                                            let lastState = this.state.marks;
                                            lastState.push(this.tagInput2.value);
                                            this.setState({marks: lastState});
                                        }}/>
                                    </div>}
                                </div>
                            </div>

                            <label htmlFor="tasksEl_modal_desc_1">
                                <p>Описание</p>
                                <textarea id="tasksEl_modal_desc_1"></textarea>
                            </label>
                            <label htmlFor="tasksEl_modal_desc_2">
                                <p>Действия</p>
                                <textarea id="tasksEl_modal_desc_2"></textarea>
                            </label>
                            <input type="submit" className="tasksEl_modal_btn" value="Сохранить"/>
                        </form>
                    </div>
                )}
                <h3 className="tasksEl_title"
                    style={this.titleColor}
                >{this.props.title}</h3>
                {this.state.items.length > 0 && <TodoList items={this.state.items} />}
                <button onClick={() => {
                    this.setState(() => {
                        return {
                            isModalVisible: true
                        }
                    })
                }}>
                    Добавить задачу
                </button>
            </div>
        );
    }

    handleChange(e) {
        this.setState({ text: e.target.value });
    }

    handleSubmit(e) {
        e.preventDefault();
        // TODO:
        // Make new body of function
        if (!this.state.text.length) {
            return;
        }
        const newItem = {
            text: this.state.text,
            id: Date.now()
        };
        this.setState(state => ({
            items: state.items.concat(newItem),
            text: ''
        }));
    }
}

class TodoList extends React.Component {
    render() {
        return (
            <ul>
                {this.props.items.map(item => (
                    <li key={item.id}>{item.text}</li>
                ))}
            </ul>
        );
    }
}