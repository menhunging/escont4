var activeClass = 'active',
    showClass = 'show',
    disabledClass = 'disabled',
    errorClass = 'error',
    warningClass = 'warning',
    successClass = 'success',
    defaultEventName = 'liper-event',
    defaultEventError = 'custom-error',
    defaultEventText = 'Произошло событие: ',
    defaultDuration = 400;
// Включение/Выключение режима debug
const DEBAG_ON = true;

// Константы для классов
const ACTIVE_CLASS = 'active',
    SHOW_CLASS = 'show',
    DISABLED_CLASS = 'disabled',
    ERROR_CLASS = 'error',
    WARNING_CLASS = 'warning',
    SUCCESS_CLASS = 'success';

// Константы для скорости визуальных эффектов
const DEFAULT_DURATION = 400;

// Селекторы формы, если не применяются стандартные то нужно будет заменить. Потом поменяю на объект
var inputPhone = $('input[name="phone"]'),
    defaultCheckboxClass = 'form-group__fake-checkbox',
    defaultRadioClass = 'form-group__fake-radio';

// Data атрибуты
var dataClose = $('[data-close]'),
    dataCloseTarget = $('[data-close-target]');

// Если true, то будет выводить события в консоли
var consoleEvent = true;
// "Системные" перменные, не рекомендуется менять
var windowWidth = $(window).width(),
    showIndex = 0;


const
    // Класс контейнеров, например в bootstrap это .container, у нас .box 
    BOX_CLASS = 'box',
    // Класс блоков которым надо имитировать левый отступ от BOX_CLASS
    JS_BOX_CLASS_LEFT = 'jsBox-left',
    // Класс блоков которым надо имитировать правый отступ от BOX_CLASS
    JS_BOX_CLASS_RIGHT = 'jsBox-right';

// Функция имитации отступов основных контейнеров
function jsBoxImitate() {
    let boxSelector = document.querySelectorAll('.' + BOX_CLASS),
        jsBoxLeft = document.querySelectorAll('.' + JS_BOX_CLASS_LEFT),
        jsBoxRight = document.querySelectorAll('.' + JS_BOX_CLASS_RIGHT),
        jsBoxSliderW100prev = document.querySelectorAll('.slider-w100__arrow__prev'),
        jsBoxSliderW100next = document.querySelectorAll('.slider-w100__arrow__next');

    if (!boxSelector) {
        console.log('create div ' + BOX_CLASS);
    }
    // Вычисляем значение у boxSelector, скрипт возьмет последний div с классом BOX_CLASS
    boxSelector.forEach(function (element) {
        boxPaddingLeft = Number(getComputedStyle(element).paddingLeft.replace('px', '')) + Number(
            getComputedStyle(element).marginLeft.replace('px', ''));
        boxPaddingRight = Number(getComputedStyle(element).paddingRight.replace('px', '')) + Number(
            getComputedStyle(element).marginRight.replace('px', ''));
    });

    // Задает левый отступ всем элементам с классом jsBoxClassLeft, он равен сумме margin-left и padding-left у BOX_CLASS 
    jsBoxLeft.forEach(function (element) {
        element.style.paddingLeft = boxPaddingLeft + 'px';
    });
    // Задает правый отступ для всех элементов с классом jsBoxClassRight, он равен сумме margin-right и padding-right у BOX_CLASS
    jsBoxRight.forEach(function (element) {
        element.style.paddingRight = boxPaddingRight + 'px';
    });

    jsBoxSliderW100prev.forEach(function (element) {
        element.style.left = boxPaddingLeft + 'px';
    });

    jsBoxSliderW100next.forEach(function (element) {
        element.style.right = boxPaddingRight + 'px';
    });
}

// Запускаем функцию после построения DOM
document.addEventListener('DOMContentLoaded', function () {
    // Создаем наш boxSelector без внутренних элементов и лишних отступов чтобы исключить изменение default значений сетки
    // document.body.insertAdjacentHTML('beforeend', '<div class="' + boxClass +
    //     '" style="padding-top: 0px;padding-bottom:0px; margin-top: 0px; margin-bottom:0px; font-size: 0px"></div>'
    // )
    jsBoxImitate()
})

$('[data-count="plus"]').on('click', function () {
    let countInput = $(this).closest('[data-count="wrap"]').find('[data-count="input"]'),
        countInputVal = Number(countInput.val()),
        countInputLimit = Number(countInput.data('count-limit'));

    if (countInputVal != countInputLimit) {
        countInput.val(++countInputVal)
    }
})

