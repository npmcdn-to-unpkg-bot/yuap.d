riot.tag2('chat-admin', '<div class="chat__wrapper"> <div class="chat__header"> <div class="chat__search"> <input class="chat__search__input" placeholder="Поиск в чате"> </div> </div> <div class="chat__container"> <div class="chat__list"> <div each="{user in users}" no-reorder onclick="{selectUser}" class="chat__list__item {chat__list__item--active : user.id == client_id}"> <div class="chat__list__photo"> <div class="chat__list__avatar__container {chat__list__avatar--active : user.avatar}"> <img riot-src="{user.avatar}" class="chat__list__avatar"> </div> <div class="chat__list__status {user.online ? \'chat__list__status--online\' : \'chat__list__status--offline\'}"></div> </div> <div onclick="{openMetrika}" class="chat__list__openMetrika"></div> <div class="chat__list__time">{user.joinTime}</div> <div class="chat__list__counts {chat__list__counts--active : user.newMessages && (user.id != client_id || !activity)}">{user.newMessages}</div> <div if="{user.metrika.device}" class="chat__list__device chat__list__device--{user.metrika.device}"></div> <div class="chat__list__text"> <strong class="chat__list__title">{user.name ? user.name : \'Гость\'}</strong> <span class="chat__list__message">{user.lastMessage}</span> <span if="{user.phone}" class="chat__list__phone">{user.phone}</span> </div> </div> <div each="{user in users}" no-reorder class="chat__metrika {chat__metrika--active : user.id === openMetrika_id}"> <div onclick="{closeMetrika}" class="chat__metrika__close"></div> <div class="chat__metrika__header"> <div class="chat__metrika__time">{user.joinTime}</div> <div class="chat__metrika__photo"> <div if="{user.avatar}" class="chat__metrika__avatar" riot-style="background-image:url({user.avatar})"></div> </div> <div if="{user.profile.bdate}" class="chat__metrika__bdate">{user.profile.bdate}</div> <div class="chat__metrika__title">{user.name ? user.name : \'Гость\'}</div> </div> <div class="chat__metrika__content"> <div if="{user.phone}" class="chat__metrika__tile"> <div class="chat__metrika__tile__title">Телефон: <span class="chat__metrika__text__blue">{user.phone}</span></div> </div> <div class="chat__metrika__tile"> <div class="chat__metrika__tile__subtitle">По данным счетчика</div> <div class="chat__metrika__tile__text">{user.metrika.visit}-й раз на сайте, {user.metrika.city}</div> </div> <div if="{user.metrika.start}" class="chat__metrika__tile"> <div class="chat__metrika__tile__subtitle">Страница входа</div> <div class="chat__metrika__tile__text"><a class="chat__metrika__link" href="{user.metrika.start}" target="_blank">{user.metrika.start}</a></div> </div> <div class="chat__metrika__tile"> <div class="chat__metrika__tile__subtitle">На сайт перешли {user.metrika.adv ? \'по рекламе\' : \'с\'}</div> <div class="chat__metrika__tile__text"> {⁗Яндекс.Директ⁗ : user.metrika.adv && user.metrika.referer === ⁗yandex⁗} {⁗Яндекс.Поиск⁗ : !user.metrika.adv && user.metrika.referer === ⁗yandex⁗} {⁗Google.Adwords⁗ : user.metrika.adv && user.metrika.referer === ⁗google⁗} {⁗Google.Поиск⁗ : !user.metrika.adv && user.metrika.referer === ⁗google⁗} {⁗Rambler.Поиск⁗ : user.metrika.referer === ⁗rambler⁗} {⁗Yahoo.Поиск⁗ : user.metrika.referer === ⁗yahoo⁗} {⁗Bing.Поиск⁗ : user.metrika.referer === ⁗bing⁗} {⁗Mail.ru.Поиск⁗ : user.metrika.referer === ⁗mail⁗} <virtual if="{user.metrika.referer && user.metrika.referer.match(/http/)}"> {user.metrika.referer} </virtual> <virtual if="{user.metrika.keyword}">, {user.metrika.keyword}</virtual> </div> </div> <div if="{user.metrika.pages}" class="chat__metrika__tile"> <div class="chat__metrika__tile__title">Посещено: {user.metrika.pages} страниц(ы)</div> <div if="{user.metrika.pagesData.length}" class="chat__metrika__tile__text"> <a onclick="{openPages}" class="chat__metrika__link" href="#">Подробнее</a> </div> </div> </div> <div if="{user.metrika.pagesData.length}" class="chat__metrika__pages {chat__metrika__pages--active : user.id === openPages_id}"> <div class="chat__metrika__pages__container"> <div onclick="{closePages}" class="chat__metrika__close"></div> <div each="{link in user.metrika.pagesData}" no-reorder class="chat__metrika__tile"> <a class="chat__metrika__link" target="_blank" href="{link}">{link}</a> </div> </div> </div> </div> </div> <div class="chat__body"> <div each="{user in users}" no-reorder class="chat__room {chat__room--active : user.id == client_id}"> <div class="chat__room__container"> <div id="chat__room__inner__{user.id}" class="chat__room__inner"> <div each="{message in user.messages}" class="chat__message {message.me ? \'chat__message__left\' : \'chat__message__right\'}"> <div class="{message.me ? \'chat__message__que\' : \'chat__message__answer\'} {chat__message__noviewed : !activity && !message.viewed} {chat__message__system : message.type !== \'chat\'} chat__message__inner"> {message.text} <div class="chat__message__time">{message.time}</div> <div if="{message.type === \'auth\' && !user.auth}" class="chat__message__icon--auth"></div> <div if="{message.type === \'auth\' && user.auth}" class="chat__message__icon--checked"></div> <div if="{message.type === \'phone\'}" class="chat__message__icon--phone"></div> </div> </div> <div if="{client_id === typed_id}" class="chat__room__typed">Вам печатают сообщение...</div> </div> </div> <div class="chat__panel"> <div class="chat__panel__form"> <div onclick="{showOptions}" class="chat__panel__menu"><i class="chat__panel__menu__circle"></i></div> <input onkeyup="{onKeyTyped}" onkeypress="{onKeyEnter}" type="text" name="chat__panel__input" class="chat__panel__input" placeholder="Введите сообщение и нажмите Enter" autocomplete="off"> <div onclick="{sendMessage}" class="chat__panel__button"></div> </div> </div> </div> </div> <div onclick="{hideOptions}" class="chat__options {chat__options--active : activeOptions}"> <div class="chat__options__select"> <div onclick="{offerAuth}" class="chat__options__select__item chat__options__select__item--auth">Предложить представиться</div> <div onclick="{offerPhone}" class="chat__options__select__item chat__options__select__item--phone">Предложить оставить телефон</div> <div onclick="{attachFile}" class="chat__options__select__item chat__options__select__item--attach">Прикрепить файл</div> </div> </div> </div> </div>', '', '', function(opts) {

    var $ = this;

    $.sid = opts.sid;
    $.users = [];
    $.content = null;
    $.activity = true;
    $.timeOutActivity = null;
    $.ready = false;
    $.socket_id = null;
    $.user_id = sessionStorage.chat_uid || new Date().getTime() + (Math.round(Math.random() * 10000));
    $.client_id = sessionStorage.chat_cid || null;
    $.openMetrika_id = null;
    $.openPages_id = null;
    $.activeOptions = false;
    $.timeOutTyped = null;
    $.typed_id = null;
    $.socket = io.connect('http://localhost:8008');
    $.notify = new Audio();
    $.notify.src = "/notify_song3.mp3";
    $.notify.volume = 0.5;

    if (!sessionStorage.chat_uid) sessionStorage.chat_uid = $.user_id;

    $.socket.on('connecting', function(){

    });

    $.socket.on('connect', function(){

        $.ready = true;
        $.socket_id = this.id;
        $.socket.emit("join", {
            id: $.user_id,
            sid: $.sid,
            admin: true
        });
    });

    $.socket.on("update_" + $.sid, function(data){
        if ($.ready) {
            $.users = data;
            $.typed_id = null;
            $.update();
            $.scrollContent();
            clearTimeout($.timeOutTyped);
        }
    });

    $.socket.on("notify_" + $.sid, function(id){
        $.notify.pause();
        $.notify.currentTime = 0;
        $.notify.play();
        if ($.activity && $.client_id === id){
            $.viewedList();
        }
    });

    $.socket.on("typed_" + $.sid, function(id){
        if ($.ready && $.client_id === id) {
            clearTimeout($.timeOutTyped);
            $.typed_id = id;
            $.update();
            $.scrollContent();
            $.timeOutTyped = setTimeout(function(){
                $.typed_id = null;
                $.update();
            }, 5000);
        }
    });

    $.socket.on("error", function(){
        console.log("error");
    });

    $.socket.on("reconnect", function(){
        console.log("reconnect");
    });

    $.selectUser = function(){
        var id = this._item.user.id;
        if ($.client_id === id) return;
        $.client_id = id;
        sessionStorage.chat_cid = $.client_id;
        $.scrollContent();
        $.viewedList();
    };

    $.scrollContent = function(){
        if (!$.client_id) return;
        var content = $["chat__room__inner__" + $.client_id];
        if (content) content.scrollTop = content.scrollHeight;
    };

    $.onKeyEnter = function(e){
        if (e.which === 13) {
            $.send(this);
        }
        return true;
    };

    $.sendMessage = function(){
        $.send(this);
    };

    $.send = function(_this){
        var text = _this.chat__panel__input.value;
        if (text.length){
            $.socket.emit("send", {
                id: $.client_id,
                message: text
            });
            _this.chat__panel__input.value = "";
        }
    };

    $.throttle = function(fn, delay) {
        var allowSample = true;

        return function(e) {
            if (allowSample) {
                allowSample = false;
                setTimeout(function() { allowSample = true; }, delay);
                fn(e);
            }
        };
    };

    $.onKeyTyped = $.throttle(function(e){
        if (e.which !== 13) {
            $.socket.emit("typed", $.client_id);
        }
    }, 1000);

    $.viewedList = function(){
        $.users.forEach(function(item, i) {
            if (item.id === $.client_id && $.users[i].newMessages > 0) {
                $.users[i].newMessages = 0;
                $.users[i].messages.forEach(function(message, j) {
                    message.viewed = true;
                });
                $.socket.emit("viewed", i);
                $.update();
            }
        });
    };

    $.openMetrika = function(){
        $.openMetrika_id = this._item.user.id;
    };

    $.closeMetrika = function(){
        $.openMetrika_id = null;
    };

    $.openPages = function(){
        $.openPages_id = this._item.user.id;
    };

    $.closePages = function(){
        $.openPages_id = null;
    };

    $.showOptions = function(){
        $.activeOptions = true;
    };

    $.hideOptions = function(){
        $.activeOptions = false;
    };

    $.offerAuth = function(){
        $.socket.emit("send", {
            id: $.client_id,
            type: "auth",
            message: "Предложение представиться"
        });
    };

    $.offerPhone = function(){
        $.socket.emit("send", {
            id: $.client_id,
            type: "phone",
            message: "Предложение оставить телефон"
        });
    };

    document.addEventListener("mousemove", $.throttle(function(e){
        if (!$.activity) $.viewedList();
        $.activity = true;
        clearTimeout($.timeOutActivity);
        $.timeOutActivity = setTimeout(function(){
            $.activity = false;
        }, 5000);
    }, 1000));

});
