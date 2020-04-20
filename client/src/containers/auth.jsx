import React, { useState, useCallback } from 'react';
import './auth.css';
import '../assets/font-awesome.min.css';
// import { routes } from '../routes';

export const Auth = () => {
    let [className, changeClassName] = useState('container right-panel-active');
    const handleClick = useCallback((className) => {
        changeClassName(className)
    }, []);
    return (
      <div className={`${className} auth_container`} id="container">
        <div className="form-container sign-up-container">
          <div id="close" className="close-container">
            <div id="wrapper-close">
              <a href="/">
                {' '}
                <img src={require('../assets/Close.png')} alt=""></img>
              </a>
            </div>
          </div>
          <form action="#">
            <h1>Создать аккаунт</h1>
            <div className="social-container">
              <a
                className="social"
                href="https://plus.google.com/?pli=1"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fa fa-google-plus" aria-hidden="true"></i>
              </a>
              <a
                className="social"
                href="https://www.facebook.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fa fa-facebook-square" aria-hidden="true"></i>
              </a>
            </div>
            <input type="text" placeholder="Имя" />
            <input type="email" placeholder="E-mail" />
            <input type="password" placeholder="Пароль" />
            <button>Зарегестрироваться</button>
            <br />
            <span>
              Уже Зарегистрированы?{' '}
              <span
                className="alr-registrated"
                onClick={() => handleClick('container')}
              >
                Войти
              </span>
            </span>
          </form>
        </div>
        <div className="form-container sign-in-container">
          <div id="close" className="close-container-second">
            <div id="wrapper-close">
              <a href="/">
                {' '}
                <img src={require('assets/Close.png')} alt=""></img>
              </a>
            </div>
          </div>
          <form action="/tasks">
            <h1>Войти</h1>
            <div className="social-container">
              <a
                className="social"
                href="https://plus.google.com/?pli=1"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fa fa-google-plus" aria-hidden="true"></i>
              </a>
              <a
                className="social"
                href="https://www.facebook.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fa fa-facebook-square" aria-hidden="true"></i>
              </a>
            </div>
            <input type="email" placeholder="E-mail" />
            <input type="password" placeholder="Пароль" />
            <a 
                href="/remember_password">
                    Забыли свой пароль?
            </a>
            <button>Войти</button>
            <br />

            <span>
              Еще не зарегистрированы?{' '}
              <span
                className="alr-registrated"
                onClick={() => handleClick('container right-panel-active')}
              >
                Регистрация
              </span>
            </span>
          </form>
        </div>
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h1>С возвращением!</h1>
              <p>
                Войдите в свой аккаунт, чтобы перейти к редактированию своих
                проектов
              </p>
              <button
                className="ghost"
                id="signIn"
                onClick={() => handleClick('container')}
              >
                Войти
              </button>
            </div>
            <div className="overlay-panel overlay-right">
              <h1>Создать аккаунт</h1>
              <button
                className="ghost"
                id="signUp"
                onClick={() => handleClick('container right-panel-active')}
              >
                Регистрация
              </button>
            </div>
          </div>
        </div>
      </div>
    );
}