$('[data-count="minus"]').on('click', function () {
    let countInput = $(this).closest('[data-count="wrap"]').find('[data-count="input"]'),
        countInputVal = Number(countInput.val());
    if (countInputVal != 1) {
        countInput.val(--countInputVal)

    }
});

$('[data-count="input"]').on('keydown', function (event) {
    if (event.keyCode == 46 || event.keyCode == 8 || event.keyCode == 9 || event.keyCode == 27 ||
        (event.keyCode == 65 && event.ctrlKey === true) ||
        (event.keyCode >= 35 && event.keyCode <= 39)) {
        return;
    } else {
        if ((event.keyCode < 48 || event.keyCode > 57) && (event.keyCode < 96 || event.keyCode > 105)) {
            event.preventDefault();
        }
    }
})



// Выставляет высоту равную для header, т.к header зафиксирован
function fakeHeaderBox() {
    $('.fake-header').css('height', $('.site-header').height())
}

window.addEventListener('resize', function () {
    windowWidth = $(window).width();
    jsBoxImitate()
    fakeHeaderBox()
})


$('.' + defaultRadioClass).on('change', function (event) {
    let radio = $(this),
        radioName = radio.find('input[type="radio"]').attr('name'),
        radioGroup = $('input[name="' + radioName + '"]').closest('.' + defaultRadioClass);
    console.log(radioName);
    if (radio.hasClass(disabledClass)) {
        return false;
    } else {
        radioGroup.removeClass(activeClass);
        radio.addClass(activeClass);
        radio.trigger(defaultEventName);
    }
});
$('input.' + errorClass).on('focus', function () {
    $(this).removeClass(errorClass);
    $(this).trigger('custom-error');
    if (consoleEvent === true) {
        console.log(defaultEventText + '"focus" с на поле с классом ' + errorClass)
    }
})

$('input').on('custom-error', function () {
    let thisInput = $(this);
    thisInput.on('focusout', function () {
        if (thisInput.val().length < 1) {
            thisInput.addClass(errorClass);
            if (consoleEvent === true) {
                console.log(defaultEventText + '"custom-error" с поля с классом ' + errorClass + ' — поле осталось пустым')
            }
        } else {
            if (consoleEvent === true) {
                console.log(defaultEventText + '"custom-error" у поля с классом ' + errorClass)
            }
        }
    })
});

function selectReady() {
    $('.form-group__fake-select__result').text($('.form-group__fake-select__option__list-item').eq(0).text())
}

$('.' + defaultCheckboxClass).on('change', function (event) {
    let checkbox = $(this);

    if (checkbox.hasClass(disabledClass)) {
        return false;
    } else {
        if (checkbox.data('key') == 'value') {
            checkbox.addClass(errorClass);
            checkbox.data('key', 'value2')
        }
        if (checkbox.hasClass(errorClass)) {
            checkbox.data('key', 'value')
            checkbox.removeClass(errorClass)
        }
        checkbox.toggleClass(activeClass);
        checkbox.trigger(defaultEventName);
    }
})


// При добавлении элементу html атрибута data-event-click="название_нового_события", сработает эта функция
// Вызывается она при событии $(document).on('click')
function eventAdd(event) {
    let targetElement = $(event.target),
        eventName = targetElement.data('event-click');
    targetElement.trigger(eventName);
    if (consoleEvent === true) {
        console.log('Произошло кастомное событие: ' + eventName)
    }
}

// Функция копирования при нажатии на элемент
function booferCopy(event) {
    let $tmp = $("<input>");
    $("body").append($tmp);
    $tmp.val(event.text()).select();
    document.execCommand("copy");
    $tmp.remove();
}

function dataCloseFunction(event) {
    let btn = $(event.target),
        targetName = btn.data('close'),
        targetElement = $('[data-close-target="' + targetName + '"]'),
        transition = defaultDuration;

    /* if (!btn) {
        let targetName = btn.closest('[data-close]').data('close'),
            targetElement = $('[data-close-target="' + targetName + '"]');
    }
    */

    targetElement.removeClass(showClass);



    if (btn.data('data-speed')) {
        transition = btn.data('data-speed')
    }
    if (btn.data('off') != 'default-animation' || $('[data-open="' + targetName + '"]').data('off') != 'default-animation') {
        targetElement.fadeOut(transition);
    } else {
        targetElement.removeAttr('style');
        targetElement.removeClass('not-default-animation');
    }
    targetElement.removeAttr('data-show-index');
    return --showIndex;

}

// Функция для data-open="Имя_цели"
function dataOpenFunction(event) {
    let btn = $(event.target), // Поймали событие нажатие на элемент с атрибутом data-open="Имя_цели"
        targetElement = $('[data-open-target="' + btn.data('open') + '"]'), // Определили нашу цель по имени указанному в data-open="Имя_цели"
        transition = defaultDuration; // Определили скорость анимации, defaultDuration задается в начале файла

    if (targetElement.length > 0) {
        //Просто добавляет класс для открытия, showClass задается в начале файла
        targetElement.addClass(showClass);

        // Если указан атрибут data-speed="Значение_в_цифрах", то заменит defaultDuration
        if (btn.data('data-speed')) {
            transition = btn.data('data-speed')
        }
        // Если указан атрибут data-off="default-animation", отключает fadeIn и на всякий случай удаляет атрибут style
        if (btn.data('off') != 'default-animation') {
            targetElement.fadeIn(transition);
        } else {
            targetElement.removeAttr('style').addClass('not-default-animation');
        }
        targetElement.attr('data-show-index', showIndex);

        return showIndex++;
    }
};

function closeTargetNotArea() {
    let showIndexElement = $('[data-show-index]');
    console.log(showIndex);
    if (showIndexElement.eq(showIndex - 1).data('close') == 'notThisArea') {
        --showIndex;
        showIndexElement.eq(showIndex).fadeOut(defaultDuration).removeClass(showClass).removeAttr('data-show-index');
        return showIndex;
    }

}
// Вызов функция при готовности DOM
document.addEventListener('DOMContentLoaded', function () {

    $('.' + disabledClass).prop('disabled', true);

    fakeHeaderBox()

    let radio = $('input[type="radio"]:checked'),
        radioParent = radio.closest('.' + defaultRadioClass),
        checkbox = $('input[type="checkbox"]:checked'),
        checkboxParent = checkbox.closest('.' + defaultCheckboxClass),
        form = $('form[data-form]');

    if ($('[data-tabs="wrap"]').length > 0) {
        let tabs = $('[data-tabs="wrap"]');
        tabs.find('[data-tabs="btn"]:eq(0)').addClass(activeClass);
        tabs.find('[data-tabs="item"]:eq(0)').addClass(showClass).fadeIn(0)
    }
    if (radio) {
        radioParent.addClass(activeClass)
    }
    if (checkbox) {
        checkboxParent.addClass(activeClass)
    }
    if (form) {
        let errorItems = form.find('.' + errorClass);
        if (errorItems) {
            form.find('input[type="submit"]').addClass(disabledClass);
            form.find('input[type="button"]').addClass(disabledClass);
            form.find('button').addClass(disabledClass)
        }
    }
    for (let i = 0; i < $(['[data-close-target]']).length; i++) {
        if (dataCloseTarget.eq(i).css('display') != 'none') {
            dataCloseTarget.eq(i).addClass(showClass).attr('data-show-index', showIndex);
            ++showIndex;
            return showIndex;
        }
    }

    jsBoxImitate()

});

// Вызов функций при событии клика в документе на data-атрибуты. Дополнительно проверяет на наличие disabledClass, он задается в начале файла
document.addEventListener('click', function (event) {
    let target = $(event.target),
        closeNotThis = $('[data-close="notThis"]'),
        closeNotThisArea = $('[data-close="notThisArea]'),
        modalBody = $('.modal__body');

    if (target.is(dataClose) || dataClose.has(target).length > 0 && !target.hasClass(disabledClass)) {
        console.log('YY');
        console.log(target);
        dataCloseFunction(event);
    }
    if (target.is('[data-open]') && !target.hasClass(disabledClass)) {
        dataOpenFunction(event);
    }
    if (target.is('[data-event-click]') && !target.hasClass(disabledClass)) {
        eventAdd(event)
    }
    if (target.is('[data-event-off]') || target.hasClass(disabledClass)) {
        event.preventDefault();
    }
    if ((!closeNotThis.is(target) && closeNotThis.has(target).length === 0 && dataCloseTarget.hasClass(showClass) && !dataClose.is(target)) || (!modalBody.is(target) && modalBody.has(target).length === 0) && dataCloseTarget.hasClass(showClass)) {
        if (!$('[data-open]').is($(event.target))) {
            closeTargetNotArea();
        }
    }
})

// Функции для реагирвоания на события клавиатуры
document.addEventListener('keyup', function (event) {
    if (dataCloseTarget.hasClass(showClass) && event.key === "Escape") {
        closeTargetNotArea(event);
    }
})


$('[data-accordion="button"]').on('click', function () {
    let btn = $(this),
        group = btn.closest('[data-accordion="group"]'),
        parent = btn.closest('[data-accordion="parent"]'),
        content = group.children('[data-accordion="content"]'),
        transitionAttr = Number(parent.attr('data-speed')),
        transition = defaultDuration;

    if (transitionAttr) {
        transition = Number(parent.attr('data-speed'));
    }

    function accordionReset() {
        $('[data-width-activate]').find('[data-accordion="button"]').removeClass(activeClass)
        $('[data-width-activate]').find('[data-accordion="content"]').removeClass(showClass).slideUp(0)
        $('[data-width-activate]').find('[data-accordion="group"]').removeClass(activeClass)
    }

    function accordionGo(transition) {
        btn.toggleClass(activeClass);
        group.toggleClass(showClass);
        content.slideToggle(transition).toggleClass(showClass);

        if (!btn.hasClass(activeClass)) {
            btn.trigger('accordion-close-start');
            setTimeout(() => btn.trigger('accordion-close-finish'), transition)
        } else {
            btn.trigger('accordion-open-start');
            setTimeout(() => btn.trigger('accordion-open-finish'), transition)
        }
    }

    function accordionFunction(transition) {
        if (parent.attr('data-accordion-toggle') === 'no') {
            accordionGo(transition);
        } else {
            parent.find('[data-accordion="button"]').not(btn).not(parent.find('[data-accordion="parent"]')).removeClass(activeClass);
            parent.find('[data-accordion="group"]').not(group).not(parent.find('[data-accordion="parent"]')).removeClass(showClass);
            parent.find('[data-accordion="content"]').not(content).not(parent.find('[data-accordion="parent"]')).slideUp(transition).removeClass(showClass);
            accordionGo(transition);
        }
    }
    accordionFunction(transition)
    /*
    if (parent.data('width-activate')) {
        if (windowWidth <= parent.attr('data-width-activate')) {
            accordionFunction(transition);
            $(window).resize(function () {
                accordionReset()
            })
        }
    } else {
        accordionFunction(transition);
    }*/
})

// Переключатели / Табы

$('[data-tabs="btn"]').on('click', function (event) {
    event.preventDefault();
    let tabsBtnTarget = $(this),
        tabsParent = tabsBtnTarget.closest('[data-tabs="wrap"]'),
        tabsBtn = tabsParent.find('[data-tabs="btn"]'),
        tabsItem = tabsParent.find('[data-tabs="item"]'),
        targetIndex = tabsBtnTarget.index(),
        transition = defaultDuration;

    if (tabsParent.data('speed')) {
        transition = tabsParent.data('speed');
    }

    function tabsFunction() {
        tabsBtn.removeClass(activeClass);
        tabsBtnTarget.addClass(activeClass);
        tabsItem.removeClass(showClass).fadeOut(0);
        tabsItem.eq(targetIndex).addClass(showClass)
        tabsBtnTarget.trigger(defaultEventName);

        if (tabsParent.data('off') != 'default-animation') {
            tabsItem.eq(targetIndex).fadeIn(transition);
        } else {
            tabsItem.removeAttr('style');
            tabsItem.addClass('not-default-animation');
        }
    }

    if (!tabsBtnTarget.hasClass(activeClass) && !tabsBtnTarget.hasClass(disabledClass)) {
        tabsFunction()
    }
})


// Доп скрипты 
$('.site-header__bottom__catalog-menu__btn').on('click', function () {
    $('.site-header__catalog-menu').addClass('show');
    $('.site-header__catalog-menu__bg').fadeIn()
});
$('.site-header__catalog-menu__close').on('click', function () {
    $('.site-header__catalog-menu').removeClass('show');
    $('.site-header__catalog-menu__bg').fadeOut()
});

$(document).mouseup(function (e) {
    var menu = $(".site-header__catalog-menu");
    if (!menu.is(e.target) && menu.has(e.target).length === 0) {
        $('.site-header__catalog-menu').removeClass('show');
        $('.site-header__catalog-menu__bg').fadeOut()
    }
});

$(document).on('keyup', function (e) {
    if (e.key == "Escape") {
        $('.site-header__catalog-menu').removeClass('show');
        $('.site-header__catalog-menu__bg').fadeOut()
    }
})